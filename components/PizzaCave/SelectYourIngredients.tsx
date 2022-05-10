import { Box, Text, Stack, Button, Flex } from '@chakra-ui/react';
import { Ingredient, IngredientGroup, Pizza, PizzaCave } from '../../types';
import { IngredientList } from './IngredientList';

interface Props {
  ingredientGroups: IngredientGroup[];
  addIngredient: (ingredient: Ingredient) => void;
  pizza: Pizza;
  tab: PizzaCave;
}
export const SelectYourIngredients = ({
  ingredientGroups,
  addIngredient,
  pizza,
  tab,
}: Props) => {
  return (
    <Box style={{ marginTop: 20, padding: 10 }}>
      <Stack>
        {tab === PizzaCave.buyAndBake && (
          <Flex justify={'space-between'} alignItems="center">
            <Text color="gray.dark" fontWeight={700} fontSize={'xl'}>
              Select your Ingredients
            </Text>
            <Button className="tomato-btn">Quick Start</Button>
          </Flex>
        )}
        {ingredientGroups &&
          ingredientGroups.map(_group => (
            <IngredientList
              ingredientGroup={_group}
              key={_group.name}
              addIngredient={addIngredient}
              pizza={pizza}
              tab={tab}
            />
          ))}
      </Stack>
    </Box>
  );
};
