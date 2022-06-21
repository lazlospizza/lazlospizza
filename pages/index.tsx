import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';
import { PromoHeader } from '../components/PromoHeader';
import { useGetWindowSize } from '../utils/general';

export default function Home() {
  const size = useGetWindowSize();

  const firstBoxMobile = () => {
    return (
      <Box
        className="card"
        padding="20px"
        backgroundColor="cheese.200"
        borderWidth="1px"
        borderColor="tomato.500"
      >
        <Stack>
          <Flex direction="row">
            <Center minW="100px">
              <img
                src="/assets/pizza.svg"
                alt="pizza"
                width="200px"
                height="200px"
              />
            </Center>
            {/* Text */}
            <Stack spacing="20px" mb={10}>
              <Heading color="gray.dark" fontSize={16}>
                Buy Ingredients and Bake a Pizza
              </Heading>
              <Text fontFamily="Lato" color="gray.dark" fontSize={18}>
                Select your hand-crafted ingredients freshy prepared by our
                pixel artists.
              </Text>
            </Stack>
          </Flex>
          {/* Button */}
          <Center>
            <Link
              href="/pizza-cave"
              _hover={{
                textDecoration: 'none',
                color: 'tomato.500',
              }}
            >
              <Button
                backgroundColor="tomato.500"
                borderWidth={2}
                borderColor="tomato.500"
                fontWeight="900"
                _hover={{
                  textDecoration: 'none',
                  backgroundColor: 'cheese.200',
                  borderColor: 'tomato.500',
                  color: 'tomato.500',
                }}
                size="lg"
              >
                {"Head to Lazlo's Pizza Cave"}
              </Button>
            </Link>
          </Center>
        </Stack>
      </Box>
    );
  };

  const firstBoxDesktop = () => {
    return (
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
              <Link
                href="/pizza-cave"
                _hover={{
                  textDecoration: 'none',
                  color: 'tomato.500',
                }}
              >
                <Button
                  backgroundColor="tomato.500"
                  borderWidth={2}
                  borderColor="tomato.500"
                  fontWeight="900"
                  _hover={{
                    textDecoration: 'none',
                    backgroundColor: 'cheese.200',
                    borderColor: 'tomato.500',
                    color: 'tomato.500',
                  }}
                  size="lg"
                >
                  {"Head to Lazlo's Pizza Cave"}
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Stack>
      </Box>
    );
  };

  const secondBox = () => {
    return (
      <Box className="card" backgroundColor="tomato.500">
        <Flex
          flexDirection={size < 1000 ? 'column' : 'row'}
          justifyContent="space-between"
        >
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            padding="40px"
            // minH="250px"
            maxH="300px"
          >
            {/* Text */}
            <Stack spacing="20px" mb={10}>
              <Heading color="cheese.200" fontSize={size < 530 ? 16 : 32}>
                Check Rarity Rewards
              </Heading>
              <Text
                fontFamily="Lato"
                color="white"
                fontSize={size < 530 ? 18 : 24}
              >
                Find out more about Rarity Rewards
              </Text>
            </Stack>
            <Flex flexDirection="row">
              {/* Button */}
              <Link
                href="/rarity-rewards"
                color="auto"
                _hover={{
                  textDecoration: 'none',
                  color: 'cheese.200',
                }}
              >
                <Button
                  backgroundColor="cheese.200"
                  borderWidth={2}
                  borderColor="cheese.200"
                  fontWeight="900"
                  color="gray.800"
                  _hover={{
                    textDecoration: 'none',
                    backgroundColor: 'tomato.500',
                    borderColor: 'cheese.200',
                    color: 'cheese.200',
                  }}
                  size="lg"
                >
                  Rarity Rewards
                </Button>
              </Link>
            </Flex>
          </Flex>
          <img
            src="/assets/double-pizza.svg"
            alt="pizza"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </Flex>
      </Box>
    );
  };

  return (
    <Box p="0px" w="full">
      <Stack spacing={0}>
        <PromoHeader></PromoHeader>

        <Stack
          zIndex={10}
          borderTop={'2px'}
          borderColor="background.brown"
          p="20px"
          spacing="20px"
          backgroundColor="background.light"
          marginTop={0}
        >
          <Heading fontFamily="Lato" size={'lg'} color="tomato.500">
            Get Started
          </Heading>

          {/* First card */}
          {size < 700 ? firstBoxMobile() : firstBoxDesktop()}

          {/* Second card */}
          {secondBox()}
        </Stack>
      </Stack>
    </Box>
  );
}
