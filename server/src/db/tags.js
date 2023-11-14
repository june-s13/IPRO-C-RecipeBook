import { pool } from "./client.js";

export async function getTagsByRecipeId(recipeId) {
  const res = await pool.query(
    "SELECT id, name FROM Tag JOIN Recipe_Tag ON Tag.id=Recipe_Tag.tagId WHERE Recipe_Tag.recipeId=$1",
    [recipeId]
  );
  return res.rows;
}