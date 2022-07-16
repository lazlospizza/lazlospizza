import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { parsePrice } from '../utils/general';
import { useAppDispatch } from '../store';
import { selectRewardsInfo, updateRewardsInfo } from '../store/appSlice';
import { useSelector } from 'react-redux';

export const useRewardsInfo = () => {
  const { wallet } = useWallet();
  const dispatch = useAppDispatch();
  const rewardsInfo = useSelector(selectRewardsInfo);

  const load = useCallback(
    () =>
      wallet?.web3Provider?.getBlockNumber().then(async block => {
        let previousBlock = undefined;
        let previousNextBlock = undefined;
        let previousRarityReward = undefined;
        if (block === previousBlock) {
          return;
        }
        previousBlock = block;
        const blocksRemaining =
          parseInt(process.env.BLOCK_INTERVAL) -
          (block % parseInt(process.env.BLOCK_INTERVAL));
        const nextBlock = block + blocksRemaining;
        try {
          const [winningPizzasRes, blockPayoutRes] = await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/winning_pizzas`),
            previousNextBlock !== nextBlock
              ? axios.get(
                  `${process.env.NEXT_PUBLIC_API_URL}/calculate-block-payouts?block=${nextBlock}`,
                )
              : undefined,
          ]);
          previousNextBlock = nextBlock;
          let rarityReward = previousRarityReward;
          if (blockPayoutRes) {
            rarityReward = blockPayoutRes?.data.find(
              item => item.reason === 'Rarity reward',
            );
            previousRarityReward = rarityReward;
          }
          dispatch(
            updateRewardsInfo({
              blocksRemaining,
              nextRarityReward: rarityReward
                ? parsePrice(
                    parseFloat(
                      (
                        rarityReward.payout_amount / 1000000000000000000.0
                      ).toFixed(3),
                    ),
                    3,
                  )
                : undefined,
              scoreToBeat: winningPizzasRes.data[0]?.rarity,
            }),
          );
        } catch (error) {
          console.error(error);
        }
      }),
    [dispatch, wallet?.web3Provider],
  );
  useEffect(() => {
    if (!wallet?.web3Provider) {
      return;
    }
    let timeout: any;
    const updateFunc = async () => {
      try {
        await load();
      } catch (error) {
      } finally {
        timeout = setTimeout(() => updateFunc(), 5000);
      }
    };
    updateFunc();
    return () => {
      clearTimeout(timeout);
    };
  }, [wallet?.web3Provider, dispatch, load]);
  return { rewardsInfo, load };
};
