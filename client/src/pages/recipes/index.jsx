import {
  Grid,
  Chip,
  Box,
  Stack,
  FormControl,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getIngredients } from "../../api/ingredients";
import { getRecipes } from "../../api/recipes";
import { getTags } from "../../api/tags";
import { useAuth } from "../../context/AuthContext";
import { favoriteRecipe, unfavoriteRecipe } from "../../api/favorites";
import { RecipeCard } from "../../components/recipe-card";

export function RecipesPage() {
  const queryClient = useQueryClient();

  const ingredientsResult = useQuery({
    queryKey: ["ingredients"],
    queryFn: getIngredients,
    initialData: [],
  });

  const tagsResult = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
    initialData: [],
  });

  const recipesResult = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
    initialData: [],
  });

  const favoriteRecipeMutation = useMutation({
    mutationFn: favoriteRecipe,
    onSuccess: (_, recipeId) => {
      queryClient.setQueryData(["recipes"], (recipes) =>
        recipes.map((recipe) =>
          recipe.id === recipeId ? { ...recipe, isFavorite: true } : recipe
        )
      );
    },
  });

  const unfavoriteRecipeMutation = useMutation({
    mutationFn: unfavoriteRecipe,
    onSuccess: (_, recipeId) => {
      queryClient.setQueryData(["recipes"], (recipes) =>
        recipes.map((recipe) =>
          recipe.id === recipeId ? { ...recipe, isFavorite: false } : recipe
        )
      );
    },
  });

  const onFavoriteRecipe = async (recipeId) => {
    await favoriteRecipeMutation.mutateAsync(recipeId);
  };

  const onUnfavoriteRecipe = async (recipeId) => {
    await unfavoriteRecipeMutation.mutateAsync(recipeId);
  };

  /**
   * Options used for filtering ingredients
   */
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);

  function filterRecipes(r) {
    let matchingIngredients = false;
    let matchingTags = false;

    if (
      ingredients.length === 0 ||
      !ingredients.find(
        (ing) => !r.ingredients.find((rIng) => rIng.id === ing.id)
      )
    ) {
      matchingIngredients = true;
    }

    if (
      tags.length === 0 ||
      !tags.find((tag) => !r.tags.find((rTag) => rTag.id === tag.id))
    ) {
      matchingTags = true;
    }
    return matchingIngredients && matchingTags;
  }

  const sortRecipesBy = "numMissingIngredients";
  const sortRecipesOrder = "asc";

  const recipes = useMemo(() => {
    return recipesResult.data
      .filter(filterRecipes)
      .map((recipe) => {
        const numMissingIngredients = recipe.ingredients.filter(
          (rIng) => !ingredients.find((ing) => ing.id === rIng.id)
        ).length;
        return {
          ...recipe,
          numMissingIngredients,
        };
      })
      .sort((a, b) => {
        switch (sortRecipesBy) {
          case "numMissingIngredients":
            return a.numMissingIngredients - b.numMissingIngredients;
        }
      });
  }, [recipesResult, ingredients, sortRecipesBy]);

  const auth = useAuth();

  return (
    <Box sx={{ padding: 2 }}>
      <Stack
        sx={{ marginBottom: 2 }}
        direction="column"
        justifyContent="center"
      >
        <FormControl sx={{ m: 1 }} size="small">
          <Autocomplete
            multiple
            loading={ingredientsResult.isLoading}
            options={ingredientsResult.data}
            value={ingredients}
            onChange={(e, ingredients) => setIngredients(ingredients)}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            getOptionLabel={(i) => i.name}
            renderInput={(params) => (
              <TextField {...params} label="Ingredients" />
            )}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small">
          <Stack gap={1} flexDirection="row" flexWrap="wrap">
            {tagsResult.data
              .sort((a, b) => {
                const aSelected = tags.find((t) => t.id === a.id);
                const bSelected = tags.find((t) => t.id === b.id);
                if ((aSelected && bSelected) || (!aSelected && !bSelected)) {
                  return a.name.localeCompare(b.name);
                }
                if (aSelected) return -1;
                if (bSelected) return 1;
              })
              .map((tag) => {
                const selected = tags.find((t) => t.id === tag.id);
                return (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    onClick={() => {
                      setTags((prevTags) => {
                        return [...prevTags, tag];
                      });
                    }}
                    clickable={!selected}
                    onDelete={
                      selected
                        ? () => {
                            setTags((prevTags) => {
                              return prevTags.filter((t) => t.id !== tag.id);
                            });
                          }
                        : undefined
                    }
                    variant={selected ? "filled" : "outlined"}
                    color={selected ? "primary" : "default"}
                  />
                );
              })}
          </Stack>
        </FormControl>
      </Stack>
      {recipesResult.isSuccess ? (
        <Grid container spacing={4}>
          {recipes.map((recipe) => {
            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                favoriteHidden={!auth.user}
                onFavorite={() => onFavoriteRecipe(recipe.id)}
                onUnfavorite={() => onUnfavoriteRecipe(recipe.id)}
              />
            );
          })}
        </Grid>
      ) : recipesResult.isLoading ? (
        <CircularProgress />
      ) : null}
    </Box>
  );
}
