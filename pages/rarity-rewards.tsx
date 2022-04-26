import { Box, Heading, Stack, Text } from '@chakra-ui/react';

export default function RarityRewards() {
  return (
    <Box p="20px" w="full">
      <Heading fontFamily="Lato" size="lg" color="tomato.500">
        Rarity Rewards
      </Heading>

      <Stack my="20px">
        <Text color="gray.dark">
          Rarity Rewards are awarded to the holder of the pizza with the lowest
          Rarity Score at a random Rewards Snapshot that takes place once in
          each Rewards Cycle. A Rewards Cycle is between 9,000-10,000 blocks on
          the Ethereum blockchain. A new Rewards Cycle starts one block after a
          Rewards Snapshot has occurred. The Rarity Reward Recipient (holder of
          rarest pizza) is then able to claim a reward paid in ETH equal to 1%
          of the Rewards balance* held in the smart contract at the time of the
          snapshot.
        </Text>
        <Text color="gray.dark">
          (*The Rewards balance is the total ETH balance held in the smart
          contract minus any unclaimed rewards and developer allowances.)
        </Text>
      </Stack>
    </Box>
  );
}
