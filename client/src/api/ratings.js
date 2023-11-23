import { axios } from "./constants.js";

export async function rateRecipe(recipeId, rating) {
  await axios.request({
    method: "PUT",
    url: "/ratings/" + recipeId,
    data: {
      rating,
    },
  });
}

export async function clearRecipeRating(recipeId) {
  await axios.request({
    method: "DELETE",
    url: "/ratings/" + recipeId,
  });
}
