export const enum IngredientType {
  base = 'Base',
  sauce = 'Sauce',
}

export interface Ingredient {
  name: string;
  namePlural?: string;
  cost: number;
  numAvailable: number;
  numAllowed: number;
  type: IngredientType;
  imgUrl?: string;
  rarity?: number;
  numPizzas?: number;
}

export interface IngredientGroup {
  name: string;
  namePlural: string;
  type?: IngredientType;
  ingredients: Ingredient[];
}

export interface Pizza {
  base?: Ingredient;
  sauce?: Ingredient;
  allIngredients: Ingredient[];
  totalCost: number;
}
