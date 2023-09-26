import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IndexPage } from "./pages";
import { RecipesPage } from "./pages/recipes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/recipes",
    children: [
      {
        index: true,
        element: <RecipesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
