import { Router } from "express";
import {
  getAllRecipes,
  getAllRecipesUserAware,
  getRecipeById,
  getRecipeUserAware,
} from "../db/recipes.js";
import { getIngredientsByRecipeId } from "../db/ingredients.js";
import { getTagsByRecipeId } from "../db/tags.js";

const recipesRoute = Router();

recipesRoute.get("/", async (req, res) => {
  const user = req.session.user;
  const recipes = user
    ? await getAllRecipesUserAware(user.id)
    : await getAllRecipes();
  for (const recipe of recipes) {
    recipe.ingredients = await getIngredientsByRecipeId(recipe.id);
    recipe.tags = await getTagsByRecipeId(recipe.id);
  }
  res.send(recipes);
});

recipesRoute.get("/:id", async (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }
  const user = req.session.user;
  const recipe = user
    ? await getRecipeUserAware(req.params.id, user.id)
    : await getRecipeById(req.params.id);
  recipe.ingredients = await getIngredientsByRecipeId(recipe.id);
  recipe.tags = await getTagsByRecipeId(recipe.id);
  res.send(recipe);
});

export { recipesRoute };
