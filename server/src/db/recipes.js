import { pool } from "./client.js";

const convertRecipe = (recipe) => ({
  id: recipe.id,
  name: recipe.name,
  averageCalories: recipe.averagecalories,
  prepTimeSeconds: recipe.preptimeseconds,
  imageUrl: recipe.imageurl,
});

export async function getAllRecipes() {
  const res = await pool.query(
    "SELECT id, name, averageCalories, prepTimeSeconds, imageUrl FROM Recipe"
  );
  return res.rows.map(convertRecipe);
}

export async function getRecipeById(recipeId) {
  const res = await pool.query(
    "SELECT id, name, averageCalories, prepTimeSeconds, imageUrl FROM Recipe WHERE id=$1",
    [recipeId]
  );
  return res.rows.length > 0 ? convertRecipe(res.rows[0]) : null;
}
