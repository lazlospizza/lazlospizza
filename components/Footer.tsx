import { Box, Center, Heading, Stack } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box className="footer">
      <Stack w={'full'} spacing={'60px'}>
        <Heading size={'sm'} color="bellpepper.200">
          {'Join Our Community'}
        </Heading>
        <Stack spacing={10}>
          <Heading size={'xs'}>Meet Artists</Heading>
          <Heading size={'xs'}>FAQ</Heading>
          <Heading size={'xs'}>OpenSea</Heading>
        </Stack>
        <Center w="100%">
          <Heading size={'xs'}>Copyright 2022</Heading>
        </Center>
      </Stack>
    </Box>
  );
};
