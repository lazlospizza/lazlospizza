import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../components/Header';
import { WalletProvider } from '../hooks/useWallet';
import { colors, styles } from '../styles/theme';

import '../styles/fonts.css';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  colors,
  styles,
  config,
  fonts: {
    heading: "'Press Start 2P', cursive",
    body: "'Lato', sans-serif",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{"Lazlo's Pizza"}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
        />
        <meta
          name="description"
          content="Our mission is to make creating on-chain NFTs as easy and affordable as possible."
        />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <ChakraProvider theme={theme}>
        <WalletProvider>
          <>
            <Header />
            <Component {...pageProps} />
          </>
        </WalletProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
