import { useQuery } from "react-query";
import { getRecipe } from "../../api/recipes";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

export function RecipePage() {
  const { recipeId } = useParams();

  const recipeResult = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipe(recipeId),
  });

  const recipe = recipeResult.data;

  return (
    <>
      {recipeResult.isSuccess ? (
        <Card>
          <CardMedia component="img" height={300} src={recipe.imageUrl} />
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              {recipe.name}
            </Typography>
            <Typography
              variant="body"
              color="text.secondary"
              gutterBottom
              sx={{ display: "block" }}
            >
              Prep Time: {recipe.prepTimeSeconds / 60} minutes
            </Typography>
            <Typography variant="body" color="text.secondary" gutterBottom>
              Calories: {recipe.averageCalories} per serving
            </Typography>
            <Stack
              direction="row"
              justifyContent="flex-start"
              gap={1}
              flexWrap="wrap"
              sx={{ marginY: 3 }}
            >
              {recipe.tags.map((tag) => (
                <Chip key={tag.id} label={tag.name} color="secondary" />
              ))}
            </Stack>
            <Typography variant="h5">Ingredients</Typography>

            <Typography variant="body" color="text.primary">
              {recipe.ingredients.map((ing) => (
                <p key={ing.id}>{ing.requirementAmount} {ing.requirementUnit} {ing.name}</p>
              ))}
            </Typography>
            <Typography variant="h5">Directions</Typography>
            <Typography variant="body" color="text.primary">
              {recipe.directions.split("\n").map((pgh, idx) => (
                <p key={idx}>{pgh}</p>
              ))}
            </Typography>
          </CardContent>
        </Card>
      ) : recipeResult.isLoading ? (
        <CircularProgress />
      ) : null}
    </>
  );
}
