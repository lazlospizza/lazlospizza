import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { Ingredient, IngredientGroup, Pizza, PizzaCave } from '../../types';
import { IngredientItem } from './IngredientItem';

interface Props {
  ingredientGroup: IngredientGroup;
  ownedIngredients?: { tokenId: number; amount: number }[];
  addIngredient?: (ingredient: Ingredient) => void;
  removeIngredient?: (ingredient: Ingredient) => void;
  pizza?: Pizza;
  tab?: PizzaCave;
}
export const IngredientList = ({
  ingredientGroup,
  ownedIngredients,
  addIngredient,
  removeIngredient,
  pizza,
  tab,
}: Props) => {
  return (
    <Box>
      <Stack>
        <Text color="tomato.500" fontWeight={900} fontSize={'xl'}>
          {ingredientGroup.name}
        </Text>
        <Flex>
          <Text color="gray.dark">{`A Pizza must have`}</Text>
          <Text color="tomato.500">
            &nbsp;{`only 1 ${ingredientGroup.name}`}
          </Text>
        </Flex>
        {(!!ownedIngredients
          ? ingredientGroup.ingredients.filter(ingredient =>
              ownedIngredients.find(
                ownedIngredient =>
                  ownedIngredient.tokenId === ingredient.tokenId &&
                  ownedIngredient.amount > 0,
              ),
            )
          : ingredientGroup.ingredients
        ).map(item => (
          <IngredientItem
            key={item.name}
            ingredient={item}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            pizza={pizza}
            tab={tab}
          />
        ))}
      </Stack>
    </Box>
  );
};
