import {
  Box,
  Text,
  Stack,
  Button,
  Flex,
  Heading,
  Center,
} from '@chakra-ui/react';
import { colors } from '../../styles/theme';
import { Pizza, PizzaCave } from '../../types';

interface Props {
  selectPizza: (pizza: Pizza) => void;
  pizzas: Pizza[];
  selectedPizza: Pizza;
  tab: PizzaCave;
}
export const SelectYourPizza = ({
  selectPizza,
  pizzas,
  tab,
  selectedPizza,
}: Props) => {
  console.log(pizzas);
  return (
    <Box style={{ marginTop: 20, padding: 10 }}>
      <Stack>
        <Flex justify={'space-between'} alignItems="center">
          <Text color="gray.dark" fontWeight={700} fontSize={'xl'}>
            Your Pizzas
          </Text>
        </Flex>
        {pizzas.map(pizza => (
          <Box
            key={pizza.tokenId}
            className="artist-card"
            backgroundColor={
              pizza.tokenId === selectedPizza?.tokenId ? colors.cheese[150] : ''
            }
            p="2"
          >
            <Flex>
              <Center
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 150,
                  height: 150,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${pizza.image})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                  }}
                />
              </Center>
              {/* Right of Image */}
              <Flex width={'100%'} justifyContent={'space-between'}>
                {/* Name and Cost */}
                <Flex direction={'column'} px="8" py="3">
                  <Stack spacing={3}>
                    {pizza?.allIngredients.map(ingredient => (
                      <Heading
                        key={ingredient.tokenId}
                        size={'sm'}
                        color="gray.dark"
                      >
                        {ingredient.name}
                      </Heading>
                    ))}
                  </Stack>
                </Flex>
                <Flex
                  direction={'column'}
                  justifyContent={'space-between'}
                  py="2"
                >
                  <Button
                    className="tomato-btn"
                    onClick={() => selectPizza(pizza)}
                    disabled={pizza.tokenId === selectedPizza?.tokenId}
                  >
                    Select
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
