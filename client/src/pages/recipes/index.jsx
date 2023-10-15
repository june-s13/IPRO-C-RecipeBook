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
} from "@mui/material";
import { blue, pink } from "@mui/material/colors";

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

export function RecipesPage() {
  return (
    <Grid container spacing={4} style={{ padding: 24 }}>
      {rows.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
          <Card elevation={4}>
            <CardMedia
              component="img"
              height="200"
              image={recipe.image}
              alt={recipe.id}
              style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
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
                style={{ backgroundColor: pink[100] }}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={recipe.recipeLink}
                target="_blank"
                style={{ color: blue[500] }}
              >
                View Recipe
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
