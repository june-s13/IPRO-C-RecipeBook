import { pool } from "./client.js";

export async function mergedByIngredient(ingredientName) {
    const res = await pool.query(
        `SELECT ingredient.name AS ingredient_name, STRING_AGG(recipe.name, ', ') AS combined_recipe_names FROM Recipe JOIN Recipe_Ingredient 
        ON Recipe.Id = Recipe_Ingredient.recipeid JOIN ingredient ON Recipe_Ingredient.ingredientId = ingredient.id WHERE ingredient.name = $1 
        GROUP BY ingredient_name;`
        [ingredientName]
    );
  return res.rows;
}

export async function seperatedByIngredient(ingredientName) {
    const res = await pool.query(
        `SELECT ingredient.name AS ingredient_name, recipe.name AS recipe_name FROM Recipe JOIN Recipe_Ingredient ON Recipe.Id = Recipe_Ingredient.recipeid 
        JOIN ingredient ON Recipe_Ingredient.ingredientId = ingredient.id WHERE ingredient.name = $1;`
        [ingredientName]
      );
    return res.rows;
}

export async function mergedByTag(tagName) {
    const res = await pool.query(
        `SELECT tag.name AS tag_name, STRING_AGG(recipe.name, ', ') AS combined_recipe_names FROM Recipe_Tag JOIN Tag ON Recipe_Tag.tagId = Tag.id 
        JOIN Recipe ON Recipe_Tag.recipeId = recipe.id WHERE tag.name = $1 GROUP BY tag.name;`
        [tagName]
    );
  return res.rows;
}

export async function seperatedByTag(tagName) {
    const res = await pool.query(
        `SELECT tag.name AS tag_name, recipe.name AS recipe_name FROM Recipe_Tag JOIN Tag ON Recipe_Tag.tagId = Tag.id JOIN Recipe ON Recipe_Tag.recipeId = recipe.id 
        WHERE tag.name = $1;`
        [tagName]
      );
    return res.rows;
}

