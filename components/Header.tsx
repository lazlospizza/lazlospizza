import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Heading, Stack, Button } from '@chakra-ui/react';
import axios from 'axios';
import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import { flatten } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMainContract } from '../hooks/useContract';
import { useWallet } from '../hooks/useWallet';
import { headerHeight } from '../styles/theme';
import { useIsMobile } from '../utils/general';
import { ConnectWalletButton } from './ConnectWalletButton';
import { HeaderMenu } from './shared/HeaderMenu';

const firstPizzaBlock = 14826581;

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

  const checkRarityRewards = useCallback(async () => {
    if (!wallet?.address) return null;
    const payoutsRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/payouts`,
    );
    const winners: { [key: string]: Reward[] } = payoutsRes.data;

    const rewards = winners[wallet?.address];

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
          `${process.env.NEXT_PUBLIC_API_URL}/payout?address=${wallet.address}&block=${unpaidRewards[i].block}`,
        );

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
    console.log(payouts);
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
            {!!unpaidRewards.length && (
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
              {!!unpaidRewards.length ||
                (!!wallet?.address && (
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
                ))}
            </Stack>
          )}
        </Box>
        {isMobile && showMobileMenu && <MobileMenu />}
      </Box>
      <div
        style={{
          height: isMobile ? headerHeight.mobile : headerHeight.desktop,
        }}
      />
    </Stack>
  );
};
