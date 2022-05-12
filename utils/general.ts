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
    totalCost: pizza.totalCost + item.cost,
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
    totalCost: pizza.totalCost - item.cost,
  });
};
