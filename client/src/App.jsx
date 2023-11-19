import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { LoginPage } from "./pages/login/index.jsx";
import { RecipesPage } from "./pages/recipes/index.jsx";
import { Root } from "./pages/index.jsx";
import { FavoritesPage } from "./pages/favorites/index.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { SignupPage } from "./pages/signup/index.jsx";
import { CookiesProvider } from "react-cookie";
import {
  AuthenticatedOnly,
  UnauthenticatedOnly,
} from "./components/ProtectedRoute.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecipePage } from "./pages/recipes/recipe.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <RecipesPage />,
      },
      {
        path: "/favorites",
        element: (
          <AuthenticatedOnly>
            <FavoritesPage />
          </AuthenticatedOnly>
        ),
      },
      {
        path: "/recipes",
        children: [
          {
            index: true,
            element: <Navigate to="/" />,
          },
          {
            path: ":recipeId",
            element: <RecipePage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <UnauthenticatedOnly>
        <LoginPage />
      </UnauthenticatedOnly>
    ),
  },
  {
    path: "/signup",
    element: (
      <UnauthenticatedOnly>
        <SignupPage />
      </UnauthenticatedOnly>
    ),
  },
]);

// MUI Theme
const defaultTheme = createTheme();

// React-query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <CookiesProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
