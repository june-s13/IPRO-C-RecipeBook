import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
  Stack,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { RecipeRating } from "./rating";
import { Link } from "react-router-dom";

export function RecipeCard({
  recipe,
  onFavorite,
  onUnfavorite,
  favoriteHidden,
  favoriteDisabled,
}) {
  return (
    <Grid item xs={12} sm={6} md={4}>
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
          <RecipeRating
            averageRating={recipe.averageRating}
            numRatings={recipe.numRatings}
          />
          {recipe.numMissingIngredients ? (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {recipe.numMissingIngredients} more ingredients needed
            </Typography>
          ) : null}
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {recipe.averageCalories} calories per serving
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
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
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
          <Box display="flex" alignItems="center">
            {!favoriteHidden && (
              <FavoriteButton
                isFavorite={recipe.isFavorite}
                disabled={favoriteDisabled}
                onUnfavorite={onUnfavorite}
                onFavorite={onFavorite}
              />
            )}
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}

export function FavoriteButton({
  isFavorite,
  disabled,
  onUnfavorite,
  onFavorite,
}) {
  return (
    <Tooltip title={isFavorite ? "Unfavorite" : "Favorite"}>
      <IconButton
        color="primary"
        onClick={isFavorite ? onUnfavorite : onFavorite}
        disabled={disabled}
      >
        {isFavorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
}
