import {
  Box,
  Text,
  Stack,
  Button,
  Flex,
  Heading,
  Grid,
  Link,
} from '@chakra-ui/react';
import { colors } from '../../styles/theme';
import { Pizza } from '../../types';
import { FaCube, FaEthereum, FaLink } from 'react-icons/fa';
import { getNetworkConfig } from '../../utils/network';
import { parsePrice } from '../../utils/general';
import { CSSProperties } from 'react';

const PizzaImage: React.FC<{ img: string; style?: CSSProperties }> = ({
  img,
  style,
}) => (
  <Box
    style={{
      ...{
        width: '100%',
        maxWidth: '150px',
        position: 'absolute',
        backgroundImage: `url(${img})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      },
      ...style,
    }}
    _after={{
      content: '" "',
      display: 'block',
      paddingBottom: '100%',
    }}
  />
);
interface Props {
  selectPizza?: (pizza: Pizza) => void;
  pizzas: Pizza[];
  selectedPizza?: Pizza;
  hideTitle?: boolean;
  useIngredientsForImage?: boolean;
  columns?: number;
  showPayout?: boolean;
  showOwner?: boolean;
  style?: CSSProperties;
}
export const SelectYourPizza = ({
  selectPizza,
  pizzas,
  selectedPizza,
  hideTitle,
  useIngredientsForImage = false,
  columns = 1,
  showPayout = false,
  showOwner = false,
  style,
}: Props) => {
  return (
    <Box style={{ marginTop: 20, padding: 10, ...style }}>
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
                <Flex>
                  <Stack
                    gap={3}
                    style={{
                      width: '35%',
                      maxWidth: 150,
                      marginLeft: 10,
                      marginTop: 10,
                    }}
                  >
                    {!useIngredientsForImage ? (
                      <PizzaImage img={pizza.image} />
                    ) : (
                      <Box width="100%" position="relative">
                        <img
                          src="https://lazlos-pizza.s3.amazonaws.com/pizza_layers/table_cloth.png"
                          alt="tablecloth"
                          style={{
                            width: '100%',
                          }}
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
                          <PizzaImage
                            key={item.tokenId}
                            img={`https://lazlos-pizza.s3.amazonaws.com/pizza_layers/${item.tokenId}.png`}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                            }}
                          />
                        ))}
                      </Box>
                    )}

                    {showPayout ? (
                      <Stack gap={1} fontFamily={'heading'} fontSize="10">
                        {pizza.payout ? (
                          <>
                            <Stack direction="row" alignItems="center">
                              <FaCube fontSize="14" />{' '}
                              <Text>{pizza.payout.block}</Text>
                            </Stack>
                            {pizza.payout.hasBeenPaid !== undefined && (
                              <Text
                                color={
                                  pizza.payout.hasBeenPaid
                                    ? 'green.500'
                                    : undefined
                                }
                                textTransform="uppercase"
                              >
                                {pizza.payout.hasBeenPaid
                                  ? 'Claimed'
                                  : 'Unclaimed'}
                              </Text>
                            )}
                            <Stack direction="row" alignItems="center">
                              <FaEthereum fontSize="14" />{' '}
                              <Text>
                                {parsePrice(
                                  Number(pizza.payout.payout_amount.toFixed(3)),
                                  3,
                                  false,
                                )}
                              </Text>
                            </Stack>
                          </>
                        ) : null}
                      </Stack>
                    ) : null}
                  </Stack>
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
                {pizza.owner && showOwner ? (
                  <Link
                    target="_blank"
                    display="block"
                    position="absolute"
                    left="10px"
                    top="5px"
                    marginLeft="10px"
                    href={`${getNetworkConfig().openSeaBaseUrl}/${pizza.owner}`}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      fontSize="9"
                      fontFamily={'heading'}
                    >
                      <Text textDecoration="underline">{pizza.owner}</Text>
                    </Stack>
                  </Link>
                ) : null}
              </Box>
            );
          })}
        </Grid>
      </Stack>
    </Box>
  );
};
