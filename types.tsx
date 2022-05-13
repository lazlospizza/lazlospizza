export const enum PizzaCave {
  buyAndBake = 'Buy & Bake',
  bake = 'Bake',
  unbake = 'Unbake',
  rebake = 'Rebake',
}
export const enum IngredientType {
  base = 'Base',
  sauce = 'Sauce',
  cheese = 'Cheese',
  meat = 'Meat',
  topping = 'Topping',
}

export interface Ingredient {
  tokenId: number;
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
  tokenId?: number;
  base?: Ingredient | null;
  sauce?: Ingredient | null;
  cheese?: Ingredient | null;
  meats?: Ingredient[];
  toppings?: Ingredient[];
  allIngredients: Ingredient[];
  additionalIngredients?: Ingredient[];
  burnIngredients?: Ingredient[];
  totalCost: number;
}
