import { isEmpty, update } from 'lodash';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
  BASE_LIMIT,
  CHEESE_LIMIT,
  MEAT_LIMIT,
  TOPPING_LIMIT,
} from '../constants';
import { Ingredient, IngredientType, Pizza, PizzaCave } from '../types';

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

export const canUndoBurnIngredient = (item: Ingredient, pizza: Pizza) => {
  const updatedPizza = {
    ...pizza,
    burnIngredients: (pizza.burnIngredients || []).filter(
      _item => _item.tokenId !== item.tokenId,
    ),
  };
  const isValid = isPizzaValid(updatedPizza);
  if (isValid) {
    return true;
  }
  switch (item.ingredientType) {
    case IngredientType.base:
      return 'A pizza must have only 1 base. To UNDO, you must REMOVE the base you added.';
    case IngredientType.sauce:
      return 'A pizza must have only 1 sauce. To UNDO, you must REMOVE the sause you added.';
    case IngredientType.cheese:
      return 'A pizza may have up to 3 cheeses. To UNDO, you must REMOVE another cheese.';
    case IngredientType.meat:
      return 'A pizza may have up to 4 meats. To UNDO, you must REMOVE another meat.';
    case IngredientType.topping:
      return 'A pizza may have up to 4 toppings. To UNDO, you must REMOVE another topping.';
  }
};

export const canAddRebakeIngredient = (item: Ingredient, pizza: Pizza) => {
  const isBurned = pizza.burnIngredients?.find(
    ({ ingredientType }) => ingredientType === item.ingredientType,
  );
  if (item.ingredientType === IngredientType.base && pizza.base && !isBurned) {
    return 'A pizza must have only 1 base. Please BURN your existing base before adding this ingredient.';
  }
  if (
    item.ingredientType === IngredientType.sauce &&
    pizza.sauce &&
    !isBurned
  ) {
    return 'A pizza must have only 1 sauce. Please BURN your existing sauce before adding this ingredient.';
  }
  const updatedPizza = addIngredientToPizza({
    item,
    pizza: JSON.parse(JSON.stringify(pizza)),
  });
  const isValid = isPizzaValid(updatedPizza);
  if (isValid) {
    return true;
  }
  switch (item.ingredientType) {
    case IngredientType.cheese:
      return 'A pizza may have up to 3 cheeses. Please BURN an existing meat before adding this ingredient.';
    case IngredientType.meat:
      return 'A pizza may have up to 4 meats. Please BURN an existing meat before adding this ingredient.';
    case IngredientType.topping:
      return 'A pizza may have up to 4 toppings. Please BURN an existing topping before adding this ingredient.';
  }
};

export const canAddIngredient = (item: Ingredient, pizza: Pizza) => {
  switch (item.ingredientType) {
    case IngredientType.cheese:
      if (pizza.cheeses?.length >= CHEESE_LIMIT) {
        return `A pizza may include up to ${CHEESE_LIMIT} cheeses.`;
      }
      break;
    case IngredientType.meat:
      if (pizza.meats?.length >= MEAT_LIMIT) {
        return `A pizza may include up to ${MEAT_LIMIT} meats.`;
      }
      break;
    case IngredientType.topping:
      if (pizza.toppings?.length >= TOPPING_LIMIT) {
        return `A pizza may include up to ${TOPPING_LIMIT} toppings.`;
      }
      break;
  }
  return true;
};

export const addIngredientToPizza = ({
  item,
  pizza,
}: {
  item: Ingredient | Ingredient[];
  pizza: Pizza;
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
  return {
    ...newPizza,
    totalCost: getTotalCost(newPizza.allIngredients),
  };
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
  setPizza(addIngredientToPizza({ item, pizza }));
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

export const isPizzaValid = (pizza?: Pizza) => {
  if (isEmpty(pizza?.allIngredients)) {
    return false;
  }
  let addedBases = pizza?.base ? [pizza.base] : [];
  let addedSauce = pizza?.sauce ? [pizza.sauce] : [];
  let addedCheeses = pizza?.cheeses ? [...pizza.cheeses] : [];
  let addedMeats = pizza?.meats ? [...pizza.meats] : [];
  let addedToppings = pizza?.toppings ? [...pizza.toppings] : [];
  if (pizza.burnIngredients) {
    addedBases = addedBases.filter(
      item =>
        !pizza.burnIngredients.find(
          ingredient => ingredient.tokenId === item.tokenId,
        ),
    );
    addedSauce = addedSauce.filter(
      item =>
        !pizza.burnIngredients.find(
          ingredient => ingredient.tokenId === item.tokenId,
        ),
    );
    addedCheeses = addedCheeses.filter(
      item =>
        !pizza.burnIngredients.find(
          ingredient => ingredient.tokenId === item.tokenId,
        ),
    );
    addedMeats = addedMeats.filter(
      item =>
        !pizza.burnIngredients.find(
          ingredient => ingredient.tokenId === item.tokenId,
        ),
    );
    addedToppings = addedToppings.filter(
      item =>
        !pizza.burnIngredients.find(
          ingredient => ingredient.tokenId === item.tokenId,
        ),
    );
  }
  if (pizza.additionalIngredients) {
    addedBases = [
      ...addedBases,
      ...pizza.additionalIngredients.filter(
        item => item.ingredientType === IngredientType.base,
      ),
    ];
    addedSauce = [
      ...addedSauce,
      ...pizza.additionalIngredients.filter(
        item => item.ingredientType === IngredientType.sauce,
      ),
    ];
    addedCheeses = [
      ...addedCheeses,
      ...pizza.additionalIngredients.filter(
        item => item.ingredientType === IngredientType.cheese,
      ),
    ];
    addedMeats = [
      ...addedMeats,
      ...pizza.additionalIngredients.filter(
        item => item.ingredientType === IngredientType.meat,
      ),
    ];
    addedToppings = [
      ...addedToppings,
      ...pizza.additionalIngredients.filter(
        item => item.ingredientType === IngredientType.topping,
      ),
    ];
  }
  if (addedBases.length !== 1) {
    return false;
  }
  if (addedSauce.length !== 1) {
    return false;
  }
  if (!addedCheeses.length || addedCheeses.length > CHEESE_LIMIT) {
    return false;
  }
  if (addedMeats.length > MEAT_LIMIT || addedToppings.length > TOPPING_LIMIT) {
    return false;
  }
  return true;
};

export const getIngredientsCount = (pizza: Pizza) => {
  return [
    ...(pizza?.allIngredients.filter(
      item =>
        !pizza.burnIngredients?.find(
          burnedItem => burnedItem.tokenId === item.tokenId,
        ),
    ) || []),
    ...(pizza?.additionalIngredients || []),
  ].length;
};
