import { Box, Button, Rating, Typography } from "@mui/material";

export function RecipeRating({ averageRating, numRatings }) {
  return (
    <Box display="flex" alignItems="center" gap={1} marginBottom={1}>
      <Rating value={averageRating} readOnly />
      <Typography variant="body2">
        {numRatings === 0 ? (
          "No ratings"
        ) : (
          <>
            {Math.floor(averageRating * 10) / 10} ({numRatings} rating
            {numRatings === 1 ? "" : "s"})
          </>
        )}
      </Typography>
    </Box>
  );
}

export function RecipeUserRating({ rating, onRatingChange, onClearRating }) {
  return (
    <>
      <Box display="flex" alignItems="center" gap={1} marginBottom={1}>
        <Rating value={rating} onChange={onRatingChange} />
        <Typography variant="body2">Your Rating</Typography>
        {rating !== null ? (
          <Button onClick={onClearRating} variant="outlined" color="warning">
            Clear Rating
          </Button>
        ) : null}
      </Box>
    </>
  );
}
