// Måttenhet för en ingrediens
export interface Measure {
  amount: number;
  unitShort: string;
  unitLong: string;
}

// En ingrediens i ett recept
export interface Ingredient {
  id: number;
  name: string;
  original: string;
  amount: number;
  unit: string;
  image: string;
  measures: {
    us: Measure;
    metric: Measure;
  };
}

// Ett recept i listan (random & sök) – bara grundinfo
export interface RecipeSummary {
  id: number;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
}

// Ett fullständigt recept med all detaljinfo, får alla fält från RecipeSummary + sina egen info
export interface RecipeDetail extends RecipeSummary {
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  healthScore: number;
  pricePerServing: number;
  extendedIngredients: Ingredient[];
  instructions: string;
}
