import testImage from "../../assets/react.svg";
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
} from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import { InputIngredients } from "../../components/InputIngredients/InputIngredients";
import { useState } from "react";

// TODO: Get recipes from server based on form input
const rows = [
  {
    id: "chicken1",
    image: testImage,
    ingNeeded: 1,
    prepTime: 8,
    calories: 160,
    recipeLink: "http://",
    dietaryInfo: "vegan",
  },

  {
    id: "chicken2",
    image: testImage,
    ingNeeded: 2,
    prepTime: 5,
    calories: 60,
    recipeLink: "http://",
    dietaryInfo: "vegan",
  },

  {
    id: "chicken3",
    image: testImage,
    ingNeeded: 3,
    prepTime: 1,
    calories: 300,
    recipeLink: "http://",
    dietaryInfo: "vegan",
  },

  {
    id: "chicken4",
    image: testImage,
    ingNeeded: 7,
    prepTime: 3,
    calories: 160,
    recipeLink: "http://",
    dietaryInfo: "vegan",
  },

  {
    id: "chicken5",
    image: testImage,
    ingNeeded: 4,
    prepTime: 1,
    calories: 500,
    recipeLink: "http://",
    dietaryInfo: "vegan",
  },

  {
    id: "chicken6",
    image: testImage,
    ingNeeded: 1,
    prepTime: 1,
    calories: 160,
    recipeLink: "http://",
    dietaryInfo: "vegan",
  },
];

// TODO: Get list of ingredients from server
const ingredientOptions = [
  { ing: "Chicken" },
  { ing: "White Rice" },
  { ing: "Pinto Beans" },
  { ing: "Carrots" },
  { ing: "Eggs" },
  { ing: "Bacon" },
  { ing: "Vanilla" },
  { ing: "Ham" },
  { ing: "Yogurt" },
  { ing: "Super long name for ingredient" },
];

export function RecipesPage() {
  /**
   * Options used for filtering ingredients
   */
  const [options, setOptions] = useState({
    ingredients: [],
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Stack sx={{ marginBottom: 2 }} direction="row" justifyContent="center">
        <InputIngredients
          ingredientOptions={ingredientOptions}
          value={options.ingredients}
          onChange={(e, ingredients) => {
            setOptions((prev) => ({ ...prev, ingredients }));
          }}
        />
      </Stack>
      <Grid container spacing={4}>
        {rows.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card elevation={4}>
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.id}
                sx={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
              />
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {recipe.id}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Ingredients Needed: {recipe.ingNeeded}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Prep Time: {recipe.prepTime} minutes
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Calories: {recipe.calories} per serving
                </Typography>
                <Chip
                  label={recipe.dietaryInfo}
                  color="primary"
                  sx={{ backgroundColor: pink[100] }}
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  href={recipe.recipeLink}
                  target="_blank"
                  sx={{ color: blue[500] }}
                >
                  View Recipe
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
