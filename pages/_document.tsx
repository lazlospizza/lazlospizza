import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { theme } from './_app';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="scrollable">
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
