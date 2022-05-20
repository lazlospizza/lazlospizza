import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
import { RADOM_BAKE_FEE, REBAKE_FEE } from '../../constants';

export const RandomBake = () => {
  const handleRandomBake = () => {
    // do something
  };

  return (
    <Stack>
      <Stack m="10px">
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          Random Bake
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Can’t decide what you want? Is oke, we have you covered! Get a completed pizza NFT with a random selection of ingredients. (${REBAKE_FEE} ETH + gas)`}
        </Text>
      </Stack>

      {/* Image and Button */}
      <Box
        p="40px"
        backgroundColor="background.dark"
        borderTop="2px"
        borderColor={'gray.light'}
      >
        <Stack>
          {/* Image */}
          <Center
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src="/assets/tablecloth.svg" alt="tablecloth" />
          </Center>
          {/* Button */}
          <Center>
            <Button
              className="tomato-btn"
              w="100%"
              maxW={'600'}
              mt="16"
              onClick={handleRandomBake}
            >{`Random Bake at ${RADOM_BAKE_FEE}`}</Button>
          </Center>
        </Stack>
      </Box>
    </Stack>
  );
};
