import { Box, Center, Heading, Stack } from '@chakra-ui/react';

export const PromoHeader = () => {
  return (
    <Box
      w="full"
      h="130px"
      display={'flex'}
      alignItems="center"
      justifyContent={'center'}
    >
      {/* <Box py="100px"> */}
      <Stack spacing={10}>
        <Center>
          <Heading size={'md'} color={'tomato.500'}>
            {'Bake the RAREST Pizza'}
          </Heading>
        </Center>
        <Center>
          <Heading size={'md'} color={'gray.dark'}>
            {'To get Rarity Rewards'}
          </Heading>
        </Center>
      </Stack>
    </Box>
  );
};
