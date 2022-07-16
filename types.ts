export const enum Pages {
  home = 'Home',
  pizzaCave = 'Pizza Cave',
  meetArtists = 'Meet Pizzaiolos',
  rarityRewards = 'Rarity Rewards',
  myWallet = 'My Wallet',
  faq = 'FAQ',
}

export const enum PageRoutes {
  home = '/home',
  pizzaCave = '/',
  meetArtists = '/meet-artists',
  rarityRewards = '/rarity-rewards',
  myWallet = '/my-wallet',
  faq = '/faq',
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
  rarity?: number;
  numberOfPizzas?: number;
}

export interface IngredientGroup {
  name: string;
  type?: IngredientType;
  min?: number | null;
  max?: number | null;
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
  owner?: string;
  allIngredients: Ingredient[];
  additionalIngredients?: Ingredient[];
  burnIngredients?: Ingredient[];
  rarity?: number;
  rewardedOn?: number;
  totalCost?: number;
  block?: number;
  // Manually added (not returned from API)
  payout?: Payout;
}

export interface Payout {
  block: number;
  payout_amount: number;
  timestamp: number;
  token_id: number;
  // Manually added (not returned from API)
  hasBeenPaid?: Payout;
}
