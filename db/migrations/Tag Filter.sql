-- Use this for finding all tags that a recipe has. Replace the WHERE clause with what you are filtering for. 

-- Merged Tags
SELECT
    recipe.name AS recipe_name,
    STRING_AGG(Tag.name, ', ') AS combined_tag_names
FROM Recipe_Tag
JOIN Tag ON Recipe_Tag.tagId = Tag.id
JOIN Recipe ON Recipe_Tag.recipeId = recipe.id
-- WHERE recipe_tag.recipeid = 1
-- WHERE recipe.name = 'Soup'
GROUP BY recipe.name;

-- Seperated Tags
SELECT
    recipe.name AS recipe_name,
    tag.name AS tag_name
FROM Recipe_Tag
JOIN Tag ON Recipe_Tag.tagId = Tag.id
JOIN Recipe ON Recipe_Tag.recipeId = recipe.id
-- WHERE recipe_tag.recipeid = 1
-- WHERE recipe.name = 'Spinach Soup'
;

-- Use this for finding all recipes that fit a tag. Replace the WHERE clause with what you are filtering for. 

-- Merged Tags
SELECT
    tag.name AS tag_name,
    STRING_AGG(recipe.name, ', ') AS combined_recipe_names
FROM Recipe_Tag
JOIN Tag ON Recipe_Tag.tagId = Tag.id
JOIN Recipe ON Recipe_Tag.recipeId = recipe.id
-- WHERE recipe_tag.recipeid = 1
-- WHERE tag.name = 'Soup'
GROUP BY tag.name;

-- Seperated Tags
SELECT
    tag.name AS tag_name,
    recipe.name AS recipe_name
FROM Recipe_Tag
JOIN Tag ON Recipe_Tag.tagId = Tag.id
JOIN Recipe ON Recipe_Tag.recipeId = recipe.id
-- WHERE recipe_tag.recipeid = 1
-- WHERE tag.name = 'Soup'
;