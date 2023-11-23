import { useMutation, useQuery, useQueryClient } from "react-query";
import { getFavoriteRecipes, unfavoriteRecipe } from "../../api/favorites";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { RecipeCard } from "../../components/recipe-card";

export function FavoritesPage() {
  const queryClient = useQueryClient()

  const favoriteRecipesResult = useQuery({
    queryKey: ["favoriteRecipes"],
    queryFn: getFavoriteRecipes,
    initialData: [],
  });

  const unfavoriteRecipeMutation = useMutation({
    mutationFn: unfavoriteRecipe,
    onSuccess: (_, recipeId) => {
      queryClient.setQueryData(["favoriteRecipes"], (recipes) =>
        recipes.filter(recipe => recipe.id !== recipeId)
      );
    },
  });

  const onUnfavoriteRecipe = async (recipeId) => {
    await unfavoriteRecipeMutation.mutateAsync(recipeId);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom>Favorited Recipes</Typography>
      {favoriteRecipesResult.isSuccess ? (
        <Grid container spacing={4}>
          {favoriteRecipesResult.data.map((recipe) => {
            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                showFavorite
                onUnfavorite={() => onUnfavoriteRecipe(recipe.id)}
              />
            );
          })}
        </Grid>
      ) : favoriteRecipesResult.isLoading ? (
        <CircularProgress />
      ) : null}
    </Box>
  );
}
