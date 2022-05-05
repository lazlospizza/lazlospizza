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
import { Ingredient } from '../../types';

const ingredients = [
  {
    name: 'Plain',
    cost: 0.01,
    numAvailable: 5000,
    numAllowed: 1,
    imgUrl: '/assets/base-plain.svg',
  },
  {
    name: 'Gluten-Free',
    cost: 0.02,
    numAvailable: 5000,
    numAllowed: 1,
    imgUrl: '/assets/base-gluten-free.svg',
  },
];

interface Props {
  ingredients: Ingredient[];
}
export const YourSelections = ({ _ingredients }: Props) => {
  const [buyCost, setBuyCost] = useState(0);

  useEffect(() => {
    if (isEmpty(ingredients)) return;
    const total = ingredients.reduce((sum, item) => sum + item.cost, 0);
    // don't update state if not needed
    if (total === buyCost) return;
    setBuyCost(total);
  }, [ingredients]);

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
        {ingredients.map(item => (
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
            disabled={isEmpty(ingredients)}
            className="tomato-btn"
          >{`Buy Ingredients only at ${buyCost}`}</Button>
          <Button
            disabled={isEmpty(ingredients)}
            className="tomato-btn"
          >{`Buy and Bake only at ${buyCost + BAKING_FEE}`}</Button>
        </Stack>
      </Stack>
    </Box>
  );
};
