import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { UNBAKE_FEE } from '../../constants';
import { useWallet } from '../../hooks/useWallet';
import { colors } from '../../styles/theme';
import { Pizza, PizzaCave } from '../../types';
import { useIsMobile } from '../../utils/general';
import { NavButton } from '../shared/NavButton';
import { CheckRarity } from './CheckRarity';
import { SelectYourPizza } from './SelectYourPizza';
import { YourSelections } from './YourSelections';

export enum UnbakeTabs {
  pizzas = 'Pizzas',
  selection = 'Selected Pizza',
  checkRarity = 'Check Rarity',
}

export const Unbake = () => {
  const isMobile = useIsMobile();
  const { myPizzas: pizzas } = useWallet();
  const [pizza, setPizza] = useState<Pizza>(null);
  const [selectedTab, setSelectedTab] = useState(UnbakeTabs.pizzas);
  const [selectedHalfTab, setSelectedHalfTab] = useState(UnbakeTabs.selection);

  const renderTab = (tab: UnbakeTabs) => {
    switch (tab) {
      case UnbakeTabs.pizzas:
        return (
          <SelectYourPizza
            selectPizza={p => setPizza(p)}
            pizzas={pizzas}
            selectedPizza={pizza}
          />
        );
      case UnbakeTabs.selection:
        return <YourSelections pizza={pizza} tab={PizzaCave.unbake} />;
      case UnbakeTabs.checkRarity:
        return <CheckRarity />;
      default:
        break;
    }
  };

  return (
    <Box>
      <Stack m="10px">
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          Unbake a Pizza ({UNBAKE_FEE} ETH)
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Reverse the BAKE process to burn a pizza you own and receive  its constituent ingredient NFTs in your wallet. Ingredients may then be traded on secondary markets or used to bake another pizza.`}
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
            <SelectYourPizza
              selectPizza={p => setPizza(p)}
              pizzas={pizzas}
              selectedPizza={pizza}
            />
          </Box>
          <Stack
            style={{ width: '50%', backgroundColor: colors.gray.background }}
            maxHeight="900px"
            overflowY={'auto'}
            className="scrollable"
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
