import { axios } from "./constants.js";

export async function getFavoriteRecipes() {
  const res = await axios.request({
    method: "GET",
    url: "/favorites",
  });
  return res.data
}

export async function favoriteRecipe(recipeId) {
  await axios.request({
    method: "PUT",
    url: "/favorites/" + recipeId,
  });
}

export async function unfavoriteRecipe(recipeId) {
  await axios.request({
    method: "DELETE",
    url: "/favorites/" + recipeId,
  });
}
