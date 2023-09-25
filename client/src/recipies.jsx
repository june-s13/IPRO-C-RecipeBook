import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Recipe', width: 130, align:'center', sortable: false},
  { field: 'ingNeeded', headerName: '# of ingredients needed', width: 180, align:'center' },
  { field: 'prepTime', headerName: 'Prep time (minutes)', type: 'number', width: 160, align:'center' },
  { field: 'calories', headerName: 'Calories per serving', type: 'number', width: 170, align:'center' },
  { field: 'recipeLink', headerName: 'Recipe link', width: 130, align:'center', sortable: false },
  { field: 'dietaryInfo', headerName: 'Dietary Info', width: 130, align:'center', sortable: false },
];

const rows = [
  { id: "chicken1", ingNeeded: 1, prepTime: 8, calories: 160, recipeLink: "http://", dietaryInfo: "vegan" },
  { id: "chicken2", ingNeeded: 2, prepTime: 5, calories: 60, recipeLink: "http://", dietaryInfo: "vegan" },
  { id: "chicken3", ingNeeded: 3, prepTime: 1, calories: 300, recipeLink: "http://", dietaryInfo: "vegan" },
  { id: "chicken4", ingNeeded: 7, prepTime: 3, calories: 160, recipeLink: "http://", dietaryInfo: "vegan" },
  { id: "chicken5", ingNeeded: 4, prepTime: 1, calories: 500, recipeLink: "http://", dietaryInfo: "vegan" },
  { id: "chicken6", ingNeeded: 1, prepTime: 1, calories: 160, recipeLink: "http://", dietaryInfo: "vegan" },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
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
    </div>
  );
}