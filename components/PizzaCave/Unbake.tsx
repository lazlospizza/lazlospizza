import { Box, Center, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import { flatten } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { BAKING_FEE } from '../../constants';
import { PizzaStructOutput } from '../../contracts/typechain-types/contracts/LazlosPizzas';
import { usePizzaContract } from '../../hooks/useContract';
import { useWallet } from '../../hooks/useWallet';
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
import { SelectYourPizza } from './SelectYourPizza';
import { YourSelections } from './YourSelections';

export enum UnbakeTabs {
  pizzas = 'Pizzas',
  selection = 'Selected Pizza',
  checkRarity = 'Check Rarity',
}

export const Unbake = () => {
  const isMobile = getIsMobile();
  const { wallet, isConnected } = useWallet();
  const { pizzaContract } = usePizzaContract();
  const [pizza, setPizza] = useState<Pizza>(null);
  const [selectedTab, setSelectedTab] = useState(UnbakeTabs.pizzas);
  const [selectedHalfTab, setSelectedHalfTab] = useState(UnbakeTabs.selection);
  const [errorMessage, setErrorMessage] = useState('');
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const toast = useToast();
  const provider = wallet?.web3Provider;

  const getPizzas = useCallback(async () => {
    if (!provider || !isConnected) return;
    try {
      setErrorMessage(null);
      const numberOfPizzasBigNumber = await pizzaContract.numPizzas();
      const numberOfPizzas = parseInt(numberOfPizzasBigNumber._hex, 16);
      const allIngredients = flatten(
        ingredientGroups.map(group => group.ingredients),
      );
      const _pizzas = await Promise.all(
        Array.from(Array(numberOfPizzas).keys()).map(async i => {
          const tokenId = i + 1;
          const owner = await pizzaContract.ownerOf(tokenId);
          if (owner === wallet?.address) {
            const ingredients = await pizzaContract.pizza(tokenId);
            const flattenedIngredients = flatten(ingredients);
            return {
              tokenId,
              base: allIngredients.find(i => i.tokenId === ingredients[0]),
              sauce: allIngredients.find(i => i.tokenId === ingredients[1]),
              cheese: allIngredients.find(
                i => i.tokenId === ingredients[2].filter(_i => !!_i)[0],
              ),
              meats: allIngredients.filter(i =>
                ingredients[3].find(_i => _i === i.tokenId),
              ),
              toppings: allIngredients.filter(i =>
                ingredients[3].find(_i => _i === i.tokenId),
              ),
              allIngredients: allIngredients.filter(_i =>
                flattenedIngredients.includes(_i.tokenId),
              ),
            } as Pizza;
          }
          return null;
        }),
      );
      const pizzasOwned = _pizzas.filter(_pizza => !!_pizza);
      console.log(pizzasOwned);
      setPizzas(pizzasOwned);
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MM_ERR = e;
      setErrorMessage('Unexpected Error');
    }
  }, [pizzaContract, provider, pizza, wallet?.address]);

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

  useEffect(() => {
    getPizzas();
  }, [getPizzas]);

  const renderTab = (tab: UnbakeTabs) => {
    switch (tab) {
      case UnbakeTabs.pizzas:
        return (
          <SelectYourPizza
            selectPizza={p => setPizza(p)}
            pizzas={pizzas}
            selectedPizza={pizza}
            tab={PizzaCave.unbake}
          />
        );
      case UnbakeTabs.selection:
        return <YourSelections pizza={pizza} tab={PizzaCave.unbake} />;
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
          Unbake a Pizza (0.05 ETH)
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Customize a pizza you already hold. Add ingredients from your wallet or remove* ingredients to improve your Rarity Reward Score.`}
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
            <SelectYourPizza
              selectPizza={p => setPizza(p)}
              pizzas={pizzas}
              selectedPizza={pizza}
              tab={PizzaCave.unbake}
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
                title={UnbakeTabs.selection}
                isSelected={selectedHalfTab === UnbakeTabs.selection}
                onClick={() => {
                  setSelectedTab(UnbakeTabs.selection);
                  setSelectedHalfTab(UnbakeTabs.selection);
                }}
                bgColor={colors.gray.background}
              />
              <NavButton
                title={UnbakeTabs.checkRarity}
                isSelected={selectedHalfTab === UnbakeTabs.checkRarity}
                onClick={() => {
                  setSelectedTab(UnbakeTabs.checkRarity);
                  setSelectedHalfTab(UnbakeTabs.checkRarity);
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
