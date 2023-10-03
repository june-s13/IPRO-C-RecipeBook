import { pool } from "./client.js";

export async function getAllIngredients() {
  const res = await pool.query("SELECT id, name FROM Ingredient;");
  return res.rows;
}

export async function getIngredientsByRecipeId(recipeId) {
  const res = await pool.query(
    "SELECT id, name, requirementAmount, requirementUnit FROM Ingredient JOIN Recipe_Ingredient ON Ingredient.id=Recipe_Ingredient.ingredientId WHERE Recipe_Ingredient.recipeId=$1",
    [recipeId]
  );
  return res.rows.map((r) => ({
    id: r.id,
    name: r.name,
    requirementAmount: r.requirementamount,
    requirementUnit: r.requirementunit,
  }));
}
