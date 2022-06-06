import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import { Ingredient, IngredientGroup, Pizza, PizzaCave } from '../../types';
import { IngredientItem } from './IngredientItem';

interface Props {
  ingredientGroup: IngredientGroup;
  ownedIngredients?: Ingredient[];
  addIngredient?: (ingredient: Ingredient) => void;
  removeIngredient?: (ingredient: Ingredient) => void;
  pizza?: Pizza;
  tab?: PizzaCave;
  columns?: number;
}
export const IngredientList = ({
  ingredientGroup,
  ownedIngredients,
  addIngredient,
  removeIngredient,
  pizza,
  tab,
  columns = 1,
}: Props) => {
  return (
    <Box mt={4}>
      <Stack>
        <Text color="tomato.500" fontWeight={900} fontSize={'xl'}>
          {ingredientGroup.name}
        </Text>
        {!!ingredientGroup.max && (
          <Flex>
            <Text color="gray.dark">{`A pizza ${
              ingredientGroup.min ? 'must' : 'may'
            } have`}</Text>
            {ingredientGroup.min === ingredientGroup.max ? (
              <>
                <Text color="tomato.500">
                  &nbsp;
                  {`only ${
                    ingredientGroup.max
                  } ${ingredientGroup.name.toLowerCase()}`}
                </Text>
              </>
            ) : (
              <Text color="tomato.500">
                &nbsp;
                {ingredientGroup.min
                  ? `${ingredientGroup.min} to ${
                      ingredientGroup.max
                    } ${ingredientGroup.name.toLowerCase()}`
                  : `up to ${
                      ingredientGroup.max
                    } ${ingredientGroup.name.toLowerCase()}`}
              </Text>
            )}
          </Flex>
        )}
        <Grid
          templateColumns={{ md: `repeat(${columns}, 1fr)` }}
          gap={{ md: 6 }}
        >
          {(!!ownedIngredients
            ? ingredientGroup.ingredients.filter(ingredient =>
                ownedIngredients.find(
                  ownedIngredient =>
                    ownedIngredient.tokenId === ingredient.tokenId &&
                    !!ownedIngredient.balance,
                ),
              )
            : ingredientGroup.ingredients
          ).map(item => (
            <IngredientItem
              key={item.name}
              ingredient={
                ownedIngredients?.find(i => i.tokenId === item.tokenId) || item
              }
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
              pizza={pizza}
              tab={tab}
            />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};
