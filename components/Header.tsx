import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Heading, Stack, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMainContract } from '../hooks/useContract';
import { useWallet } from '../hooks/useWallet';
import { headerHeight } from '../styles/theme';
import { parsePrice, useIsMobile } from '../utils/general';
import { ConnectWalletButton } from './ConnectWalletButton';
import { HeaderMenu } from './shared/HeaderMenu';
import Marquee from 'react-fast-marquee';

interface Reward {
  block: number;
  payout_amount: number;
  timestamp: number;
  token_id?: null | number;
}

export const Header = () => {
  const router = useRouter();
  const ref = useRef(null);
  const { isConnected, wallet } = useWallet();
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { mainContract } = useMainContract();
  const [unpaidRewards, setUnpaidRewards] = useState<Reward[]>([]);
  const [isClaimingRewards, setIsClaimingRewards] = useState(false);
  const [rewardsInfo, setRewardsInfo] = useState<{
    blocksRemaining?: number;
    nextRarityReward?: string;
    scoreToBeat?: number;
  }>();
  useEffect(() => {
    if (!wallet?.web3Provider) {
      return;
    }
    let previousBlock = undefined;
    let previousNextBlock = undefined;
    let previousRarityReward = undefined;
    const updateFunc = () => {
      wallet?.web3Provider?.getBlockNumber().then(async block => {
        if (block === previousBlock) {
          return;
        }
        previousBlock = block;
        const blocksRemaining = 1000 - (block % 1000);
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
          setRewardsInfo({
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
          });
        } catch (error) {
          console.error(error);
        }
      });
    };
    const inverval = setInterval(updateFunc, 6000);
    updateFunc();
    return () => {
      clearInterval(inverval);
    };
  }, [wallet?.web3Provider]);
  const checkRarityRewards = useCallback(async () => {
    if (!wallet?.address) return null;
    const payoutsRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/payouts?address=${wallet.address}`,
    );
    const rewards: Reward[] = payoutsRes.data;

    if (!rewards?.length) return null;

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

  const unclaimedTotal = useMemo(
    () =>
      unpaidRewards.reduce((prev, current) => prev + current.payout_amount, 0),
    [unpaidRewards],
  );

  const claimRewards = async () => {
    if (!wallet?.address || !wallet?.web3Provider) return null;
    setIsClaimingRewards(true);
    const payouts: {
      payoutBlock: number;
      amount: string;
      r: string;
      s: string;
      v: number;
    }[] = [];
    for (let i = 0; i < unpaidRewards.length; i += 1) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/payout?address=${wallet.address}&block=${unpaidRewards[i].block}`,
        );

        const blockReward = res.data;

        payouts.push({
          payoutBlock: blockReward.block,
          amount: `${blockReward.payout_amount * 1000000000000000000.0}`,
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

  const MobileMenu = () => {
    return (
      <Box
        position="absolute"
        right={0}
        top={120}
        zIndex={1000}
        p="16px"
        w="80%"
        maxW="300px"
        mt={0}
        backgroundColor={'background.brown'}
      >
        <HeaderMenu
          direction="column"
          pathname={router.pathname}
          isWalletConnected={isConnected}
          showConnectWallet={true}
        >
          <Stack>
            <ConnectWalletButton />
            {!!unclaimedTotal && (
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
                Claim Rewards ({parsePrice(unclaimedTotal, 3)})
              </Button>
            )}
          </Stack>
        </HeaderMenu>
      </Box>
    );
  };

  const DesktopMenu = () => {
    return (
      <HeaderMenu
        direction="row"
        pathname={router.pathname}
        isWalletConnected={isConnected}
      />
    );
  };

  return (
    <Stack spacing={0}>
      <Box className="header">
        <Link href="/">
          <a>
            <img
              style={{
                height: isMobile ? headerHeight.mobile : headerHeight.desktop,
              }}
              src="/assets/logo.png"
              className="logo"
              alt="Logo"
            />
          </a>
        </Link>
        <Box className="header-content">
          <Stack direction="column" justifyContent="center">
            <Heading
              style={
                isMobile ? { fontSize: '20px' } : { letterSpacing: '10px' }
              }
            >
              {"Lazlo's Pizza"}
            </Heading>
            {/* Menu Desktop */}
            {!isMobile && <DesktopMenu />}
          </Stack>
          {isMobile ? (
            <HamburgerIcon
              ref={ref}
              onClick={() => {
                setShowMobileMenu(prev => !prev);
              }}
              color="cheese.200"
              h="100%"
              w="auto"
              maxW="60px"
            />
          ) : (
            <Stack>
              <ConnectWalletButton />
              {!!unclaimedTotal && (
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
                  Claim Rewards ({parsePrice(unclaimedTotal, 3)})
                </Button>
              )}
            </Stack>
          )}
        </Box>
        {isMobile && showMobileMenu && <MobileMenu />}
        {rewardsInfo ? (
          <Marquee
            style={{
              position: 'absolute',
              bottom: '0',
              left: `${isMobile ? 105 : 140}px`,
              width: `calc(100% - ${isMobile ? 105 : 140}px)`,
            }}
            gradientWidth={isMobile ? 10 : 120}
            speed={50}
            gradientColor={[204, 66, 66]}
          >
            {[1, 2].map(key => (
              <Stack
                key={key}
                direction="row"
                gap={isMobile ? 3 : 6}
                fontFamily={'heading'}
                minWidth="50%"
                justifyContent="space-around"
                px={isMobile ? 3 : 6}
                fontSize={isMobile ? 10 : 14}
              >
                <Text>
                  Next Rarity Reward:{' '}
                  <Text color="cheese.200" as="span">
                    {rewardsInfo.nextRarityReward || '-'}
                  </Text>
                </Text>
                <Text>⦁</Text>
                <Text>
                  <Text color="cheese.200" as="span">
                    {rewardsInfo.blocksRemaining || '-'}
                  </Text>{' '}
                  blocks remaining
                </Text>
                <Text>⦁</Text>
                <Text>
                  Score to Beat:{' '}
                  <Text color="cheese.200" as="span">
                    {rewardsInfo.scoreToBeat}
                  </Text>{' '}
                </Text>
                <Text>⦁</Text>
              </Stack>
            ))}
          </Marquee>
        ) : null}
      </Box>
      <div
        style={{
          height: isMobile ? headerHeight.mobile : headerHeight.desktop,
        }}
      />
    </Stack>
  );
};
