import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { PromoHeader } from '../components/PromoHeader';

const collections = [];

export default function Home() {
  const router = useRouter();

  return (
    <Box p="20px" w="full">
      <Stack spacing="20px">
        <PromoHeader></PromoHeader>
        <Heading fontFamily="Lato" size="lg" color="tomato.500">
          Get Started
        </Heading>

        {/* First card */}
        <Box
          className="card"
          padding="20px"
          backgroundColor="cheese.200"
          borderWidth="1px"
          borderColor="tomato.500"
        >
          <Stack direction="row">
            <Center w="250px">
              <img
                src="/assets/pizza.svg"
                alt="pizza"
                width="250px"
                height="250px"
              />
            </Center>
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              padding="20px"
            >
              <Stack spacing="20px" mb={10}>
                <Heading color="gray.dark" fontSize={28}>
                  Buy Ingredients and Bake a Pizza
                </Heading>
                <Text fontFamily="Lato" color="gray.dark" fontSize={22}>
                  Select your hand-crafted ingredients freshy prepared by our
                  pixel artists.
                </Text>
              </Stack>
              <Flex flexDirection="row">
                <Button backgroundColor="tomato.500" size="lg">
                  {"Head to Laszlo's Pizza Cave"}
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </Box>

        {/* Second card */}
        <Box className="card" backgroundColor="tomato.500">
          <Flex flexDirection="row" justifyContent="space-between">
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              padding="40px"
              minH="250px"
            >
              <Stack spacing="20px" mb={10}>
                <Heading color="cheese.200" fontSize={28}>
                  Check Rarity Rewards
                </Heading>
                <Text fontFamily="Lato" color="white" fontSize={22}>
                  Find out more about Rarity Rewards
                </Text>
              </Stack>
              <Flex flexDirection="row">
                <Button colorScheme="cheese" size="lg">
                  Rarity Rewards
                </Button>
              </Flex>
            </Flex>
            <img src="/assets/double-pizza.svg" alt="pizza" height="100%" />
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
}
