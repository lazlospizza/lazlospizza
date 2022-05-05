import { Box, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { BAKING_FEE, INGREDIENT_COST } from '../../constants';
import { Ingredient, IngredientGroup, IngredientType } from '../../types';
import { SelectYourIngredients } from './SelectYourIngredients';

const tempGroup: IngredientGroup[] = [
  {
    name: 'Base',
    namePlural: 'Bases',
    type: IngredientType.base,
    ingredients: [
      { name: 'Plain', cost: 0.01, numAvailable: 5000, numAllowed: 1 },
      { name: 'Thin', cost: 0.02, numAvailable: 5000, numAllowed: 1 },
      { name: 'Thick', cost: 0.03, numAvailable: 5000, numAllowed: 1 },
    ],
  },
  {
    name: 'Sauce',
    namePlural: 'Sauces',
    type: IngredientType.sauce,
    ingredients: [
      { name: 'None', cost: 0.01, numAvailable: 5000, numAllowed: 1 },
      { name: 'Tomato', cost: 0.03, numAvailable: 5000, numAllowed: 1 },
      { name: 'Alfredo', cost: 0.04, numAvailable: 5000, numAllowed: 1 },
    ],
  },
];

export const BuyAndBake = () => {
  const [ingredientGroups, setIngredientGroups] =
    useState<IngredientGroup[]>(tempGroup);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );

  return (
    <Box>
      <Stack m="10px">
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          Buy Ingredients and Bake a Pizza
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Select from a delightful selection of hand-crafted ingredients freshly prepared by our pixel artistes. You can buy now and bake later, or buy and bake in one transaction. (${INGREDIENT_COST} ETH per ingredient + ${BAKING_FEE}ETH Baking fee.)`}
        </Text>
      </Stack>
      <div style={{ marginTop: 8, height: 1, backgroundColor: '#3D3431' }} />
      <SelectYourIngredients ingredientGroups={ingredientGroups} />
    </Box>
  );
};
