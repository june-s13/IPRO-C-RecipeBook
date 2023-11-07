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
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import { InputIngredients } from "../../components/InputIngredients/InputIngredients";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'

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

const dietRestrictions = [
  'Vegetarian',
  'Vegan',
  'Halal',
];

const mealTypes = [
  'Breakfast',
  'Lunch',
  'Dinner',
];

const mealCultures = [
  'American',
  'Middle Eastern',
  'Italian', 
  'Spanish', 
  'Chinese',
  'Indian',
  'French'
];

export function RecipesPage() {
  /**
   * Options used for filtering ingredients
   */
  const [options, setOptions] = useState({
    ingredients: [],
  });
  
  const [dietRestriction, setDietRestriction] = useState([]);
  const [mealType, setMealType] = useState([]);
  const [cultureType, setCultureType] = useState([]);

  const navigate = useNavigate();
  const toRecipieComponent=(ingNeeded, prepTime, calories)=>{
	navigate('/viewrecipie',{state:{ingNeeded:ingNeeded, prepTime:prepTime, calories:calories}});
  }

  const handleDiet = (event) => {
    const {
      target: { value },
    } = event;
    setDietRestriction(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  const handleMeal = (event) => {
    const {
      target: { value },
    } = event;
    setMealType(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  const handleCulture = (event) => {
    const {
      target: { value },
    } = event;
    setCultureType(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
		<FormControl sx={{ m: 1, width: 200 }} size='small'>
		  <InputLabel id="diet-restriction-chip-label">Diet</InputLabel>
            <Select
              labelId="diet-restriction-chip-label"
              id="diet-restriction-chip"
              multiple
              value={dietRestriction}
              onChange={handleDiet}
              input={<OutlinedInput label="Diet"/>}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
            {dietRestrictions.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
              {name}
              </MenuItem>
            ))}
            </Select>
        </FormControl>
		<FormControl sx={{ m: 1, width: 200 }} size='small'>
		  <InputLabel id="meal-type-chip-label">Meal Type</InputLabel>
            <Select
              labelId="meal-type-chip-label"
              id="meal-type-chip"
              multiple
              value={mealType}
              onChange={handleMeal}
              input={<OutlinedInput label="Meal Type"/>}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
            {mealTypes.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
              {name}
              </MenuItem>
            ))}
            </Select>
        </FormControl>
		<FormControl sx={{ m: 1, width: 200 }} size='small'>
		  <InputLabel id="meal-culture-chip-label">Culture</InputLabel>
            <Select
              labelId="meal-culture-chip-label"
              id="meal-culture-chip"
              multiple
              value={cultureType}
              onChange={handleCulture}
              input={<OutlinedInput label="Culture"/>}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
            {mealCultures.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
              {name}
              </MenuItem>
            ))}
            </Select>
        </FormControl>
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
                  target="_blank"
                  sx={{ color: blue[500] }}
				  onClick={()=>{toRecipieComponent(recipe.ingNeeded, recipe.prepTime, recipe.calories)}}
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
