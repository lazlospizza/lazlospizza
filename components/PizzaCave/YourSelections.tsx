import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { BAKING_FEE } from '../../constants';
import { Ingredient, Pizza } from '../../types';

// const ingredients = [
//   {
//     name: 'Plain',
//     cost: 0.01,
//     numAvailable: 5000,
//     numAllowed: 1,
//     imgUrl: '/assets/base-plain.svg',
//   },
//   {
//     name: 'Gluten-Free',
//     cost: 0.02,
//     numAvailable: 5000,
//     numAllowed: 1,
//     imgUrl: '/assets/base-gluten-free.svg',
//   },
// ];

interface Props {
  ingredients: Ingredient[];
  pizza: Pizza;
}
export const YourSelections = ({ ingredients, pizza }: Props) => {
  // const [disableBuy, setDisableBuy] = useState(true);
  const [disableBake, setDisableBake] = useState(true);

  const validatePizza = () => {
    if (isEmpty(pizza.allIngredients)) return setDisableBake(true);
    if (!pizza.base) return setDisableBake(true);
    if (!pizza.sauce) return setDisableBake(true);
    // add checks for other ingredients
    console.log('Bake and Bake Allowed!');
    setDisableBake(false);
  };

  useEffect(() => {
    validatePizza();
  }, [pizza]);

  return (
    <Box p="8">
      <Stack>
        {/* Image */}
        <Center>
          <img src="/assets/tablecloth.svg" alt="tablecloth" />
        </Center>
        {/* Number of Ingredients Selected */}
        <Flex pt={8} justifyContent="space-between">
          <Text fontWeight={700} color="gray.dark">
            {`Ingredients Selected`}
          </Text>
          <Text fontWeight={700} color="tomato.500">
            {ingredients.length}
          </Text>
        </Flex>
        {/* Selected Ingredients */}
        {pizza.allIngredients.length &&
          pizza.allIngredients.map(item => (
            <Flex key={item.name} pt={8} justifyContent="space-between">
              <Heading size={'sm'} color={'gray.dark'}>
                {item.name}
              </Heading>
              <Heading size={'sm'} color={'tomato.500'}>
                {item.cost}
              </Heading>
            </Flex>
          ))}
        {/* Buttons */}
        <Stack pt={8}>
          <Button
            disabled={pizza.totalCost === 0}
            className="tomato-btn"
          >{`Buy Ingredients only at ${pizza.totalCost}`}</Button>
          <Button
            disabled={disableBake}
            className="tomato-btn"
          >{`Buy and Bake only at ${pizza.totalCost + BAKING_FEE}`}</Button>
        </Stack>
      </Stack>
    </Box>
  );
};
