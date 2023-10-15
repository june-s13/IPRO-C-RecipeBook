import { Router } from "express";
import { getAllIngredients } from "../db/ingredients.js";

const ingredientsRoute = Router();

ingredientsRoute.get("/", async (req, res) => {
  const ingredients = await getAllIngredients();
  res.send(ingredients);
});

export { ingredientsRoute };
