import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { BAKING_FEE, INGREDIENT_COST } from '../../constants';
import {
  Ingredient,
  IngredientGroup,
  IngredientType,
  Pizza,
  PizzaCave,
} from '../../types';
import { NavButton } from '../shared/NavButton';
import { SelectYourIngredients } from './SelectYourIngredients';
import { YourSelections } from './YourSelections';
import { CheckRarity } from './CheckRarity';

export const tempGroup: IngredientGroup[] = [
  {
    name: 'Base',
    namePlural: 'Bases',
    type: IngredientType.base,
    ingredients: [
      {
        type: IngredientType.base,
        name: 'Plain',
        cost: 0.01,
        numAvailable: 5000,
        numOwned: 1,
        imgUrl: '/assets/base-plain.svg',
      },
      {
        type: IngredientType.base,
        name: 'Gluten-Free',
        cost: 0.02,
        numAvailable: 5000,
        numOwned: 1,
        imgUrl: '/assets/base-gluten-free.svg',
      },
    ],
  },
  {
    name: 'Sauce',
    namePlural: 'Sauces',
    type: IngredientType.sauce,
    ingredients: [
      {
        type: IngredientType.sauce,
        name: 'Tomato',
        cost: 0.01,
        numAvailable: 5000,
        numOwned: 1,
        imgUrl: '/assets/sauce-tomato.svg',
      },
      {
        type: IngredientType.sauce,
        name: 'Chilli',
        cost: 0.01,
        numAvailable: 5000,

        numOwned: 1,
      },
      {
        type: IngredientType.sauce,
        name: 'BBQ',
        cost: 0.01,
        numAvailable: 5000,

        numOwned: 1,
      },
      {
        type: IngredientType.sauce,
        name: 'Garlic',
        cost: 0.01,
        numAvailable: 5000,
        numOwned: 1,
      },
    ],
  },
];

export enum BuyAndBakeTabs {
  ingredients = 'Ingredients',
  selections = 'Your Selections',
  checkRarity = 'Check Rarity',
}

export const BuyAndBake = () => {
  const [selectedTab, setSelectedTab] = useState(BuyAndBakeTabs.ingredients);
  const [pizza, setPizza] = useState<Pizza>({
    allIngredients: [],
    totalCost: 0,
  });
  const [ingredientGroups, setIngredientGroups] =
    useState<IngredientGroup[]>(tempGroup);

  const addIngredient = (item: Ingredient) => {
    switch (item.type) {
      case IngredientType.base:
        if (!!pizza.base) return;
        console.log('adding base');
        setPizza(pizza => ({
          ...pizza,
          base: item,
        }));
        break;
      case IngredientType.sauce:
        if (!!pizza.sauce) return;
        console.log('adding sauce');
        setPizza(pizza => ({
          ...pizza,
          sauce: item,
        }));
        break;
      default:
        break;
    }
    setPizza(pizza => ({
      ...pizza,
      allIngredients: [...pizza.allIngredients, item],
      totalCost: pizza.totalCost + item.cost,
    }));
  };

  const renderTab = () => {
    switch (selectedTab) {
      case BuyAndBakeTabs.ingredients:
        return (
          <SelectYourIngredients
            ingredientGroups={ingredientGroups}
            addIngredient={addIngredient}
            pizza={pizza}
            tab={PizzaCave.buyAndBake}
          />
        );
      case BuyAndBakeTabs.selections:
        return <YourSelections pizza={pizza} tab={PizzaCave.buyAndBake} />;
      case BuyAndBakeTabs.checkRarity:
        return <CheckRarity pizza={pizza} />;
      default:
        break;
    }
  };

  return (
    <Box>
      <Stack m="10px">
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          Buy Ingredients and Bake a Pizza
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Select from a delightful selection of hand-crafted ingredients freshly prepared by our pixel artistes. You can buy now and bake later, or buy and bake in one transaction. (${INGREDIENT_COST} ETH per ingredient + ${BAKING_FEE}ETH Baking fee.)`}
        </Text>
      </Stack>
      {/* divider */}
      {/* <div style={{ marginTop: 8, height: 1, backgroundColor: '#3D3431' }} /> */}
      <Flex
        pt="4"
        px="8"
        alignContent={'center'}
        justifyContent={'center'}
        borderTop={1}
        borderBottom={1}
        border="1px"
        borderColor={'gray.dark'}
        // backgroundColor="red"
      >
        <NavButton
          title={BuyAndBakeTabs.ingredients}
          isSelected={selectedTab === BuyAndBakeTabs.ingredients}
          onClick={() => setSelectedTab(BuyAndBakeTabs.ingredients)}
        />
        <NavButton
          title={BuyAndBakeTabs.selections}
          isSelected={selectedTab === BuyAndBakeTabs.selections}
          onClick={() => setSelectedTab(BuyAndBakeTabs.selections)}
        />
        <NavButton
          title={BuyAndBakeTabs.checkRarity}
          isSelected={selectedTab === BuyAndBakeTabs.checkRarity}
          onClick={() => setSelectedTab(BuyAndBakeTabs.checkRarity)}
        />
      </Flex>
      {renderTab()}
    </Box>
  );
};
