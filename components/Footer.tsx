import { Box, Center, Heading, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRef } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { useWallet } from '../hooks/useWallet';
import { useAppDispatch } from '../store';
import { toggleTutorial } from '../store/appSlice';
import { PageRoutes } from '../types';

export const Footer = () => {
  const dispatch = useAppDispatch();
  const tutorialTimeout = useRef<any>();
  const wallet = useWallet();
  const showTutorial = () => {
    if (tutorialTimeout.current) {
      clearTimeout(tutorialTimeout.current);
    }
    tutorialTimeout.current = setTimeout(() => {
      dispatch(toggleTutorial(true));
    }, 1000);
  };
  return (
    <Box className="footer">
      <Stack w={'full'} spacing={'60px'}>
        <Stack spacing={8}>
          <Link href={PageRoutes.meetArtists}>
            <a>Meet Pizzaiolos</a>
          </Link>
          <Link href={'/faq'}>
            <a>FAQ</a>
          </Link>
          {wallet && (
            <Link href={'/'}>
              <a onClick={showTutorial}>Tutorial</a>
            </Link>
          )}
          <Link href={'https://opensea.io/collection/lazlos-pizza'}>
            <a>OpenSea</a>
          </Link>
          <a
            href="https://twitter.com/lazlospizza"
            target="_blank"
            rel="noreferrer"
          >
            <Stack direction="row" alignItems="center">
              <FaTwitter fontSize={'20px'} color="#00acee" />
              <span>Follow us on twitter</span>
            </Stack>
          </a>
        </Stack>
        <Center w="100%" display={['none', 'block']}>
          <Heading size={'xs'}>Copyright 2022</Heading>
        </Center>
      </Stack>
    </Box>
  );
};
