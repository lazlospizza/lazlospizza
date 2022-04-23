import { Box, Heading, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { ConnectWalletButton } from './ConnectWalletButton';

export const Header = () => {
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
              <a>Home</a>
            </Link>
            <Link href="/">
              <a>Pizza Cave</a>
            </Link>
            <Link href="/">
              <a>Meet Artists</a>
            </Link>
            <Link href="/">
              <a>Rarity Rewards</a>
            </Link>
          </Stack>
        </Stack>
        <ConnectWalletButton />
      </Box>
    </Box>
  );
};
