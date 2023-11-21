import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActions,
  Button,
  Chip,
  Box,
  Stack,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Autocomplete,
  TextField,
  CircularProgress,
  IconButton
} from "@mui/material";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getIngredients } from "../../api/ingredients";
import { getRecipes } from "../../api/recipes";
import { getTags } from "../../api/tags";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useAuth } from "../../context/AuthContext";


// const dietRestrictions = ["Vegetarian", "Vegan", "Halal"];
// const mealTypes = ["Breakfast", "Lunch", "Dinner"];
// const mealCultures = [
//   "American",
//   "Middle Eastern",
//   "Italian",
//   "Spanish",
//   "Chinese",
//   "Indian",
//   "French",
// ];

export function RecipesPage() {
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

  /**
   * Options used for filtering ingredients
   */
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [dietRestriction, setDietRestriction] = useState([]);
  const [mealType, setMealType] = useState([]);
  const [cultureType, setCultureType] = useState([]);

  const recipesResult = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getRecipes(),
    initialData: [],
  });

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
      !tags.find(
        (tag) => !r.tags.find((rTag) => rTag.id === tag.id)
      )
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
  }, [
    recipesResult,
    ingredients,
    dietRestriction,
    mealType,
    cultureType,
    sortRecipesBy,
  ]);

  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [ratings, setRatings] = useState({});

  const handleToggleFavorite = (recipeId) => {
    // Toggle the favorite state for the specific recipe
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [recipeId]: !prevStatus[recipeId],
    }));
  };

  const handleRateRecipe = (recipeId, rating) => {
    // Set the rating for the specific recipe
    setRatings((prevRatings) => ({
      ...prevRatings,
      [recipeId]: rating,
    }));
  };

  const auth = useAuth();

  return (
    <Box sx={{ padding: 2 }}>
      <Stack sx={{ marginBottom: 2 }} direction="column" justifyContent="center">
        <FormControl sx={{ m: 1, }} size="small">
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
        <FormControl sx={{ m: 1, }} size="small">
          <Stack gap={1} flexDirection="row" flexWrap="wrap">
            {tagsResult.data.sort((a, b) => {
              const aSelected = tags.find(t => t.id === a.id)
              const bSelected = tags.find(t => t.id === b.id)
              if (aSelected && bSelected || !aSelected && !bSelected) {
                return a.name.localeCompare(b.name)
              }
              if (aSelected) return -1;
              if (bSelected) return 1;
            }).map(tag => {
              const selected = tags.find(t => t.id === tag.id)
              return <Chip
                key={tag.id}
                label={tag.name}
                onClick={() => {
                  setTags(prevTags => {
                    return [...prevTags, tag]
                  })
                }}
                clickable={!selected}
                onDelete={selected ? () => {
                  setTags(prevTags => {
                      return prevTags.filter(t => t.id !== tag.id)
                  })
                } : undefined}
                variant={selected ? "filled" : "outlined"}
                color={selected ? "primary" : "default"}
              />
            })}
          </Stack>
        </FormControl>
      </Stack>
      {recipesResult.isSuccess ? (
        <Grid container spacing={4}>
          {recipes.map((recipe) => {
            const isFavorite = favoriteStatus[recipe.id] || false;
            const rating = ratings[recipe.id] || 0;

            return (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card elevation={4}>
                  <CardMedia
                    component="img"
                    height={200}
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    sx={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {recipe.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {recipe.numMissingIngredients} more ingredients needed
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {recipe.averageCalories} calories per serving
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Prep Time: {recipe.prepTimeSeconds / 60} minutes
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      gap={1}
                      flexWrap="wrap"
                    >
                      {recipe.tags.map((tag) => (
                        <Chip
                          key={tag.id}
                          size="small"
                          label={tag.name}
                          color="secondary"
                        />
                      ))}
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Link to={`/recipes/${recipe.id}`}>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        target="_blank"
                      >
                        View Recipe
                      </Button>
                    </Link>
                    {auth.user && (
                      <>
                        <IconButton color="primary" onClick={() => handleToggleFavorite(recipe.id)}>
                          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        
                        {[1, 2, 3, 4, 5].map((star) => (
                          <IconButton
                            key={star}
                            color="primary"
                            onClick={() => handleRateRecipe(recipe.id, star)}
                          >
                            {rating >= star ? <StarIcon /> : <StarBorderIcon />}
                          </IconButton>
                        ))}
                      </>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : recipesResult.isLoading ? (
        <CircularProgress />
      ) : null}
    </Box>
  );
}
