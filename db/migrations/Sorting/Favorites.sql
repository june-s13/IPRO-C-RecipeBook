-- Show only favorites
SELECT name 
FROM User_Recipe 
JOIN recipe ON User_Recipe.recipeId = recipe.id
WHERE isFavorite = true;