-- Use this for finding all recipes that use an ingredient. Replace the WHERE clause with what you are filtering for.

SELECT
    ingredient.name AS ingredient_name,
    STRING_AGG(recipe.name, ', ') AS combined_recipe_names
FROM Recipe
JOIN Recipe_Ingredient ON Recipe.Id = Recipe_Ingredient.recipeid
JOIN ingredient ON Recipe_Ingredient.ingredientId = ingredient.id
-- WHERE ingredient.name = 'Chopped Spinach'
-- WHERE ingredient.id = 1
GROUP BY ingredient_name
;