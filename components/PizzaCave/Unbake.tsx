import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { BAKING_FEE } from '../../constants';
import { colors } from '../../styles/theme';
import { Pizza, Ingredient, PizzaCave } from '../../types';
import {
  addIngredient,
  DefaultPizza,
  getIsMobile,
  removeIngredient,
} from '../../utils/general';
import { NavButton } from '../shared/NavButton';
import { ingredientGroups } from './BuyAndBake';
import { CheckRarity } from './CheckRarity';
import { SelectYourIngredients } from './SelectYourIngredients';
import { YourSelections } from './YourSelections';

export enum UnbakeTabs {
  pizzas = 'Pizzas',
  selection = 'Selected Pizza',
  checkRarity = 'Check Rarity',
}

export const Unbake = () => {
  const isMobile = getIsMobile();
  const [pizza, setPizza] = useState<Pizza>(DefaultPizza);
  const [selectedTab, setSelectedTab] = useState(UnbakeTabs.pizzas);
  const [selectedHalfTab, setSelectedHalfTab] = useState(UnbakeTabs.selection);

  const handleAddIngredient = (item: Ingredient) => {
    addIngredient({ item, pizza, setPizza });
  };

  const handleRemoveIngredient = (item: Ingredient) => {
    removeIngredient({ item, pizza, setPizza });
  };

  const renderTab = (tab: UnbakeTabs) => {
    switch (tab) {
      case UnbakeTabs.pizzas:
        return (
          <SelectYourIngredients
            ingredientGroups={ingredientGroups}
            addIngredient={handleAddIngredient}
            removeIngredient={handleRemoveIngredient}
            pizza={pizza}
            tab={PizzaCave.buyAndBake}
          />
        );
      case UnbakeTabs.selection:
        return <YourSelections pizza={pizza} tab={PizzaCave.buyAndBake} />;
      case UnbakeTabs.checkRarity:
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
          {`Bake a pizzza with pizzas you already have in your wallet. ${BAKING_FEE}ETH
        Baking fee.`}
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
                title={UnbakeTabs.pizzas}
                isSelected={selectedTab === UnbakeTabs.pizzas}
                onClick={() => setSelectedTab(UnbakeTabs.pizzas)}
              />
              <NavButton
                title={UnbakeTabs.selection}
                isSelected={selectedTab === UnbakeTabs.selection}
                onClick={() => {
                  setSelectedTab(UnbakeTabs.selection);
                  setSelectedHalfTab(UnbakeTabs.selection);
                }}
              />
              <NavButton
                title={UnbakeTabs.checkRarity}
                isSelected={selectedTab === UnbakeTabs.checkRarity}
                onClick={() => {
                  setSelectedTab(UnbakeTabs.checkRarity);
                  setSelectedHalfTab(UnbakeTabs.checkRarity);
                }}
              />
            </Flex>
          </Center>
          {renderTab(selectedTab)}
        </Stack>
      ) : (
        // desktop view
        <Flex borderTop="2px" borderColor={'gray.light'}>
          <div style={{ width: '50%', height: '800px', overflowY: 'scroll' }}>
            <SelectYourIngredients
              ingredientGroups={ingredientGroups}
              addIngredient={handleAddIngredient}
              removeIngredient={handleRemoveIngredient}
              pizza={pizza}
              tab={PizzaCave.buyAndBake}
            />
          </div>
          <Stack
            style={{ width: '50%', backgroundColor: colors.gray.backGround }}
          >
            <Flex
              pt="4"
              px="8"
              alignContent={'center'}
              justifyContent={'center'}
            >
              <NavButton
                title={UnbakeTabs.selection}
                isSelected={selectedHalfTab === UnbakeTabs.selection}
                onClick={() => {
                  setSelectedTab(UnbakeTabs.selection);
                  setSelectedHalfTab(UnbakeTabs.selection);
                }}
                bgColor={colors.gray.backGround}
              />
              <NavButton
                title={UnbakeTabs.checkRarity}
                isSelected={selectedHalfTab === UnbakeTabs.checkRarity}
                onClick={() => {
                  setSelectedTab(UnbakeTabs.checkRarity);
                  setSelectedHalfTab(UnbakeTabs.checkRarity);
                }}
                bgColor={colors.gray.backGround}
              />
            </Flex>
            {renderTab(selectedHalfTab)}
          </Stack>
        </Flex>
      )}
    </Box>
  );
};
