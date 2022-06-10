import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { SelectYourPizza } from '../components/PizzaCave/SelectYourPizza';
import { NavButton } from '../components/shared/NavButton';
import { useMainContract } from '../hooks/useContract';
import { useWallet } from '../hooks/useWallet';
import { colors } from '../styles/theme';
import { Pizza } from '../types';

enum Tabs {
  'winningPizzas',
  'previousWinners',
  'topPizzas',
}

export default function RarityRewards() {
  const { pizzas } = useWallet();
  const [selectedTab, setSelectedTab] = useState(Tabs.winningPizzas);
  const [winningPizzas, setWinningPizzas] = useState<Pizza[]>([]);
  const [previousWinners, setPreviousWinners] = useState<Pizza[]>([]);

  const rarestPizzas = useMemo(
    () =>
      pizzas.sort((a, b) => (a.rarity || 100) - (b.rarity || 100)).slice(0, 10),
    [pizzas],
  );

  const getWinningPizzas = useCallback(async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/winning_pizzas`,
    );
    setWinningPizzas(res.data);
  }, []);
  const { mainContract } = useMainContract();

  const getPreviousWinners = useCallback(async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/winners`);
    const payouts = (
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payouts`)
    ).data;
    let allPayouts = [];
    Object.values(payouts).forEach(
      item => (allPayouts = [...allPayouts, ...(item as any)]),
    );
    // const previousWinners: Pizza[] = [];
    const previousWinners: Pizza[] = await Promise.all(
      res.data.map(item =>
        (async () => {
          const payout = payouts[item.owner]?.find(i => i.block === item.block);
          if (!payout) {
            return;
          }
          item.payout = { ...payout };
          const storageKey = `blockPaid:v2:${payout.block}`;
          try {
            item.payout.hasBeenPaid = await mainContract.isPaidOutForBlock(
              item.owner,
              item.payout.block,
            );
            if (item.payout.hasBeenPaid !== undefined) {
              try {
                localStorage.setItem(
                  storageKey,
                  JSON.stringify(item.payout.hasBeenPaid),
                );
              } catch (error) {}
            }
          } catch (error) {
            const savedValue = localStorage.getItem(storageKey);
            if (savedValue) {
              try {
                item.payout.hasBeenPaid = JSON.parse(savedValue);
              } catch (error) {}
            }
          }
          return item;
        })(),
      ),
    );
    setPreviousWinners(previousWinners.filter(item => !!item));
  }, []);

  useEffect(() => {
    getWinningPizzas();
  }, [getWinningPizzas]);

  useEffect(() => {
    if (!mainContract) {
      return;
    }
    getPreviousWinners();
  }, [mainContract]);

  return (
    <Box p="20px" w="full">
      <Heading fontFamily="Lato" size="lg" color="tomato.500">
        Rarity Rewards
      </Heading>

      <Stack my="20px">
        <Text color="gray.dark">
          Rarity Rewards are awarded to the holder of the pizza with the lowest
          Rarity Score at a random Rewards Snapshot that takes place once in
          each Rewards Cycle. A Rewards Cycle is between 9,000-10,000 blocks on
          the Ethereum blockchain. A new Rewards Cycle starts one block after a
          Rewards Snapshot has occurred. The Rarity Reward Recipient (holder of
          rarest pizza) is then able to claim a reward paid in ETH equal to 1%
          of the Rewards balance* held in the smart contract at the time of the
          snapshot.
        </Text>
        <Text color="gray.dark">
          (*The Rewards balance is the total ETH balance held in the smart
          contract minus any unclaimed rewards and developer allowances.)
        </Text>
      </Stack>

      <Flex pt="4" px="8" alignContent={'center'} justifyContent={'center'}>
        <NavButton
          title="Winning Pizzas"
          isSelected={selectedTab === Tabs.winningPizzas}
          onClick={() => {
            setSelectedTab(Tabs.winningPizzas);
          }}
          bgColor={colors.gray.background}
        />
        <NavButton
          title="Previous Winners"
          isSelected={selectedTab === Tabs.previousWinners}
          onClick={() => {
            setSelectedTab(Tabs.previousWinners);
          }}
          bgColor={colors.gray.background}
        />
        <NavButton
          title="Current Rarest Pizzas"
          isSelected={selectedTab === Tabs.topPizzas}
          onClick={() => {
            setSelectedTab(Tabs.topPizzas);
          }}
          bgColor={colors.gray.background}
        />
      </Flex>
      {selectedTab === Tabs.winningPizzas && (
        <SelectYourPizza
          pizzas={winningPizzas}
          hideTitle
          useIngredientsForImage
        />
      )}
      {selectedTab === Tabs.previousWinners && (
        <SelectYourPizza
          pizzas={previousWinners}
          hideTitle
          useIngredientsForImage
          columns={2}
          showPayout
        />
      )}
      {selectedTab === Tabs.topPizzas && (
        <SelectYourPizza pizzas={rarestPizzas} columns={2} hideTitle />
      )}
    </Box>
  );
}
