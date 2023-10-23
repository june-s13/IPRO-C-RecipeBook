import express from "express";
import cors from "cors";
import { recipesRoute } from "./routes/recipes.js";
import { ingredientsRoute } from "./routes/ingredients.js";
import { session } from "./middleware/session.js";
import { authRoute } from "./routes/auth.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  credentials: true
}))
app.use(express.json())
app.use(session)

// Routes
app.use("/recipes", recipesRoute);
app.use("/ingredients", ingredientsRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Recipe book server listening on port ${PORT}`);
});
