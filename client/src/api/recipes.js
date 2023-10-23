import axios from "axios";

export async function getRecipes() {
  const res = await axios.get("http://localhost:3000/recipes");
  return res.data
}
