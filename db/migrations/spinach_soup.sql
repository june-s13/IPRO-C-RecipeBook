INSERT INTO recipe (id, name, instructions, averageCalories, prepTimeSeconds, imageurl) 
VALUES (1, 
'Spinach Soup', 
'1. In a pan add 1 teaspoon oil and garlic,chilly,onions and stir fry for1 min. 2. Now add spinach and cook for 1 min. 3. Now let it cool 4. Now make pury by adding 1/4 cup water 5. Now take pury in a pan add milk 6. And let it boil for 1 min. 7. Now add salt ,black paper powder 8. Mix well 9. Serve hot', 
0, 
900, 
'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.delish.com%2Fcooking%2Frecipe-ideas%2Fa25621667%2Fspinach-soup-recipe%2F&psig=AOvVaw3XFvc5lHajs9ImVKX5rtCg&ust=1695775764850000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCMCz9pKHx4EDFQAAAAAdAAAAABAE');

INSERT INTO ingredient (id, name) VALUES (1, 'Chopped Spinach');
INSERT INTO ingredient (id, name) VALUES (2, 'Chopped Onion');
INSERT INTO ingredient (id, name) VALUES (3, 'Chopped Garlic');
INSERT INTO ingredient (id, name) VALUES (4, 'Salt');
INSERT INTO ingredient (id, name) VALUES (5, 'Black Pepper Powder');
INSERT INTO ingredient (id, name) VALUES (6, 'Milk');
INSERT INTO ingredient (id, name) VALUES (7, 'Chopped Green Chili');

INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES (1, 1, 1, 'cup');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES (1, 2, 2, 'tsp');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES (1, 3, 1, 'tsp');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES (1, 4, 0.5, 'tsp');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES (1, 5, 0.5, 'tsp');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES (1, 6, 1, 'cup');
INSERT INTO recipe_ingredient (recipeId, ingredientId, requirementAmount, requirementUnit) VALUES (1, 7, 1, 'tsp'); 

INSERT INTO tag (id, name) VALUES (1, 'Soup');
INSERT INTO tag (id, name) VALUES (2, 'Diabetic');
INSERT INTO tag (id, name) VALUES (3, 'Vegetarian');
INSERT INTO tag (id, name) VALUES (4, 'Pan Fry');
INSERT INTO tag (id, name) VALUES (5, 'Spicy');
INSERT INTO tag (id, name) VALUES (6, 'Dinner');

INSERT INTO recipe_tag (recipeId, tagId) VALUES (1, 1);
INSERT INTO recipe_tag (recipeId, tagId) VALUES (1, 2);
INSERT INTO recipe_tag (recipeId, tagId) VALUES (1, 3);
INSERT INTO recipe_tag (recipeId, tagId) VALUES (1, 4);
INSERT INTO recipe_tag (recipeId, tagId) VALUES (1, 5);
INSERT INTO recipe_tag (recipeId, tagId) VALUES (1, 6);
