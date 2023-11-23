import { useMutation, useQuery, useQueryClient } from "react-query";
import { getRecipe } from "../../api/recipes";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { RecipeRating, RecipeUserRating } from "../../components/rating";
import { favoriteRecipe, unfavoriteRecipe } from "../../api/favorites";
import { FavoriteButton } from "../../components/recipe-card";
import { clearRecipeRating, rateRecipe } from "../../api/ratings";

export function RecipePage() {
  const { recipeId: recipeIdUnparsed } = useParams();
  const recipeId = parseInt(recipeIdUnparsed);

  const queryClient = useQueryClient();

  const recipeResult = useQuery({
    queryKey: ["recipes", recipeId],
    queryFn: () => getRecipe(recipeId),
  });

  const recipe = recipeResult.data;

  const favoriteRecipeMutation = useMutation({
    mutationFn: favoriteRecipe,
    onSuccess: (_, recipeId) => {
      queryClient.setQueryData(["recipes", recipeId], (recipe) => ({
        ...recipe,
        isFavorite: true,
      }));
    },
  });

  const unfavoriteRecipeMutation = useMutation({
    mutationFn: unfavoriteRecipe,
    onSuccess: (_, recipeId) => {
      queryClient.setQueryData(["recipes", recipeId], (recipe) => ({
        ...recipe,
        isFavorite: false,
      }));
    },
  });

  const rateRecipeMutation = useMutation({
    mutationFn: ({ recipeId, rating }) => rateRecipe(recipeId, rating),
    onSuccess: (_, { recipeId, rating }) => {
      queryClient.invalidateQueries(["recipes", recipeId])
    },
  });

  const clearRecipeRatingMutation = useMutation({
    mutationFn: clearRecipeRating,
    onSuccess: (_, recipeId) => {
      queryClient.invalidateQueries(["recipes", recipeId])
    },
  });

  const onFavoriteRecipe = async () => {
    await favoriteRecipeMutation.mutateAsync(recipe.id);
  };

  const onUnfavoriteRecipe = async () => {
    await unfavoriteRecipeMutation.mutateAsync(recipe.id);
  };

  const onRateRecipe = async (rating) => {
    await rateRecipeMutation.mutateAsync({
      recipeId: recipe.id,
      rating,
    });
  };

  const onClearRecipeRating = async () => {
    await clearRecipeRatingMutation.mutateAsync(recipe.id);
  };

  return (
    <>
      {recipeResult.isSuccess ? (
        <Card>
          <CardMedia component="img" height={300} src={recipe.imageUrl} />
          <CardContent>
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Typography variant="h4" component="div" gutterBottom>
                {recipe.name}
              </Typography>
              <FavoriteButton
                isFavorite={recipe.isFavorite}
                onUnfavorite={onUnfavoriteRecipe}
                onFavorite={onFavoriteRecipe}
              />
            </Box>
            <RecipeRating
              averageRating={recipe.averageRating}
              numRatings={recipe.numRatings}
            />
            <RecipeUserRating
              rating={recipe.rating}
              onRatingChange={(e, rating) => onRateRecipe(rating)}
              onClearRating={onClearRecipeRating}
            />
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
                <p key={ing.id}>
                  {ing.requirementAmount !== 0
                    ? ing.requirementAmount + " "
                    : ""}
                  {ing.requirementUnit !== "<unit>"
                    ? ing.requirementUnit + " "
                    : ""}
                  {ing.name}
                </p>
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
