import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { BAKING_FEE } from '../../constants';
import { colors } from '../../styles/theme';
import { Pizza, Ingredient, IngredientType, PizzaCave } from '../../types';
import {
  addIngredient,
  DefaultPizza,
  getIsMobile,
  removeIngredient,
} from '../../utils/general';
import { NavButton } from '../shared/NavButton';
import { BuyAndBakeTabs, ingredientGroups } from './BuyAndBake';
import { CheckRarity } from './CheckRarity';
import { SelectYourIngredients } from './SelectYourIngredients';
import { YourSelections } from './YourSelections';

export const Bake = () => {
  const isMobile = getIsMobile();
  const [pizza, setPizza] = useState<Pizza>(DefaultPizza);
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
          Bake a Pizza
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Bake a pizzza with ingredients you already have in your wallet. ${BAKING_FEE}ETH
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
        <Flex borderTop="2px" borderColor={'gray.light'}>
          <div style={{ width: '50%' }}>
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
                title={BuyAndBakeTabs.selections}
                isSelected={selectedHalfTab === BuyAndBakeTabs.selections}
                onClick={() => {
                  setSelectedTab(BuyAndBakeTabs.selections);
                  setSelectedHalfTab(BuyAndBakeTabs.selections);
                }}
                bgColor={colors.gray.backGround}
              />
              <NavButton
                title={BuyAndBakeTabs.checkRarity}
                isSelected={selectedHalfTab === BuyAndBakeTabs.checkRarity}
                onClick={() => {
                  setSelectedTab(BuyAndBakeTabs.checkRarity);
                  setSelectedHalfTab(BuyAndBakeTabs.checkRarity);
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
