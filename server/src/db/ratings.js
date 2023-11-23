import { pool } from "./client.js";

export async function getUserRatingOfRecipe(userId, recipeId) {
  const res = await pool.query(
    "SELECT User_Recipe.rating FROM User_Recipe JOIN Recipe ON User_Recipe.recipeId=Recipe.id WHERE User_Recipe.userId=$1 AND User_Recipe.recipeId=$2;",
    [userId, recipeId]
  );
  return res.rows > 0 ? res.rows[0].rating : null;
}

export async function getAverageRatingOfRecipe(recipeId) {
  const res = await pool.query(
    "SELECT AVG(rating) averageRating FROM User_Recipe JOIN Recipe ON User_Recipe.recipeId=Recipe.id WHERE User_Recipe.recipeId=$1;",
    [recipeId]
  );
  return res.rows > 0 ? res.rows[0].averageRating : null;
}

export async function clearRating(userId, recipeId) {
  const res = await pool.query(
    "UPDATE User_Recipe SET rating=NULL WHERE userId=$1 AND recipeId=$2;",
    [userId, recipeId]
  );
}

export async function updateRecipeRating(userId, recipeId, rating) {
  const res = await pool.query(
    "INSERT INTO User_Recipe (userId, recipeId, rating) VALUES ($1, $2, $3) ON CONFLICT (userId, recipeId) DO UPDATE SET rating=$3",
    [userId, recipeId, rating]
  );
}
