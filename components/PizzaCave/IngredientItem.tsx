import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { colors } from '../../styles/theme';
import { Ingredient, Pizza, PizzaCave } from '../../types';

interface Props {
  ingredient: Ingredient;
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (ingredient: Ingredient) => void;
  pizza: Pizza;
  tab: PizzaCave;
}

export const IngredientItem = ({
  ingredient,
  addIngredient,
  removeIngredient,
  pizza,
  tab,
}: Props) => {
  const {
    name,
    cost,
    numOwned,
    numAvailable,
    imgUrl = '/assets/pizza.svg', // Fixme
  } = ingredient;

  const handleAdd = () => {
    addIngredient(ingredient);
  };

  const handleRemove = () => {
    removeIngredient(ingredient);
  };

  const pizzaHasItem = useMemo(
    () => !!pizza?.allIngredients?.find(item => item.name === name),
    [pizza, name],
  );

  const itemAdded = useMemo(
    () => !!pizza?.additionalIngredients?.find(item => item.name === name),
    [pizza, name],
  );

  const selected = tab === PizzaCave.rebake ? itemAdded : pizzaHasItem;

  return (
    <Box
      className="artist-card"
      backgroundColor={selected ? colors.cheese[150] : ''}
      p="2"
    >
      <Flex>
        <img
          style={{ height: 100 }}
          src={`/assets/ingredients/raw/${imgUrl}`}
          alt="ingredient"
        />
        {/* Right of Image */}
        <Flex width={'100%'} justifyContent={'space-between'}>
          {/* Name and Cost */}
          <Flex
            direction={'column'}
            justifyContent={
              tab === PizzaCave.buyAndBake ? 'space-between' : 'center'
            }
            px="8"
            py="2"
          >
            <Heading size={'sm'} color="gray.dark">
              {name}
            </Heading>
            {tab === PizzaCave.buyAndBake && (
              <Flex>
                <Heading size={'sm'} color="gray.500" mr="2">
                  {cost}
                </Heading>
                <img src="/assets/eth.svg" alt="eth icon" />
              </Flex>
            )}
          </Flex>
          {/* Count and Add Button */}
          <Flex direction={'column'} justifyContent={'space-between'} py="2">
            <Text size={'sm'} color="gray.dark" align={'right'}>
              {`${numOwned}/${numAvailable}`}
            </Text>
            <Button
              className="tomato-btn"
              onClick={selected ? handleRemove : handleAdd}
              disabled={tab === PizzaCave.rebake && pizzaHasItem}
            >
              {selected ? `Remove` : `Add`}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
