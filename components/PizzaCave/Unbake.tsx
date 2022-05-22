import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
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
          <div style={{ width: '50%' }}>
            <SelectYourPizza
              selectPizza={p => setPizza(p)}
              pizzas={pizzas}
              selectedPizza={pizza}
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
