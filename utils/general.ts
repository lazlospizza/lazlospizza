import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { MEAT_LIMIT, TOPPING_LIMIT } from '../constants';
import { Ingredient, IngredientType, PageRoutes, Pizza } from '../types';

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

export const DefaultPizza = {
  meats: [],
  toppings: [],
  allIngredients: [],
  totalCost: 0,
};

const ingredientsWithoutDupe = (
  ingredients: Ingredient[],
  item: Ingredient,
) => {
  return [...ingredients.filter(_item => _item.tokenId !== item.tokenId), item];
};

const getTotalCost = (ingredients: Ingredient[]) => {
  return ingredients.reduce((partialSum, item) => partialSum + item.cost, 0);
};

export const addIngredient = ({
  item,
  pizza,
  setPizza,
}: {
  item: Ingredient;
  pizza: Pizza;
  setPizza: Dispatch<SetStateAction<Pizza>>;
}) => {
  switch (item.type) {
    case IngredientType.base:
      if (pizza.base) return;
      setPizza(pizza => ({
        ...pizza,
        base: item,
        allIngredients: ingredientsWithoutDupe(pizza.allIngredients, item),
        totalCost: getTotalCost(
          ingredientsWithoutDupe(pizza.allIngredients, item),
        ),
      }));
      break;
    case IngredientType.sauce:
      if (pizza.sauce) return;
      setPizza(pizza => ({
        ...pizza,
        sauce: item,
        allIngredients: ingredientsWithoutDupe(pizza.allIngredients, item),
        totalCost: getTotalCost(
          ingredientsWithoutDupe(pizza.allIngredients, item),
        ),
      }));
      break;
    case IngredientType.cheese:
      if (pizza.cheese) return;
      setPizza(pizza => ({
        ...pizza,
        cheese: item,
        allIngredients: ingredientsWithoutDupe(pizza.allIngredients, item),
        totalCost: getTotalCost(
          ingredientsWithoutDupe(pizza.allIngredients, item),
        ),
      }));
      break;
    case IngredientType.meat:
      if (pizza.meats?.length >= MEAT_LIMIT) return;
      setPizza(pizza => ({
        ...pizza,
        meats: ingredientsWithoutDupe(pizza.meats, item),
        allIngredients: ingredientsWithoutDupe(pizza.allIngredients, item),
        totalCost: getTotalCost(
          ingredientsWithoutDupe(pizza.allIngredients, item),
        ),
      }));
      break;
    case IngredientType.topping:
      if (pizza.toppings?.length >= TOPPING_LIMIT) return;
      setPizza(pizza => ({
        ...pizza,
        toppings: ingredientsWithoutDupe(pizza.toppings, item),
        allIngredients: ingredientsWithoutDupe(pizza.allIngredients, item),
        totalCost: getTotalCost(
          ingredientsWithoutDupe(pizza.allIngredients, item),
        ),
      }));
      break;
    default:
      break;
  }
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
  switch (item.type) {
    case IngredientType.base:
      if (pizza.base?.tokenId !== item.tokenId) break;
      delete newPizza.base;
      break;
    case IngredientType.sauce:
      if (pizza.sauce?.tokenId !== item.tokenId) break;
      delete newPizza.sauce;
      break;
    case IngredientType.cheese:
      if (pizza.cheese?.tokenId !== item.tokenId) break;
      delete newPizza.cheese;
      break;
    case IngredientType.meat:
      if (!pizza.meats?.find(_item => _item.tokenId === item.tokenId)) break;
      newPizza.meats = pizza.meats.filter(
        _item => _item.tokenId !== item.tokenId,
      );
      break;
    case IngredientType.topping:
      if (pizza.toppings?.length >= 4) break;
      newPizza.toppings = pizza.toppings.filter(
        _item => _item.tokenId !== item.tokenId,
      );
      break;
  }
  setPizza({
    ...newPizza,
    allIngredients: pizza.allIngredients.filter(
      _item => _item.tokenId !== item.tokenId,
    ),
    totalCost: (pizza.totalCost || 0) - item.cost,
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
