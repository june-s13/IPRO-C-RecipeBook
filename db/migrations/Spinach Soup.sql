INSERT INTO recipe (id, name, instructions, averageCalories, prepTimeSeconds, imageurl) 
VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM recipe), 
'Spinach Soup', 
'1. In a pan add 1 teaspoon oil and garlic,chilly,onions and stir fry for1 min. 2. Now add spinach and cook for 1 min. 3. Now let it cool 4. Now make pury by adding 1/4 cup water 5. Now take pury in a pan add milk 6. And let it boil for 1 min. 7. Now add salt ,black paper powder 8. Mix well 9. Serve hot', 
0, 
900, 
'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.delish.com%2Fcooking%2Frecipe-ideas%2Fa25621667%2Fspinach-soup-recipe%2F&psig=AOvVaw3XFvc5lHajs9ImVKX5rtCg&ust=1695775764850000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCMCz9pKHx4EDFQAAAAAdAAAAABAE');

INSERT INTO ingredient (id, name) VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM ingredient), 'Chopped Spinach');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM ingredient), 1, 'cup');

INSERT INTO ingredient (id, name) VALUES ((SELECT MAX(id) + 1 FROM ingredient), 'Chopped Onion');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM ingredient), 2, 'tsp'); 

INSERT INTO ingredient (id, name) VALUES ((SELECT MAX(id) + 1 FROM ingredient), 'Chopped Garlic');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM ingredient), 1, 'tsp'); 

INSERT INTO ingredient (id, name) VALUES ((SELECT MAX(id) + 1 FROM ingredient), 'Salt');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM ingredient), 0.5, 'tsp'); 

INSERT INTO ingredient (id, name) VALUES ((SELECT MAX(id) + 1 FROM ingredient), 'Black Pepper Powder');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM ingredient), 0.5, 'tsp'); 

INSERT INTO ingredient (id, name) VALUES ((SELECT MAX(id) + 1 FROM ingredient), 'Milk');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM ingredient), 1, 'cup'); 

INSERT INTO ingredient (id, name) VALUES ((SELECT MAX(id) + 1 FROM ingredient), 'Chopped Green Chili');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM ingredient), 1, 'tsp'); 



INSERT INTO tag (id, name) VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM tag), 'Soup');
INSERT INTO recipe_tag (recipeId, tagId) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM tag));

INSERT INTO tag (id, name) VALUES ((SELECT MAX(id) + 1 FROM tag), 'Diabetic');
INSERT INTO recipe_tag (recipeId, tagId) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM tag));

INSERT INTO tag (id, name) VALUES ((SELECT MAX(id) + 1 FROM tag), 'Vegetarian');
INSERT INTO recipe_tag (recipeId, tagId) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM tag));

INSERT INTO tag (id, name) VALUES ((SELECT MAX(id) + 1 FROM tag), 'Pan Fry');
INSERT INTO recipe_tag (recipeId, tagId) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM tag));

INSERT INTO tag (id, name) VALUES ((SELECT MAX(id) + 1 FROM tag), 'Spicy');
INSERT INTO recipe_tag (recipeId, tagId) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM tag));

INSERT INTO tag (id, name) VALUES ((SELECT MAX(id) + 1 FROM tag), 'Dinner');
INSERT INTO recipe_tag (recipeId, tagId) VALUES ((SELECT MAX(id) FROM recipe), (SELECT MAX(id) FROM tag));
