import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function RateRecipeBox() {
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{
        width: 'fit-content',
        padding: '20px',
        border: '1px solid gray',
        borderRadius: '5px'
      }}
    >
      <Typography gutterBottom>Rate this recipe:</Typography>
      <Rating
        name="recipe-rating"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
}

export default RateRecipeBox;

