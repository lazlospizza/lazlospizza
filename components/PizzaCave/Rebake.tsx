import { Box, Center, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { colors } from '../../styles/theme';
import { Pizza, Ingredient, PizzaCave } from '../../types';
import {
  addAdditionalIngredient,
  addBurnIngredient,
  useIsMobile,
  removeAdditionalIngredient,
  removeBurnIngredient,
} from '../../utils/general';
import { NavButton } from '../shared/NavButton';
import { CheckRarity } from './CheckRarity';
import { SelectYourIngredients } from './SelectYourIngredients';
import { SelectYourPizza } from './SelectYourPizza';
import { YourSelections } from './YourSelections';

export enum RebakeTabs {
  pizzas = 'Pizzas',
  selection = 'Selected Pizza',
  checkRarity = 'Check Rarity',
}

export const Rebake = () => {
  const isMobile = useIsMobile();
  const { ingredientGroups, myPizzas: pizzas, myIngredients } = useWallet();
  const [pizza, setPizza] = useState<Pizza>(null);
  const [selectedTab, setSelectedTab] = useState(RebakeTabs.pizzas);
  const [selectedHalfTab, setSelectedHalfTab] = useState(RebakeTabs.selection);
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (!!errorMessage) {
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 9000,
        isClosable: true,
        onCloseComplete: () => setErrorMessage(null),
      });
    }
  }, [errorMessage, toast]);

  const handleAddAdditionalIngredient = (item: Ingredient) => {
    addAdditionalIngredient({ item, setPizza });
  };

  const handleRemoveAdditionalIngredient = (item: Ingredient) => {
    removeAdditionalIngredient({ item, setPizza });
  };

  const handleAddBurnIngredient = (item: Ingredient) => {
    addBurnIngredient({ item, setPizza });
  };

  const handleRemoveBurnIngredient = (item: Ingredient) => {
    removeBurnIngredient({ item, setPizza });
  };

  const renderTab = (tab: RebakeTabs) => {
    switch (tab) {
      case RebakeTabs.pizzas:
        return pizza ? (
          <SelectYourIngredients
            ingredientGroups={ingredientGroups}
            ownedIngredients={myIngredients}
            addIngredient={() => {}}
            removeIngredient={() => {}}
            pizza={pizza}
            tab={PizzaCave.rebake}
          />
        ) : (
          <SelectYourPizza
            selectPizza={p => setPizza(p)}
            pizzas={pizzas}
            selectedPizza={pizza}
          />
        );
      case RebakeTabs.selection:
        return (
          <YourSelections
            pizza={pizza}
            tab={PizzaCave.rebake}
            addBurnIngredient={handleAddBurnIngredient}
            removeBurnIngredient={handleRemoveBurnIngredient}
          />
        );
      case RebakeTabs.checkRarity:
        return <CheckRarity />;
      default:
        break;
    }
  };

  return (
    <Box>
      <Stack m="10px">
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          Rebake (0.01 ETH)
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Disassemble a pizza held in your wallet and return the constituent fresh ingredient NFTs to your wallet for trading or baking new pizzas.`}
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
                title={RebakeTabs.pizzas}
                isSelected={selectedTab === RebakeTabs.pizzas}
                onClick={() => setSelectedTab(RebakeTabs.pizzas)}
              />
              <NavButton
                title={RebakeTabs.selection}
                isSelected={selectedTab === RebakeTabs.selection}
                onClick={() => {
                  setSelectedTab(RebakeTabs.selection);
                  setSelectedHalfTab(RebakeTabs.selection);
                }}
              />
              <NavButton
                title={RebakeTabs.checkRarity}
                isSelected={selectedTab === RebakeTabs.checkRarity}
                onClick={() => {
                  setSelectedTab(RebakeTabs.checkRarity);
                  setSelectedHalfTab(RebakeTabs.checkRarity);
                }}
              />
            </Flex>
          </Center>
          {renderTab(selectedTab)}
        </Stack>
      ) : (
        // desktop view
        <Flex borderTop="2px" borderColor={'gray.light'}>
          <div style={{ width: '50%' }}>
            {pizza ? (
              <SelectYourIngredients
                ingredientGroups={ingredientGroups}
                ownedIngredients={myIngredients}
                addIngredient={handleAddAdditionalIngredient}
                removeIngredient={handleRemoveAdditionalIngredient}
                pizza={pizza}
                tab={PizzaCave.rebake}
              />
            ) : (
              <SelectYourPizza
                selectPizza={p => setPizza(p)}
                pizzas={pizzas}
                selectedPizza={pizza}
              />
            )}
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
                title={RebakeTabs.selection}
                isSelected={selectedHalfTab === RebakeTabs.selection}
                onClick={() => {
                  setSelectedTab(RebakeTabs.selection);
                  setSelectedHalfTab(RebakeTabs.selection);
                }}
                bgColor={colors.gray.background}
              />
              <NavButton
                title={RebakeTabs.checkRarity}
                isSelected={selectedHalfTab === RebakeTabs.checkRarity}
                onClick={() => {
                  setSelectedTab(RebakeTabs.checkRarity);
                  setSelectedHalfTab(RebakeTabs.checkRarity);
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
