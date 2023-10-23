import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <CookiesProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
