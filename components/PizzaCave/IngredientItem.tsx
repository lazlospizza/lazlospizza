import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { colors } from '../../styles/theme';
import { Ingredient, IngredientType, Pizza, PizzaCave } from '../../types';

interface Props {
  ingredient: Ingredient;
  addIngredient: (ingredient: Ingredient) => void;
  pizza: Pizza;
  tab: PizzaCave;
}

export const IngredientItem = ({
  ingredient,
  addIngredient,
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
  const [disabled, setDisabled] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addIngredient(ingredient);
    // setDisabled(true);
  };

  // handle disabling add button
  useEffect(() => {
    if (!pizza || disabled) return;
    const pizzaHasItem = !!pizza.allIngredients?.find(
      item => item.name === name,
    );
    if (pizzaHasItem) {
      setDisabled(pizzaHasItem);
      return setAdded(true);
    }
    switch (ingredient.type) {
      case IngredientType.base:
        if (!!pizza.base) {
          console.log('disabling base');
          setDisabled(true);
        }
        break;
      case IngredientType.sauce:
        if (!!pizza.sauce) {
          console.log('disabling sauce');
          setDisabled(true);
        }
        break;
      default:
        break;
    }
  }, [pizza, name]);

  //   console.log(name);
  //   console.log(imgUrl);
  return (
    <Box
      className="artist-card"
      backgroundColor={added ? colors.cheese[150] : ''}
      p="2"
    >
      <Flex>
        <img style={{ height: 100 }} src={`${imgUrl}`} alt="ingredient" />
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
              onClick={handleAdd}
              disabled={disabled}
            >
              {added ? `Added` : `Add`}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
