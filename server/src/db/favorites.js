import { pool } from "./client.js";
import { convertRecipe } from "./recipes.js";

export async function getFavoriteRecipesOfUser(userId) {
  const res = await pool.query(
    "SELECT id, name, averagecalories, preptimeseconds, imageurl, directions, isFavorite, rating, COUNT(rating) numRatings, AVG(rating) averageRating FROM Recipe LEFT JOIN User_Recipe ON User_Recipe.recipeId=Recipe.id WHERE User_Recipe.userId=$1 AND User_Recipe.isFavorite=TRUE GROUP by id, name, isFavorite, rating;",
    [userId]
  );

  return res.rows.map(convertRecipe);
}

export async function getUserFavoritedRecipe(userId, recipeId) {
  const res = await pool.query(
    "SELECT id FROM User_Recipe JOIN RECIPE ON User_Recipe.recipeId=Recipe.id WHERE User_Recipe.userId=$1 AND User_Recipe.recipeId=$2 AND User_Recipe.isFavorite=TRUE LIMIT 1;",
    [userId, recipeId]
  )
  return res.rows.length > 0
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
