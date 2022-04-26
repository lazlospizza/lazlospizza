import { Stack, Text } from '@chakra-ui/react';
import { BAKING_FEE } from '../../constants';

export const BuyAndBake = () => {
  return (
    <Stack m="20px">
      <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
        Bake a Pizza
      </Text>
      <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
        {`Bake a pizzza with ingredients you already have in your wallet. ${BAKING_FEE}ETH
        Baking fee.`}
      </Text>
    </Stack>
  );
};
