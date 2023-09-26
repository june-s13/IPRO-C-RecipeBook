import { pool } from "./client.js"

export async function getAllRecipes() {
  return pool.query("SELECT * FROM Recipes");
}