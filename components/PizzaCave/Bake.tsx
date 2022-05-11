import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { BAKING_FEE } from '../../constants';
import { Pizza, Ingredient, IngredientType, PizzaCave } from '../../types';
import { NavButton } from '../shared/NavButton';
import { BuyAndBakeTabs, ingredientGroups } from './BuyAndBake';
import { CheckRarity } from './CheckRarity';
import { SelectYourIngredients } from './SelectYourIngredients';
import { YourSelections } from './YourSelections';

export const Bake = () => {
  const [selectedTab, setSelectedTab] = useState(BuyAndBakeTabs.ingredients);
  const [pizza, setPizza] = useState<Pizza>({
    allIngredients: [],
    totalCost: 0,
  });

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
            tab={PizzaCave.bake}
          />
        );
      case BuyAndBakeTabs.selections:
        return <YourSelections pizza={pizza} tab={PizzaCave.bake} />;
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
          Bake a Pizza
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Bake a pizzza with ingredients you already have in your wallet. ${BAKING_FEE}ETH
        Baking fee.`}
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
