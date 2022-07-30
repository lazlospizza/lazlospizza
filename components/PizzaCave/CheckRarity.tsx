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
    <Box pt="8" px="4">
      <Flex justifyContent={'space-between'}>
        <Stack>
          <Heading
            h={['30', '50']}
            fontSize={['10px', '14px']}
            mr="2"
            size={'xs'}
            color={'tomato.500'}
          >
            Ingredients
          </Heading>
          {allIngredients.map(item => {
            return (
              <Heading
                key={item.name}
                h={['30', '50']}
                mr="2"
                size={'xs'}
                color={'gray.dark'}
                pt={['2', '4']}
                fontSize={['10px', '14px']}
              >
                {item.name}
              </Heading>
            );
          })}
        </Stack>
        <Stack>
          <Heading
            h={['30', '50']}
            fontSize={['10px', '14px']}
            mr="2"
            size={'xs'}
            color={'tomato.500'}
          >
            Rarity
          </Heading>
          {allIngredients.map(item => {
            return (
              <Center key={item.name}>
                <Heading
                  h={['30', '50']}
                  mr="2"
                  size={'xs'}
                  color={'gray.dark'}
                  pt={['2', '4']}
                  fontSize={['10px', '14px']}
                >
                  {`${item.rarity?.toFixed(2)}%`}
                </Heading>
              </Center>
            );
          })}
        </Stack>
        <Stack>
          <Heading
            mr="2"
            size={'xs'}
            h={['30', '50']}
            fontSize={['10px', '14px']}
            color={'tomato.500'}
            textAlign="center"
          >
            # of Pizzas
          </Heading>
          {allIngredients.map(item => {
            return (
              <Center key={item.name}>
                <Heading
                  h={['30', '50']}
                  mr="2"
                  size={'xs'}
                  color={'gray.dark'}
                  pt={['2', '4']}
                  fontSize={['10px', '14px']}
                >
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
