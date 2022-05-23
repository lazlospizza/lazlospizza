import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SelectYourPizza } from '../components/PizzaCave/SelectYourPizza';
import { NavButton } from '../components/shared/NavButton';
import { useMainContract } from '../hooks/useContract';
import { useWallet } from '../hooks/useWallet';
import { colors } from '../styles/theme';

enum Tabs {
  'winners',
  'topPizzas',
}

interface Reward {
  block: number;
  payout_amount: number;
  timestamp: number;
  token_id?: null | number;
}

export default function RarityRewards() {
  const { pizzas, wallet } = useWallet();
  const [selectedTab, setSelectedTab] = useState(Tabs.topPizzas);
  const { mainContract } = useMainContract();
  const [unpaidRewards, setUnpaidRewards] = useState<Reward[]>([]);
  const [isClaimingRewards, setIsClaimingRewards] = useState(false);

  const rarestPizzas = useMemo(
    () =>
      pizzas.sort((a, b) => (a.rarity || 100) - (b.rarity || 100)).slice(0, 10),
    [pizzas],
  );

  const checkRarityRewards = useCallback(async () => {
    if (!wallet?.address) return null;
    const winnersRes = await axios.get(
      'https://lazlos-pizza.s3.amazonaws.com/payouts/rinkeby.json',
    );
    const winners: { [key: string]: Reward[] } = winnersRes.data;
    const rewards = winners[wallet?.address];

    console.log(rewards);

    if (!rewards) return null;

    const _unpaidRewards: Reward[] = [];

    for (let i = 0; i < rewards.length; i += 1) {
      const hasBeenPaid = await mainContract.isPaidOutForBlock(
        wallet.address,
        rewards[i].block,
      );
      if (!hasBeenPaid) {
        _unpaidRewards.push(rewards[i]);
      }
    }
    setUnpaidRewards(_unpaidRewards);
  }, [mainContract, wallet?.address]);

  useEffect(() => {
    checkRarityRewards();
  }, [checkRarityRewards]);

  const claimRewards = async () => {
    if (!wallet?.address || !wallet?.web3Provider) return null;
    setIsClaimingRewards(true);
    const payouts: {
      payoutBlock: number;
      amount: BigNumber;
      r: string;
      s: string;
      v: number;
    }[] = [];
    for (let i = 0; i < unpaidRewards.length; i += 1) {
      try {
        const res = await axios.get(
          `https://api.lazlospizza.com/payout?address=${wallet.address}&block=${unpaidRewards[i].block}`,
        );
        console.log(res);

        const blockReward = res.data;

        payouts.push({
          payoutBlock: blockReward.block,
          amount: parseEther(`${blockReward.payout_amount}`),
          r: blockReward.r,
          s: blockReward.s,
          v: blockReward.v,
        });
      } catch (e) {
        console.log(e);
      }
    }
    try {
      const signer = wallet.web3Provider.getSigner();
      const contractWithSigner = mainContract.connect(signer);
      const result = await contractWithSigner.redeemPayout(payouts, {
        from: signer._address,
      });
      await result.wait();
      setUnpaidRewards([]);
    } catch (e) {
      console.log(e);
    }
    setIsClaimingRewards(false);
  };

  return (
    <Box p="20px" w="full">
      <Heading fontFamily="Lato" size="lg" color="tomato.500">
        Rarity Rewards
      </Heading>

      {!!unpaidRewards.length && !!wallet?.address && (
        <Button
          backgroundColor="cheese.200"
          borderWidth={2}
          borderColor="cheese.200"
          fontWeight="900"
          color="gray.800"
          _hover={{
            textDecoration: 'none',
            backgroundColor: 'tomato.500',
            borderColor: 'cheese.200',
            color: 'cheese.200',
          }}
          size="lg"
          onClick={claimRewards}
          isLoading={isClaimingRewards}
        >
          Claim Rewards
        </Button>
      )}

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
          title="Previous Winners"
          isSelected={selectedTab === Tabs.winners}
          onClick={() => {
            setSelectedTab(Tabs.winners);
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
      {selectedTab === Tabs.topPizzas && (
        <SelectYourPizza pizzas={rarestPizzas} hideTitle />
      )}
    </Box>
  );
}
