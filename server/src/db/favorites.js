import { pool } from "./client.js";
import { convertRecipe } from "./recipes.js";

export async function getFavoriteRecipesOfUser(userId) {
  const res = await pool.query(
    "SELECT id, name, averagecalories, preptimeseconds, imageurl, directions FROM User_Recipe JOIN Recipe ON User_Recipe.recipeId=Recipe.id WHERE User_Recipe.recipeId=$1;",
    [userId]
  );

  return res.rows.map(convertRecipe);
}

export async function userUnfavoritesRecipe(userId, recipeId) {
  const res = await pool.query(
    "UPDATE User_Recipe SET isFavorite=FALSE WHERE userId=$1 AND recipeId=$2;",
    [userId, recipeId]
  );
}

export async function userFavoritesRecipe(userId, recipeId) {
  const res = await pool.query(
    "INSERT INTO User_Recipe (userId, recipeId, isFavorite) VALUES ($1, $2, TRUE) ON CONFLICT (userId, recipeId) DO UPDATE SET isFavorite=TRUE;",
    [userId, recipeId]
  );
}
