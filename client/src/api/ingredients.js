import { axios } from "./constants.js";

export async function getIngredients() {
  const res = await axios.get("/ingredients")
  return res.data
}