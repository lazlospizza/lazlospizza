export const enum Pages {
  home = 'Home',
  pizzaCave = 'Pizza Cave',
  meetArtists = 'Meet Artists',
  rarityRewards = 'Rarity Rewards',
  myWallet = 'My Wallet',
}

export const enum PageRoutes {
  home = '/',
  pizzaCave = '/pizza-cave',
  meetArtists = '/meet-artists',
  rarityRewards = '/rarity-rewards',
  myWallet = '/my-wallet',
}

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
  price: number;
  balance: number;
  supply: number;
  ingredientType: IngredientType;
  image?: string;
}

export interface IngredientGroup {
  name: string;
  type?: IngredientType;
  ingredients: Ingredient[];
}

export interface Pizza {
  tokenId?: number;
  base?: Ingredient | null;
  sauce?: Ingredient | null;
  cheeses?: Ingredient[];
  meats?: Ingredient[];
  toppings?: Ingredient[];
  image?: string;
  allIngredients: Ingredient[];
  additionalIngredients?: Ingredient[];
  burnIngredients?: Ingredient[];
}
