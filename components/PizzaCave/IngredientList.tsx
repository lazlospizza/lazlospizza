import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { IngredientGroup } from '../../types';
import { IngredientItem } from './IngredientItem';

interface Props {
  ingredientGroup: IngredientGroup;
}
export const IngredientList = ({ ingredientGroup }: Props) => {
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
            name={item.name}
            cost={item.cost}
            numAvailable={item.numAvailable}
          />
        ))}
      </Stack>
    </Box>
  );
};
