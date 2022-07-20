import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { colors } from '../../styles/theme';
import { Ingredient, Pizza, PizzaCave } from '../../types';
import { canAddIngredient, canAddRebakeIngredient } from '../../utils/general';
import { AlertModal } from '../shared/AlertModal';

interface Props {
  ingredient: Ingredient;
  addIngredient?: (ingredient: Ingredient) => void;
  removeIngredient?: (ingredient: Ingredient) => void;
  unburnIngredient?: (ingredient: Ingredient) => void;
  pizza?: Pizza;
  tab?: PizzaCave;
}

export const IngredientItem = ({
  ingredient,
  addIngredient,
  removeIngredient,
  pizza,
  tab,
  unburnIngredient,
}: Props) => {
  const { name, price, supply, balance } = ingredient;
  const [alertOpened, setAlertOpened] = useState<string | null>();
  const handleAdd = () => {
    const isBurned = !!pizza?.burnIngredients?.find(
      item => ingredient.tokenId === item.tokenId,
    );
    if (isBurned) {
      return unburnIngredient?.(ingredient);
    }
    const ingredientCanBeAdded =
      tab === PizzaCave.rebake
        ? canAddRebakeIngredient(ingredient, pizza)
        : canAddIngredient(ingredient, pizza);

    if (ingredientCanBeAdded !== true) {
      return setAlertOpened(ingredientCanBeAdded);
    }
    addIngredient(ingredient);
  };

  const handleRemove = () => {
    removeIngredient(ingredient);
  };

  const pizzaHasItem = useMemo(
    () =>
      !!pizza?.allIngredients?.find(
        item =>
          item.name === name &&
          !pizza?.burnIngredients?.find(
            burnItem => burnItem.tokenId === item.tokenId,
          ),
      ),
    [pizza, name],
  );

  const itemAdded = useMemo(
    () => !!pizza?.additionalIngredients?.find(item => item.name === name),
    [pizza, name],
  );

  const selected = tab === PizzaCave.rebake ? itemAdded : pizzaHasItem;

  return (
    <>
      {alertOpened ? (
        <AlertModal
          message={alertOpened}
          isOpen={!!alertOpened}
          onRequestClose={setAlertOpened.bind(null, false)}
        />
      ) : null}
      <Box
        className="artist-card"
        backgroundColor={selected ? colors.cheese[150] : ''}
        p="2"
      >
        <Flex sx={{ height: '100%' }}>
          <Center
            mr={2}
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
          <Stack
            width={'100%'}
            justifyContent={'space-between'}
            flexWrap="wrap"
          >
            {/* Name and Cost */}
            <Flex
              direction={'column'}
              justifyContent={
                tab === PizzaCave.buyAndBake ? 'space-between' : 'center'
              }
            >
              <Stack direction="row" alignItems="center">
                <Heading fontSize="14px" size={'sm'} color="gray.dark" mb={2}>
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
            <Flex direction={'column'} justifyContent={'space-between'}>
              <Text size={'sm'} fontSize="14px" color="gray.dark" mb={2}>
                {supply}/10,000 remaining
              </Text>
              {!!addIngredient && !!removeIngredient && (
                <Button
                  className="tomato-btn"
                  onClick={selected ? handleRemove : handleAdd}
                  disabled={tab === PizzaCave.rebake && pizzaHasItem}
                  display="inline-block"
                  size="sm"
                  width="auto"
                >
                  {selected ? `Remove` : `Add`}
                </Button>
              )}
            </Flex>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};
