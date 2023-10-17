-- Use this for finding all tags that a recipe has. Replace the WHERE clause with what you are filtering for. 

SELECT
    recipe.name AS recipe_name,
    STRING_AGG(Tag.name, ', ') AS combined_tag_names
FROM Recipe_Tag
JOIN Tag ON Recipe_Tag.tagId = Tag.id
JOIN Recipe ON Recipe_Tag.recipeId = recipe.id
-- WHERE recipe_tag.recipeid = 1
-- WHERE recipe.name = 'Soup'
GROUP BY recipe.name
;