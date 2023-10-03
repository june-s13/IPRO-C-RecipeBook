-- Sort by calories in descending order
SELECT name, averageCalories FROM Recipe ORDER BY averageCalories DESC;

-- Sort by calories in ascending order
SELECT name, averageCalories FROM Recipe ORDER BY averageCalories ASC;

-- Sort by prep time in descending order
SELECT name, prepTimeSeconds FROM Recipe ORDER BY prepTimeSeconds DESC;

-- Sort by prep time in ascending order
SELECT name, prepTimeSeconds FROM Recipe ORDER BY prepTimeSeconds ASC;

-- Sort by rating in descending order
SELECT name, rating 
FROM User_Recipe 
JOIN recipe ON User_Recipe.recipeId = recipe.id
ORDER BY rating DESC;

-- Sort by rating in ascending order
SELECT name, rating 
FROM User_Recipe 
JOIN recipe ON User_Recipe.recipeId = recipe.id
ORDER BY rating ASC;

-- Show only favorites
SELECT name 
FROM User_Recipe 
JOIN recipe ON User_Recipe.recipeId = recipe.id
WHERE isFavorite = true;

-- Alphabetical order A-Z
SELECT name FROM recipe ORDER BY name ASC;

-- Alphabetical order Z-A
SELECT name FROM recipe ORDER BY name DESC;