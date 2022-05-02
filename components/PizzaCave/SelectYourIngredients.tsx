import { Box, Text, Stack, Button, Flex } from '@chakra-ui/react';

export const SelectYourIngredients = () => {
  return (
    <Box>
      <Stack>
        <Flex>
          <Text color="gray.dark" fontWeight={700} fontSize={'xl'}>
            Select your Ingredients
          </Text>
          <Button className="tomato-btn">Quick Start</Button>
        </Flex>
        <Text color="tomato.500" fontWeight={900} fontSize={'xl'}>
          Bases
        </Text>
      </Stack>
    </Box>
  );
};
