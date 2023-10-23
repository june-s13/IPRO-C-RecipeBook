import { Router } from "express";
import { getUserByEmail, registerUser } from "../db/users.js";
import { compareHash } from "../utils/hash.js";

const authRoute = Router();

function setSessionUser(session, id, email) {
  session.user = {
    id,
    email,
  };
}

authRoute.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.sendStatus(400);
    return;
  }

  const user = await registerUser(email, password);

  setSessionUser(req.session, user.id, user.email);
  res.send({
    id: user.id,
    email: user.email
  });
});

authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.sendStatus(400);
    return;
  }

  const user = await getUserByEmail(email);
  if (!compareHash(password, user.password)) {
    res.sendStatus(401);
    return;
  }

  setSessionUser(req.session, user.id, user.email);
  res.send({
    id: user.id,
    email: user.email
  });
});

authRoute.post("/logout", async (req, res) => {
  req.session.user = undefined;
  res.sendStatus(200);
});

export { authRoute };
