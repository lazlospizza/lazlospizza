import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import { Header } from '../components/Header';
import { WalletProvider } from '../hooks/useWallet';
import { colors, styles } from '../styles/theme';

import 'react-image-lightbox/style.css';
import '../styles/global.css';
import '../styles/fonts.css';
import 'intro.js/introjs.css';
import { Footer } from '../components/Footer';
import { Provider } from 'react-redux';
import store from '../store';
import { Tutorial } from '../components/Tutorial';
import dynamic from 'next/dynamic';

const MusicNoSSR = dynamic(() => import('../components/Music'), { ssr: false });

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
          content="Pixelated pizzas win ETH prizes in Lazlo's Pizza Cave. Visit lazlospizza.com to bake your own."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ChakraProvider theme={theme}>
        <WalletProvider>
          <Provider store={store}>
            <>
              <Header />
              <Component {...pageProps} />
              <Footer />
              <>
                <MusicNoSSR />
                <Tutorial />
              </>
            </>
          </Provider>
        </WalletProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
