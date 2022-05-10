export const enum PizzaCave {
  buyAndBake = 'Buy & Bake',
  bake = 'Bake',
}
export const enum IngredientType {
  base = 'Base',
  sauce = 'Sauce',
}

export interface Ingredient {
  name: string;
  namePlural?: string;
  cost: number;
  numOwned: number;
  numAvailable: number;
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
