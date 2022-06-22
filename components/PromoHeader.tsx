/* eslint-disable jsx-a11y/alt-text */
import { Box, Center, Heading, Stack } from '@chakra-ui/react';

export const PromoHeader = () => {
  const pizzaLayers = [21, 15, 13, 23, 14, 25];
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
          <Heading
            bgColor={'whiteAlpha.800'}
            px={5}
            borderRadius={10}
            textAlign={'center'}
            color={'tomato.500'}
          >
            {'Bake the RAREST Pizza'}
          </Heading>
        </Center>
        <Center>
          <Heading
            textAlign={'center'}
            color={'gray.dark'}
            bgColor={'whiteAlpha.800'}
            px={5}
            borderRadius={10}
          >
            {'To get Rarity Rewards'}
          </Heading>
        </Center>
      </Stack>
      {pizzaLayers.map((item, idx) => (
        <img
          key={idx}
          alt="layer"
          style={{
            zIndex: 0,
            maxHeight: '500px',
            maxWidth: '100%',
            position: 'fixed',
            left: [0, 1].includes(idx)
              ? -100
              : [2, 3].includes(idx)
              ? '30%'
              : undefined,
            right: [4, 5].includes(idx) ? 0 : undefined,
            opacity: 0.6,
          }}
          src={`../assets/layers/${item}.png`}
          height={500}
        />
      ))}
      {/* <img
        alt="layer"
        style={{
          zIndex: 0,
          maxHeight: '500px',
          maxWidth: '100%',
          position: 'fixed',
          left: -100,
          opacity: 0.8,
        }}
        src={`../assets/layers/10.png`}
        height={500}
      />
      <img
        alt="layer"
        style={{
          zIndex: 0,
          maxHeight: '500px',
          maxWidth: '100%',
          position: 'fixed',
          left: -100,
          opacity: 0.8,
        }}
        src={`../assets/layers/11.png`}
        height={500}
      />
      <img
        alt="layer"
        style={{
          zIndex: 0,
          maxHeight: '500px',
          maxWidth: '100%',
          position: 'fixed',
          left: '30%',
          opacity: 0.8,
        }}
        src={`../assets/layers/12.png`}
      />
      <img
        alt="layer"
        style={{
          zIndex: 0,
          maxHeight: '500px',
          maxWidth: '100%',
          position: 'fixed',
          left: '30%',
          opacity: 0.8,
        }}
        src={`../assets/layers/15.png`}
      />
      <img
        alt="layer"
        style={{
          zIndex: 0,
          maxHeight: '500px',
          maxWidth: '100%',
          position: 'fixed',
          right: 0,
          opacity: 0.8,
        }}
        src={`../assets/layers/13.png`}
      />
      <img
        alt="layer"
        style={{
          zIndex: 0,
          maxHeight: '500px',
          maxWidth: '100%',
          position: 'fixed',
          right: 0,
          opacity: 0.8,
        }}
        src={`../assets/layers/18.png`}
      /> */}
    </Box>
  );
};
