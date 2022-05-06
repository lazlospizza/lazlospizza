import { Box, Text, Stack, Button, Flex } from '@chakra-ui/react';
import { Ingredient, IngredientGroup, Pizza } from '../../types';
import { IngredientList } from './IngredientList';

interface Props {
  ingredientGroups: IngredientGroup[];
  addIngredient: (ingredient: Ingredient) => void;
  pizza: Pizza;
}
export const SelectYourIngredients = ({
  ingredientGroups,
  addIngredient,
  pizza,
}: Props) => {
  return (
    <Box style={{ marginTop: 20, padding: 10 }}>
      <Stack>
        <Flex justify={'space-between'} alignItems="center">
          <Text color="gray.dark" fontWeight={700} fontSize={'xl'}>
            Select your Ingredients
          </Text>
          <Button className="tomato-btn">Quick Start</Button>
        </Flex>
        {/* <IngredientList /> */}
        {ingredientGroups &&
          ingredientGroups.map(_group => (
            <IngredientList
              ingredientGroup={_group}
              key={_group.name}
              addIngredient={addIngredient}
              pizza={pizza}
            />
          ))}
      </Stack>
    </Box>
  );
};
