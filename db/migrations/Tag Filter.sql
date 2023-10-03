SELECT
    subquery.name AS recipe_name,
    STRING_AGG(Tag.name, ', ') AS combined_tag_names
FROM Recipe_Tag
JOIN Tag ON Recipe_Tag.tagId = Tag.id
JOIN (
    SELECT name, id FROM Recipe
) AS subquery
ON Recipe_Tag.recipeId = subquery.id
WHERE recipe_tag.recipeid = 1
GROUP BY subquery.name;


-- Use this for finding all tags that a recipe has. Replace the 1 in the WHERE clause with the recipe's id. 