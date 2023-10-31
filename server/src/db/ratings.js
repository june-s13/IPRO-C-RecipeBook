import { pool } from "./client.js";

export async function resetRating(recipeId) {
const res = await pool.query(
    "UPDATE recipe_id SET rating = 0 WHERE recipe_id = $1;", 
    [recipeId]
  );
  return "Rating delete successful!"
}

export async function updateRecipeRating(newRating, recipeId) {
  const res = await pool.query(
    "UPDATE recipe_id SET rating = $1 WHERE recipe_id = $2;",
    [newRating, recipeId]
  );
  return "Rating updated successfully!"
}