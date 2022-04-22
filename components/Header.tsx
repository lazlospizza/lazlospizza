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
        <Stack>
          <Heading>{"Lazlo's Pizza"}</Heading>
        </Stack>
        <ConnectWalletButton />
      </Box>
    </Box>
  );
};
