import { pool } from "./client.js";

export const convertRecipe = (recipe) => ({
  id: recipe.id,
  name: recipe.name,
  averageCalories: recipe.averagecalories,
  prepTimeSeconds: recipe.preptimeseconds,
  imageUrl: recipe.imageurl,
  directions: recipe.directions,
  isFavorite: recipe.isfavorite,
  rating: recipe.rating,
  averageRating: parseFloat(recipe.averagerating),
  numRatings: parseInt(recipe.numratings)
});

export async function getAllRecipes() {
  const res = await pool.query(
    "SELECT id, name, averageCalories, prepTimeSeconds, imageUrl, directions, COUNT(rating) numRatings, AVG(rating) averageRating FROM Recipe LEFT JOIN User_Recipe ON Recipe.id=User_Recipe.recipeId GROUP BY id, name;",
  );
  return res.rows.map(convertRecipe);
}

export async function getAllRecipesUserAware(userId) {
  const res = await pool.query(
    "SELECT id, name, averageCalories, prepTimeSeconds, imageUrl, directions, ThisUser.isFavorite isFavorite, ThisUser.rating rating, COUNT(User_Recipe.rating) numRatings, AVG(User_Recipe.rating) averageRating FROM Recipe LEFT JOIN (SELECT * FROM User_Recipe WHERE userId=$1 OR userId IS NULL) ThisUser ON Recipe.id=ThisUser.recipeId LEFT JOIN User_Recipe on Recipe.id=User_Recipe.recipeId GROUP BY id, name, ThisUser.isFavorite, ThisUser.rating;",
    [userId]
  )
  return res.rows.map(convertRecipe);
}

export async function getRecipeById(recipeId) {
  const res = await pool.query(
    "SELECT id, name, averageCalories, prepTimeSeconds, imageUrl, directions, COUNT(rating) numRatings, AVG(rating) averageRating FROM Recipe LEFT JOIN User_Recipe ON Recipe.id=User_Recipe.recipeId WHERE recipeId=$1 GROUP BY id, name;",
    [recipeId]
  );
  return res.rows.length > 0 ? convertRecipe(res.rows[0]) : null;
}

export async function getRecipeUserAware(recipeId, userId) {
  const res = await pool.query(
    "SELECT id, name, averageCalories, prepTimeSeconds, imageUrl, directions, ThisUser.isFavorite isFavorite, ThisUser.rating rating, COUNT(User_Recipe.rating) numRatings, AVG(User_Recipe.rating) averageRating FROM Recipe LEFT JOIN (SELECT * FROM User_Recipe WHERE userId=$1 OR userId IS NULL) ThisUser ON Recipe.id=ThisUser.recipeId LEFT JOIN User_Recipe on Recipe.id=User_Recipe.recipeId WHERE id=$2 GROUP BY id, name, ThisUser.isFavorite, ThisUser.rating;",
    [userId, recipeId]
  )
  return res.rows.length > 0 ? convertRecipe(res.rows[0]) : null;
}
