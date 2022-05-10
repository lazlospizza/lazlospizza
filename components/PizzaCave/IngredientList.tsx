import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { Ingredient, IngredientGroup, Pizza, PizzaCave } from '../../types';
import { IngredientItem } from './IngredientItem';

interface Props {
  ingredientGroup: IngredientGroup;
  addIngredient: (ingredient: Ingredient) => void;
  pizza: Pizza;
  tab: PizzaCave;
}
export const IngredientList = ({
  ingredientGroup,
  addIngredient,
  pizza,
  tab,
}: Props) => {
  return (
    <Box>
      <Stack>
        <Text color="tomato.500" fontWeight={900} fontSize={'xl'}>
          {ingredientGroup.namePlural}
        </Text>
        <Flex>
          <Text color="gray.dark">{`A Pizza must have`}</Text>
          <Text color="tomato.500">{` only 1 ${ingredientGroup.name}`}</Text>
        </Flex>
        {ingredientGroup.ingredients.map(item => (
          <IngredientItem
            key={item.name}
            ingredient={item}
            addIngredient={addIngredient}
            pizza={pizza}
            tab={tab}
          />
        ))}
      </Stack>
    </Box>
  );
};
