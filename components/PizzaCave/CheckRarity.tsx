import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useWallet } from '../../hooks/useWallet';

export const CheckRarity = () => {
  const { ingredientGroups } = useWallet();
  if (isEmpty(ingredientGroups)) return null;
  const allIngredients = [
    ...ingredientGroups[0].ingredients,
    ...ingredientGroups[1].ingredients,
    ...ingredientGroups[2].ingredients,
    ...ingredientGroups[3].ingredients,
    ...ingredientGroups[4].ingredients,
  ];

  return (
    <Box p="8">
      <Flex justifyContent={'space-between'}>
        <Stack>
          <Heading size={'xs'} color={'tomato.500'}>
            Ingredients
          </Heading>
          {allIngredients.map(item => {
            return (
              <Heading key={item.name} size={'xs'} color={'gray.dark'} pt="4">
                {item.name}
              </Heading>
            );
          })}
        </Stack>
        <Stack>
          <Heading size={'xs'} color={'tomato.500'}>
            Rarity
          </Heading>
          {allIngredients.map(item => {
            return (
              <Center key={item.name}>
                <Heading size={'xs'} color={'gray.dark'} pt="4">
                  {`${item.rarity.toFixed(2)}%`}
                </Heading>
              </Center>
            );
          })}
        </Stack>
        <Stack>
          <Heading size={'xs'} color={'tomato.500'}>
            # of Pizzas
          </Heading>
          {allIngredients.map(item => {
            return (
              <Center key={item.name}>
                <Heading size={'xs'} color={'gray.dark'} pt="4">
                  {item.numberOfPizzas || 0}
                </Heading>
              </Center>
            );
          })}
        </Stack>
      </Flex>
    </Box>
  );
};
