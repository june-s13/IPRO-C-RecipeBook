import { Router } from "express";
import { protectedRoute } from "../middleware/protected-route.js";
import { clearRating, updateRecipeRating } from "../db/ratings.js";

const ratingsRoute = Router();

ratingsRoute.use(protectedRoute);

ratingsRoute.delete("/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  const user = req.session.user;
  await clearRating(user.id, recipeId);
  res.sendStatus(200);
});

ratingsRoute.put("/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  const user = req.session.user;
  const rating = req.body.rating;
  if (!rating) {
    res.sendStatus(400);
    return;
  }
  await updateRecipeRating(user.id, recipeId, rating);
  res.sendStatus(200);
});

export { ratingsRoute };
