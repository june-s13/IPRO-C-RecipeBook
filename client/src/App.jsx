import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/login/login.jsx";
import { RecipesPage } from "./pages/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RecipesPage />,
  },
  {
    path: "/login",
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
