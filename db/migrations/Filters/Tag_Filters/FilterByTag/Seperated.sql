-- Use this for finding all recipes that fit a tag. Replace the WHERE clause with what you are filtering for. 

SELECT
    tag.name AS tag_name,
    recipe.name AS recipe_name
FROM Recipe_Tag
JOIN Tag ON Recipe_Tag.tagId = Tag.id
JOIN Recipe ON Recipe_Tag.recipeId = recipe.id
-- WHERE recipe_tag.recipeid = 1
-- WHERE tag.name = 'Soup'
;