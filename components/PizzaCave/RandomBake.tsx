import { Stack, Text } from '@chakra-ui/react';
import { REBAKE_FEE } from '../../constants';

export const RandomBake = () => {
  return (
    <Stack m="10px">
      <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
        Random Bake
      </Text>
      <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
        {`Can’t decide what you want? Is oke, we have you covered! Get a completed pizza NFT with a random selection of ingredients. (${REBAKE_FEE} ETH + gas)`}
      </Text>
    </Stack>
  );
};
