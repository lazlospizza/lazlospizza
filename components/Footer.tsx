import { Box, Center, Heading, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { PageRoutes } from '../types';

export const Footer = () => {
  return (
    <Box className="footer">
      <Stack w={'full'} spacing={'60px'}>
        <Heading size={'sm'} color="cheese.200">
          {'Join Our Community'}
        </Heading>
        <Stack spacing={10}>
          <Link href={PageRoutes.meetArtists}>
            <a>Meet Artists</a>
          </Link>
          <Link href={'/faq'}>
            <a>FAQ</a>
          </Link>
          <Link href={'https://opensea.io/collection/lazlos-pizza'}>
            <a>OpenSea</a>
          </Link>
        </Stack>
        <Center w="100%">
          <Heading size={'xs'}>Copyright 2022</Heading>
        </Center>
      </Stack>
    </Box>
  );
};
