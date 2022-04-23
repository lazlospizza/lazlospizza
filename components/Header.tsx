import { Box, Heading, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWallet } from '../hooks/useWallet';
import { ConnectWalletButton } from './ConnectWalletButton';

export const Header = () => {
  const router = useRouter();
  const { isConnected } = useWallet();

  return (
    <Box className="header">
      <Link href="/">
        <a>
          <img src="/assets/logo.png" className="logo" alt="Logo" />
        </a>
      </Link>
      <Box className="header-content">
        <Stack direction="column" justifyContent="flex-end">
          <Heading>{"Lazlo's Pizza"}</Heading>
          <Stack direction="row" className="menu">
            <Link href="/">
              <a className={router.pathname === '/' ? 'current' : ''}>Home</a>
            </Link>
            <Link href="/pizza-cave">
              <a
                className={
                  router.pathname.startsWith('/pizza-cave') ? 'current' : ''
                }
              >
                Pizza Cave
              </a>
            </Link>
            <Link href="/meet-artists">
              <a
                className={
                  router.pathname.startsWith('/meet-artists') ? 'current' : ''
                }
              >
                Meet Artists
              </a>
            </Link>
            <Link href="/rarity-rewards">
              <a
                className={
                  router.pathname.startsWith('/rarity-rewards') ? 'current' : ''
                }
              >
                Rarity Rewards
              </a>
            </Link>
            {isConnected && (
              <Link href="/my-wallet">
                <a
                  className={
                    router.pathname.startsWith('/my-wallet') ? 'current' : ''
                  }
                >
                  My Wallet
                </a>
              </Link>
            )}
          </Stack>
        </Stack>
        <ConnectWalletButton />
      </Box>
    </Box>
  );
};
