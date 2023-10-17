-- Use this for finding all ingredients in a recipe. Replace the WHERE clause with what you are filtering for. 

SELECT
    recipe.name AS recipe_name,
    ingredient.name AS ingredient_name
FROM Recipe
JOIN Recipe_Ingredient ON Recipe.Id = Recipe_Ingredient.recipeid
JOIN ingredient ON Recipe_Ingredient.ingredientId = ingredient.id
-- WHERE recipe.id = 1
-- WHERE recipe.name = 'Spinach Soup'
;