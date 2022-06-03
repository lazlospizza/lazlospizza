/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Center, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BAKING_FEE } from '../../constants';
import { useWallet } from '../../hooks/useWallet';
import { colors } from '../../styles/theme';
import { Pizza, Ingredient, PizzaCave } from '../../types';
import {
  addIngredient,
  DefaultPizza,
  useIsMobile,
  removeIngredient,
} from '../../utils/general';
import { NavButton } from '../shared/NavButton';
import { BuyAndBakeTabs } from './BuyAndBake';
import { CheckRarity } from './CheckRarity';
import { SelectYourIngredients } from './SelectYourIngredients';
import { YourSelections } from './YourSelections';

export const Bake = () => {
  const { ingredientGroups, myIngredients } = useWallet();
  const isMobile = useIsMobile();
  const [pizza, setPizza] = useState<Pizza>(DefaultPizza);
  const [selectedTab, setSelectedTab] = useState(BuyAndBakeTabs.ingredients);
  const [selectedHalfTab, setSelectedHalfTab] = useState(
    BuyAndBakeTabs.selections,
  );
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
            ownedIngredients={myIngredients}
            addIngredient={handleAddIngredient}
            removeIngredient={handleRemoveIngredient}
            pizza={pizza}
            tab={PizzaCave.bake}
          />
        );
      case BuyAndBakeTabs.selections:
        return <YourSelections pizza={pizza} tab={PizzaCave.bake} />;
      case BuyAndBakeTabs.checkRarity:
        return <CheckRarity />;
      default:
        break;
    }
  };

  return (
    <Box>
      <Stack m="10px">
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          {`Bake a Pizza (${BAKING_FEE} ETH)`}
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Bake a pizza with ingredients you already have in your wallet.`}
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
        <Flex
          borderTop="2px"
          borderColor={'gray.light'}
          maxHeight={'900px'}
          top="20px"
        >
          <Box
            className="scrollable"
            width={'50%'}
            maxHeight="900px"
            overflowY={'auto'}
          >
            <SelectYourIngredients
              ingredientGroups={ingredientGroups}
              ownedIngredients={myIngredients}
              addIngredient={handleAddIngredient}
              removeIngredient={handleRemoveIngredient}
              pizza={pizza}
              tab={PizzaCave.bake}
            />
          </Box>
          <Stack
            style={{ width: '50%', backgroundColor: colors.gray.background }}
            maxHeight="900px"
            overflowY={'auto'}
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
