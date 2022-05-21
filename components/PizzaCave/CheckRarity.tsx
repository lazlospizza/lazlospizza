import { Box, Center, Flex, Heading, Stack } from '@chakra-ui/react';
import { Pizza } from '../../types';

interface Props {
  pizza: Pizza;
}
export const CheckRarity = ({ pizza }: Props) => {
  if (!pizza) return null;
  return (
    <Box p="8">
      <Flex justifyContent={'space-between'}>
        <Stack>
          <Heading size={'xs'} color={'tomato.500'}>
            Ingredients
          </Heading>
          {pizza?.allIngredients.map(item => {
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
          {pizza?.allIngredients.map(item => {
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
          {pizza?.allIngredients.map(item => {
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
