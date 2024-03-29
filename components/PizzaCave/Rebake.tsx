import { Box, Center, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CHECK_RARITY_INFO, REBAKE_FEE } from '../../constants';
import { useWallet } from '../../hooks/useWallet';
import { colors } from '../../styles/theme';
import { Pizza, Ingredient, PizzaCave } from '../../types';
import {
  addAdditionalIngredient,
  addBurnIngredient,
  useIsMobile,
  removeAdditionalIngredient,
  removeBurnIngredient,
  parsePrice,
  canUndoBurnIngredient,
} from '../../utils/general';
import { AlertModal } from '../shared/AlertModal';
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
  const [alertOpened, setAlertOpened] = useState<string | null>();
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
    const canUndo = canUndoBurnIngredient(item, pizza);
    if (canUndo !== true) {
      return setAlertOpened(canUndo);
    }
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
            columns={2}
          />
        );
      case RebakeTabs.selection:
        return (
          <YourSelections
            pizza={pizza}
            tab={PizzaCave.rebake}
            addBurnIngredient={handleAddBurnIngredient}
            removeBurnIngredient={handleRemoveBurnIngredient}
            setPizza={setPizza}
          />
        );
      case RebakeTabs.checkRarity:
        return <CheckRarity />;
      default:
        break;
    }
  };

  return (
    <>
      {alertOpened ? (
        <AlertModal
          message={alertOpened}
          isOpen={!!alertOpened}
          onRequestClose={setAlertOpened.bind(null, false)}
        />
      ) : null}
      <Box>
        <Stack m="10px">
          <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
            Rebake ({parsePrice(REBAKE_FEE)})
          </Text>
          <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
            {`Customize a pizza you already own. Add ingredients from your wallet or remove* ingredients to improve your Rarity Score. (*Removed ingredients are burned, not returned to your wallet. This is an irreversible process.)`}
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
              <Flex
                flex="grow"
                w="100%"
                maxW="400"
                justifyContent="space-around"
              >
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
                  infoTooltip={CHECK_RARITY_INFO}
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
          <Flex borderTop="2px" borderColor={'gray.light'} top="20px">
            <Box className="scrollable" width={'50%'}>
              {pizza ? (
                <SelectYourIngredients
                  ingredientGroups={ingredientGroups}
                  ownedIngredients={myIngredients}
                  addIngredient={handleAddAdditionalIngredient}
                  removeIngredient={handleRemoveAdditionalIngredient}
                  unburnIngredient={handleRemoveBurnIngredient}
                  pizza={pizza}
                  tab={PizzaCave.rebake}
                  unselectPizza={() => setPizza(null)}
                />
              ) : (
                <SelectYourPizza
                  selectPizza={p => setPizza(p)}
                  pizzas={pizzas}
                  selectedPizza={pizza}
                  columns={2}
                />
              )}
            </Box>
            <Stack
              style={{ width: '50%', backgroundColor: colors.gray.background }}
              className="scrollable"
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
                  infoTooltip={CHECK_RARITY_INFO}
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
    </>
  );
};
