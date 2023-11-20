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
} from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getIngredients } from "../../api/ingredients";
import { getRecipes } from "../../api/recipes";

const dietRestrictions = ["Vegetarian", "Vegan", "Halal"];

const mealTypes = ["Breakfast", "Lunch", "Dinner"];

const mealCultures = [
  "American",
  "Middle Eastern",
  "Italian",
  "Spanish",
  "Chinese",
  "Indian",
  "French",
];

export function RecipesPage() {
  const ingredientsResult = useQuery({
    queryKey: ["ingredients"],
    queryFn: getIngredients,
    initialData: [],
  });

  /**
   * Options used for filtering ingredients
   */
  const [ingredients, setIngredients] = useState([]);
  const [dietRestriction, setDietRestriction] = useState([]);
  const [mealType, setMealType] = useState([]);
  const [cultureType, setCultureType] = useState([]);

  const recipesResult = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getRecipes(),
    initialData: [],
  });

  function filterRecipes(r) {
    let matchingDiet = false;
    let matchingType = false;
    let matchingCulture = false;
    let matchingIngredients = false;

    if (ingredients.length === 0 || !ingredients.find(ing => !r.ingredients.find(rIng => rIng.id === ing.id))) {
      matchingIngredients = true;
    }

    if (dietRestriction.length === 0) {
      matchingDiet = true;
    }

    for (let i = 0; i < dietRestriction.length; i++) {
      if (r.tags.find((tag) => tag.name === dietRestriction[i])) {
        matchingDiet = true;
      }
    }

    if (mealType.length === 0) {
      matchingType = true;
    }

    for (let i = 0; i < mealType.length; i++) {
      if (r.tags.find((tag) => tag.name === mealType[i])) {
        matchingType = true;
      }
    }

    if (cultureType.length == 0) {
      matchingCulture = true;
    }

    for (let i = 0; i < cultureType.length; i++) {
      if (r.tags.find((tag) => tag.name === cultureType[i])) {
        matchingCulture = true;
      }
    }

    return matchingIngredients && matchingDiet && matchingType && matchingCulture;
  }

  const handleDiet = (event) => {
    const {
      target: { value },
    } = event;
    setDietRestriction(typeof value === "string" ? value.split(",") : value);
  };

  const handleMeal = (event) => {
    const {
      target: { value },
    } = event;
    setMealType(typeof value === "string" ? value.split(",") : value);
  };

  const handleCulture = (event) => {
    const {
      target: { value },
    } = event;
    setCultureType(typeof value === "string" ? value.split(",") : value);
  };

  const sortRecipesBy = "numMissingIngredients"
  const sortRecipesOrder = "asc"

  const recipes = useMemo(() => {
    return recipesResult.data.filter(filterRecipes).map(recipe => {
      const numMissingIngredients = recipe.ingredients.filter(rIng => !ingredients.find(ing => ing.id === rIng.id)).length
      return {
        ...recipe,
        numMissingIngredients
      }
    }).sort((a, b) => {
      switch (sortRecipesBy) {
        case "numMissingIngredients":
          return a.numMissingIngredients - b.numMissingIngredients
      }
    })
  }, [recipesResult, ingredients, dietRestriction, mealType, cultureType, sortRecipesBy])

  return (
    <Box sx={{ padding: 2 }}>
      <Stack sx={{ marginBottom: 2 }} direction="row" justifyContent="center">
        <FormControl sx={{ m: 1, width: 400 }} size="small">
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
        <FormControl sx={{ m: 1, width: 200 }} size="small">
          <InputLabel id="diet-restriction-chip-label">Diet</InputLabel>
          <Select
            labelId="diet-restriction-chip-label"
            id="diet-restriction-chip"
            multiple
            value={dietRestriction}
            onChange={handleDiet}
            input={<OutlinedInput label="Diet" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {dietRestrictions.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200 }} size="small">
          <InputLabel id="meal-type-chip-label">Meal Type</InputLabel>
          <Select
            labelId="meal-type-chip-label"
            id="meal-type-chip"
            multiple
            value={mealType}
            onChange={handleMeal}
            input={<OutlinedInput label="Meal Type" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {mealTypes.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200 }} size="small">
          <InputLabel id="meal-culture-chip-label">Culture</InputLabel>
          <Select
            labelId="meal-culture-chip-label"
            id="meal-culture-chip"
            multiple
            value={cultureType}
            onChange={handleCulture}
            input={<OutlinedInput label="Culture" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {mealCultures.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {/* <Stack direction="row" justifyContent="center" sx={{ marginBottom: 2 }}>
        <Button
          variant="contained"
          onClick={fetchRecipes}
          disabled={recipesResult.isLoading}
        >
          Search
        </Button>
      </Stack> */}
      {recipesResult.isSuccess ? (
        <Grid container spacing={4}>
          {recipes.map((recipe) => {
            return <Grid item xs={12} sm={6} md={4} key={recipe.id}>
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
                    Ingredients Needed: {recipe.numMissingIngredients}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Prep Time: {recipe.prepTimeSeconds / 60} minutes
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Calories: {recipe.averageCalories} per serving
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    gap={1}
                    flexWrap="wrap"
                  >
                    {recipe.tags.map((tag) => (
                      <Chip key={tag.id} size="small" label={tag.name} color="secondary" />
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
                </CardActions>
              </Card>
            </Grid> }
          )}
        </Grid>
      ) : recipesResult.isLoading ? (
        <CircularProgress />
      ) : null}
    </Box>
  );
}
