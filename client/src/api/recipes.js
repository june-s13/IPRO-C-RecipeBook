import { axios } from "./constants.js";

export async function getRecipes() {
  const res = await axios.request({
    method: "GET",
    url: "/recipes",
  });
  return res.data;
}

export async function getRecipe(recipeId) {
  const res = await axios.request({
    method: "GET",
    url: "/recipes/" + recipeId,
  });
  return res.data;
}
