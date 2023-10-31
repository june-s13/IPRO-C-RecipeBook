import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function ingredientsteprating({ label }) {
  const [value, setValue] = useState(2.5); // default value

  return (
    <Paper elevation={2} style={{ marginBottom: '10px', padding: '10px' }}>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle1">Rate this:</Typography>
        <Rating
          name={`rate-${label}`}
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
    </Paper>
  );
}

export default ingredientsteprating;
