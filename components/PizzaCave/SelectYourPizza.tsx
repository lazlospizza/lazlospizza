import {
  Box,
  Text,
  Stack,
  Button,
  Flex,
  Heading,
  Center,
  Grid,
  Link,
} from '@chakra-ui/react';
import { colors } from '../../styles/theme';
import { Pizza } from '../../types';
import { FaCube, FaEthereum, FaLink } from 'react-icons/fa';
import { getNetworkConfig } from '../../utils/network';
import { parsePrice } from '../../utils/general';

interface Props {
  selectPizza?: (pizza: Pizza) => void;
  pizzas: Pizza[];
  selectedPizza?: Pizza;
  hideTitle?: boolean;
  useIngredientsForImage?: boolean;
  columns?: number;
  showPayout?: boolean;
}
export const SelectYourPizza = ({
  selectPizza,
  pizzas,
  selectedPizza,
  hideTitle,
  useIngredientsForImage = false,
  columns = 1,
  showPayout = false,
}: Props) => {
  return (
    <Box style={{ marginTop: 20, padding: 10 }}>
      <Stack>
        <Flex justify={'space-between'} alignItems="center">
          <Text color="gray.dark" fontWeight={700} fontSize={'xl'}>
            {!hideTitle && 'Your Pizzas'}
          </Text>
        </Flex>
        <Grid
          templateColumns={{ md: `repeat(${columns}, 1fr)` }}
          gap={{ md: 6 }}
        >
          {pizzas.map((pizza, i) => {
            return (
              <Box
                key={`${pizza.tokenId}-${i}`}
                className="artist-card"
                backgroundColor={
                  pizza.tokenId === selectedPizza?.tokenId
                    ? colors.cheese[150]
                    : ''
                }
                p="2"
                position="relative"
                overflow="hidden"
              >
                {showPayout ? (
                  <Stack
                    direction="row"
                    gap={1}
                    alignItems="center"
                    fontFamily={'heading'}
                    fontSize="11"
                  >
                    <Text
                      color={pizza.payout ? 'green.500' : undefined}
                      textTransform="uppercase"
                    >
                      {pizza.payout ? 'Claimed' : 'Not Claimed'}
                    </Text>
                    {pizza.payout ? (
                      <>
                        <Link
                          target="_blank"
                          href={`${getNetworkConfig().openSeaBaseUrl}/${
                            pizza.owner
                          }`}
                        >
                          <Stack direction="row" alignItems="center">
                            <FaLink fontSize="14" />{' '}
                            <Text textDecoration="underline">OpenSea</Text>
                          </Stack>
                        </Link>
                        <Stack direction="row" alignItems="center">
                          <FaCube fontSize="14" />{' '}
                          <Text>{pizza.payout.block}</Text>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                          <FaEthereum fontSize="14" />{' '}
                          <Text>
                            {parsePrice(
                              Number(pizza.payout.payout_amount.toFixed(3)),
                              3,
                            )}
                          </Text>
                        </Stack>
                      </>
                    ) : null}
                  </Stack>
                ) : null}
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
                    {!useIngredientsForImage ? (
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
                    ) : (
                      <>
                        <img
                          src="https://lazlos-pizza.s3.amazonaws.com/pizza_layers/table_cloth.png"
                          alt="tablecloth"
                        />
                        {(
                          [
                            ...(pizza?.allIngredients || []),
                            ...(pizza?.additionalIngredients || []),
                          ]
                            .filter(
                              item =>
                                !(pizza.burnIngredients || []).find(
                                  burnItem => burnItem.tokenId == item.tokenId,
                                ),
                            )
                            .sort((a, b) => a.tokenId - b.tokenId) ?? []
                        ).map(item => (
                          <div
                            key={item.tokenId}
                            style={{
                              position: 'absolute',
                              width: '83.5%',
                              height: '83.5%',
                              backgroundImage: `url(https://lazlos-pizza.s3.amazonaws.com/pizza_layers/${item.tokenId}.png)`,
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center center',
                            }}
                          />
                        ))}
                      </>
                    )}
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
                            {ingredient.name} - {ingredient.rarity.toFixed(2)}%
                          </Heading>
                        ))}
                      </Stack>
                    </Flex>

                    {!!selectPizza && (
                      <Flex
                        direction={'column'}
                        justifyContent={'flex-end'}
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
                    )}
                    <Text
                      color="white"
                      bg="tomato.500"
                      fontWeight="bold"
                      position="absolute"
                      top={0}
                      right={0}
                      py="2"
                      px="4"
                      fontSize="lg"
                    >
                      {pizza.rarity.toFixed(3)}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            );
          })}
        </Grid>
      </Stack>
    </Box>
  );
};
