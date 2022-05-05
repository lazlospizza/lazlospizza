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
  type?: IngredientType;
  imgUrl?: string;
}

export interface IngredientGroup {
  name: string;
  namePlural: string;
  type?: IngredientType;
  ingredients: Ingredient[];
}
