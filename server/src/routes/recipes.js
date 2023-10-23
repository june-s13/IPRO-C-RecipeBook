import { Router } from "express";
import { getAllRecipes, getRecipeById } from "../db/recipes.js";
import { getIngredientsByRecipeId } from "../db/ingredients.js";
import { getTagsByRecipeId } from "../db/tags.js";

const recipesRoute = Router();

recipesRoute.get("/", async (req, res) => {
  const recipes = await getAllRecipes();
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
  const recipe = await getRecipeById(req.params.id);
  recipe.ingredients = await getIngredientsByRecipeId(recipe.id);
  recipe.tags = await getTagsByRecipeId(recipe.id);
  res.send(recipe);
});

export { recipesRoute };
