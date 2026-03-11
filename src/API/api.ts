import { RecipeDetail, RecipeSummary } from "../models/Recipe";

const API_KEY = "736d6dde157341ef9dbeb0483d2c40a4";
const BASE_URL = "https://api.spoonacular.com";

// Hämtar slumpmässiga recept från API:et
export async function fetchRandomRecipes(): Promise<RecipeSummary[]> {
  const response = await fetch(
    `${BASE_URL}/recipes/random?number=10&apiKey=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.recipes as RecipeSummary[];
}

// Hämtar detaljerad information om ett specifikt recept via dess ID
export async function fetchRecipeById(id: number): Promise<RecipeDetail> {
  const response = await fetch(
    `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data as RecipeDetail;
}

export async function fetchSearchRecipes(
  query: string, // Sökterm för att hitta recept
): Promise<RecipeSummary[]> {
  const response = await fetch(
    `${BASE_URL}/recipes/complexSearch?query=${query}&number=10&addRecipeInformation=true&apiKey=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data.results as RecipeSummary[];
}
