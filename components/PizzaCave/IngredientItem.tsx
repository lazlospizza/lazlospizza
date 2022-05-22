import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { colors } from '../../styles/theme';
import { Ingredient, Pizza, PizzaCave } from '../../types';

interface Props {
  ingredient: Ingredient;
  addIngredient?: (ingredient: Ingredient) => void;
  removeIngredient?: (ingredient: Ingredient) => void;
  pizza?: Pizza;
  tab?: PizzaCave;
}

export const IngredientItem = ({
  ingredient,
  addIngredient,
  removeIngredient,
  pizza,
  tab,
}: Props) => {
  const { name, price, supply, balance } = ingredient;

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
        <Center
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 100,
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `url(/assets/ingredients/raw/${ingredient.name
                .toLowerCase()
                .replace(/'/g, '')
                .split(' ')
                .join('-')}.png)`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
            }}
          />
        </Center>
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
            <Stack direction="row" alignItems="center">
              <Heading size={'sm'} color="gray.dark">
                {name}
              </Heading>
              {!!balance && (
                <Text
                  fontSize="md"
                  color="white"
                  bg="tomato.500"
                  py={1}
                  px={3}
                  borderRadius="full"
                  fontWeight="bold"
                >
                  {balance}
                </Text>
              )}
            </Stack>
            {tab === PizzaCave.buyAndBake && (
              <Flex>
                <Heading size={'sm'} color="gray.500" mr="2">
                  {price}
                </Heading>
                <img src="/assets/eth.svg" alt="eth icon" />
              </Flex>
            )}
          </Flex>
          {/* Count and Add Button */}
          <Flex direction={'column'} justifyContent={'space-between'} py="2">
            <Text size={'sm'} color="gray.dark" align={'right'}>
              {supply}/10,000 sold
            </Text>
            {!!addIngredient && !!removeIngredient && (
              <Button
                className="tomato-btn"
                onClick={selected ? handleRemove : handleAdd}
                disabled={tab === PizzaCave.rebake && pizzaHasItem}
              >
                {selected ? `Remove` : `Add`}
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
