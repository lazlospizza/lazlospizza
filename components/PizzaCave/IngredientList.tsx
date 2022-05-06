import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { Ingredient, IngredientGroup } from '../../types';
import { IngredientItem } from './IngredientItem';

interface Props {
  ingredientGroup: IngredientGroup;
  addIngredient: (ingredient: Ingredient) => void;
}
export const IngredientList = ({ ingredientGroup, addIngredient }: Props) => {
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
          />
        ))}
      </Stack>
    </Box>
  );
};
