import { useState, useEffect } from 'react';
import { MEAT_LIMIT, TOPPING_LIMIT } from '../constants';
import { Ingredient, IngredientType, Pizza } from '../types';

export const getIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      //   console.log('window resized:', window.innerWidth);
      //temp
      setIsMobile(window.innerWidth < 1200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export const DefaultPizza = () => {
  return {
    meats: [],
    toppings: [],
    allIngredients: [],
    totalCost: 0,
  };
};

export const addIngredient = ({
  item,
  pizza,
  setPizza,
}: {
  item: Ingredient;
  pizza: Pizza;
  setPizza: any;
}) => {
  switch (item.type) {
    case IngredientType.base:
      if (pizza.base) return;
      setPizza({
        ...pizza,
        base: item,
      });
      break;
    case IngredientType.sauce:
      if (pizza.sauce) return;
      setPizza(pizza => ({
        ...pizza,
        sauce: item,
      }));
      break;
    case IngredientType.cheese:
      if (pizza.cheese) return;
      setPizza(pizza => ({
        ...pizza,
        cheese: item,
      }));
      break;
    case IngredientType.meat:
      if (pizza.meats?.length >= MEAT_LIMIT) return;
      setPizza(pizza => ({
        ...pizza,
        meats: [
          ...pizza.meats.filter(_item => _item.tokenId !== item.tokenId),
          item,
        ],
      }));
      break;
    case IngredientType.topping:
      if (pizza.toppings?.length >= TOPPING_LIMIT) return;
      setPizza(pizza => ({
        ...pizza,
        toppings: [
          ...pizza.toppings.filter(_item => _item.tokenId !== item.tokenId),
          item,
        ],
      }));
      break;
    default:
      break;
  }
  setPizza(pizza => ({
    ...pizza,
    allIngredients: [...pizza.allIngredients, item],
    totalCost: (pizza.totalCost || 0) + item.cost,
  }));
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
