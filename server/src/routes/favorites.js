import { Router } from "express";
import {
  getFavoriteRecipesOfUser,
  userFavoritesRecipe,
  userUnfavoritesRecipe,
} from "../db/favorites.js";

const favoritesRoute = Router();

favoritesRoute.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

favoritesRoute.get("/", async (req, res) => {
  const user = req.session.user;
  const recipes = await getFavoriteRecipesOfUser(user.id);
  for (const recipe of recipes) {
    recipe.ingredients = await getIngredientsByRecipeId(recipe.id);
    recipe.tags = await getTagsByRecipeId(recipe.id);
  }
  res.send(recipes);
});

favoritesRoute.delete("/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  const user = req.session.user;
  await userUnfavoritesRecipe(user.id, recipeId);
  res.sendStatus(200);
});

favoritesRoute.put("/:recipeId", async (req, res) => {
  const recipeId = req.params.recipeId;
  const user = req.session.user;
  await userFavoritesRecipe(user.id, recipeId);
  res.sendStatus(200);
});

export { favoritesRoute };
