/* eslint-disable jsx-a11y/alt-text */
import { Box, Center, Heading, Stack } from '@chakra-ui/react';
import { IngredientsRain } from './IngredientsRain';

export const PromoHeader = () => {
  return (
    <Box
      w="full"
      h="310px"
      display={'flex'}
      alignItems="center"
      justifyContent={'center'}
      position={'relative'}
      bgColor="orange.100"
    >
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
      <IngredientsRain />
    </Box>
  );
};
