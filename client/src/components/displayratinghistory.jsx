import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography, Rating } from '@mui/material';

const userRatingHistory = [
  { recipeId: 1, recipeTitle: 'Spaghetti Carbonara', rating: 4 },
  { recipeId: 2, recipeTitle: 'Classic Cheesecake', rating: 5 },
];

const RatingHistory = () => {
  return (
    <List dense>
      <Typography variant="h6">Your Rating History</Typography>
      {userRatingHistory.map((item, index) => (
        <ListItem key={index} divider>
          <ListItemText primary={item.recipeTitle} />
          <Rating value={item.rating} readOnly />
        </ListItem>
      ))}
    </List>
  );
};

const PersonalizedContent = () => {
  const topRatedRecipes = userRatingHistory.filter(item => item.rating === 5);
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Recommended for You
      </Typography>
      {topRatedRecipes.length > 0 ? (
        <List dense>
          {topRatedRecipes.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Because you loved the ${item.recipeTitle}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">
          Rate more recipes to get personalized recommendations!
        </Typography>
      )}
    </div>
  );
};

const UserProfilePage = () => {
  return (
    <div>
      <RatingHistory />
      <PersonalizedContent />
    </div>
  );
};

export default UserProfilePage;
