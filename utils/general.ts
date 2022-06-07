import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { CHEESE_LIMIT, MEAT_LIMIT, TOPPING_LIMIT } from '../constants';
import { Ingredient, IngredientType, Pizza } from '../types';

export const parsePrice = (
  amount: number,
  defaultToFixed = 2,
  showCurrency = true,
) => {
  const decimal = amount.toString().split('.')[1];
  let toFixed = defaultToFixed;
  if (decimal && decimal.length > toFixed) {
    toFixed = decimal.length;
  }
  return `${amount.toFixed(toFixed)}${showCurrency ? ' ETH' : ''}`;
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export const useGetWindowSize = () => {
  const [size, setSize] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

export const DefaultPizza = {
  meats: [],
  toppings: [],
  allIngredients: [],
  totalCost: 0,
};

const ingredientsWithoutDupe = (
  ingredients: Ingredient[],
  item: Ingredient,
  removeItem?: Ingredient,
) => {
  return [
    ...(ingredients || []).filter(_item =>
      removeItem
        ? _item.tokenId !== item.tokenId && _item.tokenId !== removeItem.tokenId
        : _item.tokenId !== item.tokenId,
    ),
    item,
  ];
};

export const getTotalCost = (ingredients: Ingredient[]) => {
  return (
    ingredients.reduce((partialSum, item) => partialSum + item.price * 100, 0) /
    100
  );
};

export const canAddIngredient = (item: Ingredient, pizza: Pizza) => {
  switch (item.ingredientType) {
    case IngredientType.cheese:
      if (pizza.cheeses?.length >= CHEESE_LIMIT) {
        return `A pizza may include up to ${CHEESE_LIMIT} cheeses.`;
      }
    case IngredientType.meat:
      if (pizza.meats?.length >= MEAT_LIMIT) {
        return `A pizza may include up to ${MEAT_LIMIT} meats.`;
      }
    case IngredientType.topping:
      if (pizza.toppings?.length >= TOPPING_LIMIT) {
        return `A pizza may include up to ${TOPPING_LIMIT} toppings.`;
      }
  }
  return true;
};

export const addIngredient = ({
  item,
  pizza,
  setPizza,
}: {
  item: Ingredient | Ingredient[];
  pizza: Pizza;
  setPizza: Dispatch<SetStateAction<Pizza>>;
}) => {
  const ingredients: Ingredient[] = Array.isArray(item) ? item : [item];
  const newPizza = { ...pizza };
  ingredients.forEach(item => {
    switch (item.ingredientType) {
      case IngredientType.base:
        newPizza.base = item;
        newPizza.allIngredients = ingredientsWithoutDupe(
          pizza.allIngredients,
          item,
          pizza.base,
        );
        break;
      case IngredientType.sauce:
        newPizza.sauce = item;
        newPizza.allIngredients = ingredientsWithoutDupe(
          pizza.allIngredients,
          item,
          pizza.sauce,
        );
        break;
      case IngredientType.cheese:
        if (pizza.cheeses?.length >= CHEESE_LIMIT) return;
        newPizza.cheeses = ingredientsWithoutDupe(pizza.cheeses || [], item);
        newPizza.allIngredients = ingredientsWithoutDupe(
          pizza.allIngredients,
          item,
        );
        break;
      case IngredientType.meat:
        if (pizza.meats?.length >= MEAT_LIMIT) return;
        newPizza.meats = ingredientsWithoutDupe(pizza.meats || [], item);
        newPizza.allIngredients = ingredientsWithoutDupe(
          pizza.allIngredients,
          item,
        );
        break;
      case IngredientType.topping:
        if (pizza.toppings?.length >= TOPPING_LIMIT) return;
        newPizza.toppings = ingredientsWithoutDupe(pizza.toppings || [], item);
        newPizza.allIngredients = ingredientsWithoutDupe(
          pizza.allIngredients,
          item,
        );
        break;
      default:
        break;
    }
    pizza = { ...newPizza };
  });
  setPizza({
    ...newPizza,
    totalCost: getTotalCost(newPizza.allIngredients),
  });
};

export const removeIngredient = ({
  item,
  pizza,
  setPizza,
}: {
  item: Ingredient;
  pizza: Pizza;
  setPizza: any;
}) => {
  const newPizza = { ...pizza };
  switch (item.ingredientType) {
    case IngredientType.base:
      if (pizza.base?.tokenId !== item.tokenId) break;
      delete newPizza.base;
      break;
    case IngredientType.sauce:
      if (pizza.sauce?.tokenId !== item.tokenId) break;
      delete newPizza.sauce;
      break;
    case IngredientType.cheese:
      newPizza.cheeses = (pizza.cheeses || []).filter(
        _item => _item.tokenId !== item.tokenId,
      );
      break;
    case IngredientType.meat:
      newPizza.meats = (pizza.meats || []).filter(
        _item => _item.tokenId !== item.tokenId,
      );
      break;
    case IngredientType.topping:
      newPizza.toppings = (pizza.toppings || []).filter(
        _item => _item.tokenId !== item.tokenId,
      );
      break;
  }
  const allIngredients = pizza?.allIngredients.filter(
    _item => _item.tokenId !== item.tokenId,
  );
  setPizza({
    ...newPizza,
    allIngredients,
    totalCost: getTotalCost(allIngredients),
  });
};

export const addBurnIngredient = ({
  item,
  setPizza,
}: {
  item: Ingredient;
  setPizza: any;
}) => {
  setPizza(pizza => ({
    ...pizza,
    burnIngredients: (pizza.burnIngredients || []).find(
      (_item: Ingredient) => _item.tokenId === item.tokenId,
    )
      ? pizza.burnIngredients || []
      : [...(pizza.burnIngredients || []), item],
  }));
};

export const removeBurnIngredient = ({
  item,
  setPizza,
}: {
  item: Ingredient;
  setPizza: any;
}) => {
  setPizza(pizza => ({
    ...pizza,
    burnIngredients: (pizza.burnIngredients || []).filter(
      _item => _item.tokenId !== item.tokenId,
    ),
  }));
};

export const addAdditionalIngredient = ({
  item,
  setPizza,
}: {
  item: Ingredient;
  setPizza: any;
}) => {
  setPizza(pizza => ({
    ...pizza,
    additionalIngredients: (pizza.additionalIngredients || []).find(
      (_item: Ingredient) => _item.tokenId === item.tokenId,
    )
      ? pizza.additionalIngredients || []
      : [...(pizza.additionalIngredients || []), item],
  }));
};

export const removeAdditionalIngredient = ({
  item,
  setPizza,
}: {
  item: Ingredient;
  setPizza: any;
}) => {
  setPizza(pizza => ({
    ...pizza,
    additionalIngredients: (pizza.additionalIngredients || []).filter(
      _item => _item.tokenId !== item.tokenId,
    ),
  }));
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
