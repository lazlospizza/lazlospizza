import { Box, Button, Center, Flex, Heading, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { PromoHeader } from '../components/PromoHeader';

const collections = [];

export default function Home() {
  const router = useRouter();

  return (
    <Box p={'20px'} w="full">
      <Stack spacing={'20px'}>
        <PromoHeader></PromoHeader>
        <Heading fontFamily={'Lato'} size={'lg'} color={'tomato.500'}>
          Get Started
        </Heading>

        {/* First card */}
        <Box className="card" padding="20px" backgroundColor="bellpepper.200">
          <Flex justifyContent="space-between">
            <Center w="250px">
              <img src="/assets/pizza.svg" alt="pizza" />
            </Center>

            <Stack spacing={'20px'}>
              <Heading size={'sm'} color="gray.dark">
                Buy Ingredients and Bake a Pizza
              </Heading>
              <Heading fontFamily={'Lato'} size={'md'} color="gray.dark">
                Select your hand-crafted ingredients freshy prepared by our
                pixel artists.
              </Heading>
              <Button backgroundColor={'tomato.500'}>
                Head to Laszlo’s Pizza Cave
              </Button>
            </Stack>
          </Flex>
        </Box>

        {/* Second card */}
        <Box className="card" backgroundColor="tomato.500">
          <Flex justifyContent="space-between">
            <Stack padding="20px" spacing={'20px'}>
              <Heading size={'sm'} color="bellpepper.200">
                Check Rarity Rewards
              </Heading>
              <Heading fontFamily={'Lato'} size={'md'} color="gray.dark">
                Find out more about Rarity Rewards
              </Heading>
              <Button backgroundColor={'bellpepper.200'}>Rarity Rewards</Button>
            </Stack>
            <Center w="250px">
              <img src="/assets/double-pizza.svg" alt="pizza" />
            </Center>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
}
