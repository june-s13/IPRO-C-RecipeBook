export async function getRecipes() {
  const res = await fetch("http://localhost:3000/recipes");
  return await res.json();
}
