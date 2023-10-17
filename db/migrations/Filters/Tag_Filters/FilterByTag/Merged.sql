-- Use this for finding all recipes that fit a tag. Replace the WHERE clause with what you are filtering for. 

SELECT
    tag.name AS tag_name,
    STRING_AGG(recipe.name, ', ') AS combined_recipe_names
FROM Recipe_Tag
JOIN Tag ON Recipe_Tag.tagId = Tag.id
JOIN Recipe ON Recipe_Tag.recipeId = recipe.id
-- WHERE recipe_tag.recipeid = 1
-- WHERE tag.name = 'Soup'
GROUP BY tag.name
;