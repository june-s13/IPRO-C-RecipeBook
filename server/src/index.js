import express from "express";
import cors from "cors";
import { recipesRoute } from "./routes/recipes.js";
import { ingredientsRoute } from "./routes/ingredients.js";
import { session } from "./middleware/session.js";
import { authRoute } from "./routes/auth.js";
import { favoritesRoute } from "./routes/favorites.js";
import { tagsRoute } from "./routes/tags.js";
import { ratingsRoute } from "./routes/ratings.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(session);

// Routes
app.use("/recipes", recipesRoute);
app.use("/ingredients", ingredientsRoute);
app.use("/auth", authRoute);
app.use("/favorites", favoritesRoute);
app.use("/tags", tagsRoute);
app.use("/ratings", ratingsRoute);

app.listen(PORT, () => {
  console.log(`Recipe book server listening on port ${PORT}`);
});
