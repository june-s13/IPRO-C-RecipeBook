-- Sort by rating in ascending order
SELECT name, rating 
FROM User_Recipe 
JOIN recipe ON User_Recipe.recipeId = recipe.id
ORDER BY rating ASC;