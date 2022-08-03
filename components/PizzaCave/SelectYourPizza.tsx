import { Box, Text, Stack, Flex, Grid } from '@chakra-ui/react';
import { Pizza } from '../../types';
import { CSSProperties, useMemo, useState } from 'react';
import { orderBy } from 'lodash';
import { useWallet } from '../../hooks/useWallet';
import MultiSelectMenu from '../MultiSelect/MultiSelect';
import { PizzaItem } from './PizzaItem';

enum PizzaOrder {
  rarityAsc = 'Rarity (asc)',
  rarityDesc = 'Rarity (desc)',
  tokenIdAsc = 'Token ID (asc)',
  tokenIdDesc = 'Token ID (desc)',
  creationDateAsc = 'Creation Date (asc)',
  creationDateDesc = 'Creation Date (desc)',
}
const orderList = [
  PizzaOrder.rarityAsc,
  PizzaOrder.rarityDesc,
  PizzaOrder.tokenIdAsc,
  PizzaOrder.tokenIdDesc,
  PizzaOrder.creationDateAsc,
  PizzaOrder.creationDateDesc,
];

interface Props {
  selectPizza?: (pizza: Pizza) => void;
  pizzas: Pizza[];
  selectedPizza?: Pizza;
  hideTitle?: boolean;
  useIngredientsForImage?: boolean;
  columns?: number;
  showPayout?: boolean;
  showOwner?: boolean;
  showOptions?: boolean;
  style?: CSSProperties;
}
export const SelectYourPizza = ({
  selectPizza,
  pizzas,
  selectedPizza,
  hideTitle,
  useIngredientsForImage = false,
  columns = 3,
  showPayout = false,
  showOwner = false,
  showOptions = false,
  style,
}: Props) => {
  const [order, setOrder] = useState<PizzaOrder>(PizzaOrder.rarityDesc);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const { ingredientGroups } = useWallet();
  const allIngredientOptions = useMemo(
    () =>
      [
        ...ingredientGroups[0].ingredients,
        ...ingredientGroups[1].ingredients,
        ...ingredientGroups[2].ingredients,
        ...ingredientGroups[3].ingredients,
        ...ingredientGroups[4].ingredients,
      ].map(item => ({ value: item.tokenId.toString(), label: item.name })),
    [ingredientGroups],
  );
  const visiblePizzas = useMemo(() => {
    if (!showOptions) {
      return pizzas;
    }
    let filtered = [...pizzas];
    if (selectedIngredients && selectedIngredients.length) {
      filtered = filtered.filter(
        pizza =>
          !selectedIngredients.find(
            ingredientTokenId =>
              !pizza.allIngredients.find(
                ingredient =>
                  ingredientTokenId === ingredient.tokenId.toString(),
              ),
          ),
      );
      filtered = filtered.filter(item =>
        item.allIngredients.find(
          ingredient =>
            !!selectedIngredients.find(
              tokenId => tokenId === ingredient.tokenId.toString(),
            ),
        ),
      );
    }
    switch (order) {
      case PizzaOrder.creationDateDesc:
        return filtered.reverse();
      case PizzaOrder.creationDateAsc:
        return filtered;
      case PizzaOrder.tokenIdAsc:
        return orderBy(filtered, ['tokenId'], ['asc']);
      case PizzaOrder.tokenIdDesc:
        return orderBy(filtered, ['tokenId'], ['desc']);
      case PizzaOrder.rarityAsc:
        return orderBy(filtered, ['rarity'], ['asc']);
      case PizzaOrder.rarityDesc:
        return orderBy(filtered, ['rarity'], ['desc']);
    }
  }, [pizzas, order, selectedIngredients, showOptions]);
  return (
    <Box style={{ marginTop: 20, padding: 10, ...style }}>
      <Stack>
        <Flex justify={'space-between'} alignItems="center">
          <Text color="gray.dark" fontWeight={700} fontSize={'xl'}>
            {!hideTitle && 'Your Pizzas'}
          </Text>
        </Flex>
        {pizzas.length && showOptions ? (
          <Stack direction={'row'} gap="10px">
            <MultiSelectMenu
              options={orderList.map(item => ({
                value: item,
                label: item,
              }))}
              value={order}
              label={order}
              onChange={val => {
                setOrder(val as PizzaOrder);
              }}
            ></MultiSelectMenu>
            {allIngredientOptions?.length ? (
              <MultiSelectMenu
                options={allIngredientOptions}
                value={selectedIngredients}
                multi={true}
                label={
                  selectedIngredients?.length
                    ? 'Selected Ingredients'
                    : 'All Ingredients'
                }
                onChange={val => {
                  setSelectedIngredients(val as string[]);
                }}
              ></MultiSelectMenu>
            ) : null}
          </Stack>
        ) : null}
        <Grid
          templateColumns={{
            sm: `repeat(2, 1fr)`,
            md: `repeat(${columns}, 1fr)`,
          }}
          gap={{ sm: 3, md: 6 }}
          minH="500px"
        >
          {visiblePizzas.map((pizza, i) => (
            <PizzaItem
              pizza={pizza}
              key={`${pizza.tokenId}-${i}`}
              selected={pizza.tokenId === selectedPizza?.tokenId}
              useIngredientsForImage={useIngredientsForImage}
              showPayout={showPayout}
              showOwner={showOwner}
              onSelect={selectPizza}
            />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};
