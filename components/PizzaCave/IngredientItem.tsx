import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Ingredient, Pizza } from '../../types';

interface Props {
  ingredient: Ingredient;
  addIngredient: (ingredient: Ingredient) => void;
  pizza: Pizza;
}

export const IngredientItem = ({ ingredient, addIngredient, pizza }: Props) => {
  // }: Ingredient) => {
  const {
    name,
    cost,
    numAvailable,
    numAllowed,
    imgUrl = '/assets/pizza.svg', // Fixme
  } = ingredient;
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(count >= numAllowed);

  const handleAdd = () => {
    if (count < numAllowed) {
      addIngredient(ingredient);
      setCount(count + 1);
    } else setDisabled(true);
  };

  useEffect(() => {
    if (count === numAllowed) {
      !disabled && setDisabled(true);
      // shouldnt happen but...
    } else if (count > numAllowed) {
      setCount(numAllowed);
      setDisabled(true);
    }
  }, [count]);

  useEffect(() => {
    if (!pizza) return;
    const foo = !!pizza.allIngredients?.find(item => item.name === name);
    console.log('pizza updated!', pizza);
    setDisabled(foo);
  }, [pizza, name]);
  //   console.log(name);
  //   console.log(imgUrl);
  return (
    <Box className="artist-card" p="4">
      <Flex>
        <img style={{ height: 120 }} src={`${imgUrl}`} alt="ingredient" />
        {/* Right of Image */}
        <Flex width={'100%'} justifyContent={'space-between'}>
          {/* Name and Cost */}
          <Flex
            direction={'column'}
            justifyContent={'space-between'}
            px="8"
            py="4"
          >
            <Heading size={'sm'} color="gray.dark">
              {name}
            </Heading>
            <Flex>
              <Heading size={'sm'} color="gray.500" mr="2">
                {cost}
              </Heading>
              <img src="/assets/eth.svg" alt="eth icon" />
            </Flex>
          </Flex>
          {/* Count and Add Button */}
          <Flex direction={'column'} justifyContent={'space-between'} py="4">
            <Text size={'sm'} color="gray.dark" align={'right'}>
              {`${count}/${numAvailable}`}
            </Text>
            <Button
              className="tomato-btn"
              onClick={handleAdd}
              disabled={disabled}
            >
              Add
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
