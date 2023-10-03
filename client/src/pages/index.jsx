import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import testImage from '../assets/react.svg';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'Recipe', width: 130, align:'center', sortable: false},
  { field: 'image', headerName: 'Image', width: 180, align:'center', sortable: false, renderCell: (params) => <img src={params.value}/> },
  { field: 'ingNeeded', headerName: '# of ingredients needed', width: 180, align:'center' },
  { field: 'prepTime', headerName: 'Prep time (minutes)', type: 'number', width: 160, align:'center' },
  { field: 'calories', headerName: 'Calories per serving', type: 'number', width: 170, align:'center' },
  { field: 'recipeLink', headerName: 'Recipe link', width: 130, align:'center', sortable: false },
  { field: 'dietaryInfo', headerName: 'Dietary Info', width: 130, align:'center', sortable: false },
];

const rows = [
  { id: "chicken1", image: testImage, ingNeeded: 1, prepTime: 8, calories: 160, recipeLink: "http://", dietaryInfo: "vegan" },
  { id: "chicken2", image: testImage, ingNeeded: 2, prepTime: 5, calories: 60, recipeLink: "http://", dietaryInfo: "vegan" },
  { id: "chicken3", image: testImage, ingNeeded: 3, prepTime: 1, calories: 300, recipeLink: "http://", dietaryInfo: "vegan" },
  { id: "chicken4", image: testImage, ingNeeded: 7, prepTime: 3, calories: 160, recipeLink: "http://", dietaryInfo: "vegan" },
  { id: "chicken5", image: testImage, ingNeeded: 4, prepTime: 1, calories: 500, recipeLink: "http://", dietaryInfo: "vegan" },
  { id: "chicken6", image: testImage, ingNeeded: 1, prepTime: 1, calories: 160, recipeLink: "http://", dietaryInfo: "vegan" },
];

export function RecipesPage() {
  
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };
  
  return (
    <div style={{ height: 400, width: 1100 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 5, mb: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
}