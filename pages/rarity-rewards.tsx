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
  'previousWinners',
  'topPizzas',
}

export default function RarityRewards() {
  const { pizzas } = useWallet();
  const [selectedTab, setSelectedTab] = useState(Tabs.previousWinners);
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
      <Stack direction={['column', 'row']}>
        <Box width={['100%', '55%']}>
          <Heading fontFamily="Lato" size="lg" color="tomato.500">
            Rarity Rewards
          </Heading>

          <Stack my="20px">
            <Text color="gray.dark">
              Rarity Rewards are paid to the user that achieves the lowest
              rarity score in a Rewards Cycle. Rarity scores are calculated by
              getting the average percentage score of all 21 traits on a pizza.
              Rarity Scores range from 0-100, with lower rarity scores being
              more difficult to achieve, thus more desirable.
            </Text>
            <Text color="gray.dark">
              The value of the next Rarity Reward, the current Score to Beat and
              a countdown to the next Reward Block are updated in real time
              above.
            </Text>
            <Text color="gray.dark">
              Reward Cycles typically last 10,000 blocks with the winner
              receiving 1% of the Reward Pool. The Score to Beat resets to the
              prevailing lowest Rarity Score at the beginning of each new Reward
              Cycle. On occasion, such as initial launch period, Rewards Cycles
              may be put on turbo mode with winners being paid every 1,000
              blocks!
            </Text>
            <Text color="gray.dark">
              You may use the Check Rarity tool in the Pizza Cave to view
              up-to-date data on the percentage of pizzas that contain each
              ingredient. This information may help you improve your score by
              removing common ingredients and adding rarer ingredients to your
              pizza.
            </Text>
            <Text color="gray.dark">
              Check out FAQs for an in-depth explainer on how Rarity Rewards are
              calculated and how winners are chosen.
            </Text>
          </Stack>
        </Box>
        <Box width={['100%', '45%']}>
          <Heading fontFamily="Lato" size="lg" color="tomato.500">
            Score to beat
          </Heading>
          <SelectYourPizza
            style={{ marginTop: 0 }}
            pizzas={winningPizzas}
            hideTitle
            useIngredientsForImage
            showOwner
          />
        </Box>
      </Stack>

      <Flex pt="4" px="8" alignContent={'center'} justifyContent={'center'}>
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
      {selectedTab === Tabs.previousWinners && (
        <SelectYourPizza
          pizzas={previousWinners}
          hideTitle
          useIngredientsForImage
          columns={2}
          showPayout
          showOwner
        />
      )}
      {selectedTab === Tabs.topPizzas && (
        <SelectYourPizza
          pizzas={rarestPizzas}
          columns={2}
          hideTitle
          showOwner
        />
      )}
    </Box>
  );
}
