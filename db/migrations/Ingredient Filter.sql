-- Use this for finding all ingredients in a recipe. Replace the WHERE clause with what you are filtering for. 

-- Merged Ingredients
SELECT
    recipe.name AS recipe_name,
    STRING_AGG(ingredient.name, ', ') AS combined_ingredient_names
FROM Recipe
JOIN Recipe_Ingredient ON Recipe.Id = Recipe_Ingredient.recipeid
JOIN ingredient ON Recipe_Ingredient.ingredientId = ingredient.id
-- WHERE recipe.id = 1
-- WHERE recipe.name = 'Spinach Soup'
GROUP BY recipe_name;

-- Seperated Ingredients
SELECT
    recipe.name AS recipe_name,
    ingredient.name AS ingredient_name
FROM Recipe
JOIN Recipe_Ingredient ON Recipe.Id = Recipe_Ingredient.recipeid
JOIN ingredient ON Recipe_Ingredient.ingredientId = ingredient.id
-- WHERE recipe.id = 1
-- WHERE recipe.name = 'Spinach Soup'
;

-- Use this for finding all recipes that use an ingredient. Replace the WHERE clause with what you are filtering for.

-- Seperated recipes
SELECT
    ingredient.name AS ingredient_name,
    recipe.name AS recipe_name
FROM Recipe
JOIN Recipe_Ingredient ON Recipe.Id = Recipe_Ingredient.recipeid
JOIN ingredient ON Recipe_Ingredient.ingredientId = ingredient.id
-- WHERE ingredient.name = 'Chopped Spinach'
-- WHERE ingredient.id = 1
;

-- Merged recipes
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