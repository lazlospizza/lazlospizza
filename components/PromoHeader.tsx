/* eslint-disable jsx-a11y/alt-text */
import { Box, Center, Heading, Stack } from '@chakra-ui/react';

export const PromoHeader = () => {
  return (
    <Box
      w="full"
      h="310px"
      display={'flex'}
      alignItems="center"
      justifyContent={'center'}
      position={'relative'}
    >
      {/* <Box py="100px"> */}
      <Stack zIndex={1} spacing={10}>
        <Center>
          <Heading textAlign={'center'} color={'tomato.500'}>
            {'Bake the RAREST Pizza'}
          </Heading>
        </Center>
        <Center>
          <Heading textAlign={'center'} color={'gray.dark'}>
            {'To get Rarity Rewards'}
          </Heading>
        </Center>
      </Stack>

      <img
        style={{
          zIndex: 0,
          maxHeight: '500px',
          maxWidth: '100%',
          position: 'fixed',
          left: -100,
        }}
        src="../assets/jalapenos.svg"
        height={500}
      />
      <img
        style={{
          zIndex: 0,
          maxHeight: '500px',
          maxWidth: '100%',
          position: 'fixed',
          left: '30%',
        }}
        src="../assets/mushrooms.svg"
      />
      <img
        style={{
          zIndex: 0,
          maxHeight: '500px',
          maxWidth: '100%',
          position: 'fixed',
          right: 0,
        }}
        src="../assets/peppers.svg"
      />
    </Box>
  );
};
