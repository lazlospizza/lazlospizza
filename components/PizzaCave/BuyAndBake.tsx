import { Box, Divider, Stack, Text } from '@chakra-ui/react';
import { BAKING_FEE, INGREDIENT_COST } from '../../constants';
import { SelectYourIngredients } from './SelectYourIngredients';

export const BuyAndBake = () => {
  return (
    <Box>
      <Stack m="10px">
        <Text color="tomato.500" fontWeight={700} fontSize={'xl'}>
          Buy Ingredients and Bake a Pizza
        </Text>
        <Text color="gray.dark" fontWeight={500} fontSize={'lg'}>
          {`Select from a delightful selection of hand-crafted ingredients freshly prepared by our pixel artistes. You can buy now and bake later, or buy and bake in one transaction. (${INGREDIENT_COST} ETH per ingredient + ${BAKING_FEE}ETH Baking fee.)`}
        </Text>
      </Stack>
      <Divider />
      <SelectYourIngredients />
    </Box>
  );
};
