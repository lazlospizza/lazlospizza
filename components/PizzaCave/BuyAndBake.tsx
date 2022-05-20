/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  BAKING_FEE,
  INGREDIENT_COST,
  MEAT_LIMIT,
  TOPPING_LIMIT,
} from '../../constants';
import { Ingredient, Pizza, PizzaCave } from '../../types';
import { NavButton } from '../shared/NavButton';
import { SelectYourIngredients } from './SelectYourIngredients';
import { YourSelections } from './YourSelections';
import { CheckRarity } from './CheckRarity';
import {
  addIngredient,
  DefaultPizza,
  useIsMobile,
  getRandomInt,
  removeIngredient,
} from '../../utils/general';
import { colors } from '../../styles/theme';
import { useWallet } from '../../hooks/useWallet';

export enum BuyAndBakeTabs {
  ingredients = 'Ingredients',
  selections = 'Your Selections',
  checkRarity = 'Check Rarity',
}

export const BuyAndBake = () => {
  const { ingredientGroups } = useWallet();
  const isMobile = useIsMobile();
  const [pizza, setPizza] = useState<Pizza>(DefaultPizza);
  const [resetPizza, setResetPizza] = useState(false);
  const [selectedTab, setSelectedTab] = useState(BuyAndBakeTabs.ingredients);
  const [selectedHalfTab, setSelectedHalfTab] = useState(
    BuyAndBakeTabs.selections,
  );

  const handleAddIngredient = (item: Ingredient) => {
    addIngredient({ item, pizza, setPizza });
  };

  const handleRemoveIngredient = (item: Ingredient) => {
    removeIngredient({ item, pizza, setPizza });
  };

  const handleQuickStart = () => {
    setResetPizza(true);
    setPizza(DefaultPizza);
  };

  // handle adding quick ingredients AFTER pizza state is reset
  useEffect(() => {
    if (pizza?.allIngredients.length || !resetPizza) return;
    setResetPizza(false);
    addRandIngredients();
  }, [resetPizza]);

  const addRandIngredients = () => {
    const bases = ingredientGroups[0].ingredients;
    const sauces = ingredientGroups[1].ingredients;
    const cheeses = ingredientGroups[2].ingredients;
    const meats = ingredientGroups[3].ingredients;
    const toppings = ingredientGroups[4].ingredients;
    // add base
    handleAddIngredient(bases[getRandomInt(bases.length)]);
    // add sauce
    handleAddIngredient(sauces[getRandomInt(sauces.length)]);
    // add cheese
    handleAddIngredient(cheeses[getRandomInt(cheeses.length)]);
    // add meat (first pick rand number of meats to add)
    const numMeatsToPick = getRandomInt(MEAT_LIMIT);
    for (let i = 0; i < numMeatsToPick; i++) {
      const randMeat = meats[getRandomInt(meats.length)];
      handleAddIngredient(randMeat);
    }
    // add toppings (first pick rand number of toppings to add)
    const numToppingsToPick = getRandomInt(TOPPING_LIMIT);
    for (let i = 0; i < numToppingsToPick; i++) {
      const randTopping = toppings[getRandomInt(toppings.length)];
      handleAddIngredient(randTopping);
    }
  };

  const renderTab = (tab: BuyAndBakeTabs) => {
    switch (tab) {
      case BuyAndBakeTabs.ingredients:
        return (
          <SelectYourIngredients
            ingredientGroups={ingredientGroups}
            addIngredient={handleAddIngredient}
            removeIngredient={handleRemoveIngredient}
            pizza={pizza}
            tab={PizzaCave.buyAndBake}
            handleQuickStart={() => {
              setPizza(DefaultPizza);
              handleQuickStart();
            }}
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
      {/* deterime which view */}
      {isMobile ? (
        <Stack>
          {/* mobile nav */}
          <Center
            pt="4"
            px="8"
            alignContent={'center'}
            justifyContent={'center'}
            borderTop="1px"
            borderBottom="1px"
            borderColor={'gray.dark'}
          >
            <Flex flex="grow" w="100%" maxW="400" justifyContent="space-around">
              <NavButton
                title={BuyAndBakeTabs.ingredients}
                isSelected={selectedTab === BuyAndBakeTabs.ingredients}
                onClick={() => setSelectedTab(BuyAndBakeTabs.ingredients)}
              />
              <NavButton
                title={BuyAndBakeTabs.selections}
                isSelected={selectedTab === BuyAndBakeTabs.selections}
                onClick={() => {
                  setSelectedTab(BuyAndBakeTabs.selections);
                  setSelectedHalfTab(BuyAndBakeTabs.selections);
                }}
              />
              <NavButton
                title={BuyAndBakeTabs.checkRarity}
                isSelected={selectedTab === BuyAndBakeTabs.checkRarity}
                onClick={() => {
                  setSelectedTab(BuyAndBakeTabs.checkRarity);
                  setSelectedHalfTab(BuyAndBakeTabs.checkRarity);
                }}
              />
            </Flex>
          </Center>
          {renderTab(selectedTab)}
        </Stack>
      ) : (
        // desktop view
        <Flex borderTop="2px" borderColor={'gray.light'}>
          <div style={{ width: '50%', height: '1000px', overflowY: 'scroll' }}>
            <SelectYourIngredients
              ingredientGroups={ingredientGroups}
              addIngredient={handleAddIngredient}
              removeIngredient={handleRemoveIngredient}
              pizza={pizza}
              tab={PizzaCave.buyAndBake}
              handleQuickStart={handleQuickStart}
            />
          </div>
          <Stack
            style={{ width: '50%', backgroundColor: colors.gray.background }}
          >
            <Flex
              pt="4"
              px="8"
              alignContent={'center'}
              justifyContent={'center'}
            >
              <NavButton
                title={BuyAndBakeTabs.selections}
                isSelected={selectedHalfTab === BuyAndBakeTabs.selections}
                onClick={() => {
                  setSelectedTab(BuyAndBakeTabs.selections);
                  setSelectedHalfTab(BuyAndBakeTabs.selections);
                }}
                bgColor={colors.gray.background}
              />
              <NavButton
                title={BuyAndBakeTabs.checkRarity}
                isSelected={selectedHalfTab === BuyAndBakeTabs.checkRarity}
                onClick={() => {
                  setSelectedTab(BuyAndBakeTabs.checkRarity);
                  setSelectedHalfTab(BuyAndBakeTabs.checkRarity);
                }}
                bgColor={colors.gray.background}
              />
            </Flex>
            {renderTab(selectedHalfTab)}
          </Stack>
        </Flex>
      )}
    </Box>
  );
};
