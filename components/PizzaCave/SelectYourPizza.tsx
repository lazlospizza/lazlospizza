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
import { FaCube, FaEthereum } from 'react-icons/fa';
import { getNetworkConfig } from '../../utils/network';
import { parsePrice } from '../../utils/general';
import { CSSProperties, useMemo, useState } from 'react';
import { orderBy } from 'lodash';
import { useWallet } from '../../hooks/useWallet';
import MultiSelectMenu from '../MultiSelect/MultiSelect';
import Lightbox from 'react-image-lightbox';

enum PizzaOrder {
  rarityAsc = 'Rarity (asc)',
  rarityDesc = 'Rarity (desc)',
  tokenIdAsc = 'Token ID (asc)',
  tokenIdDesc = 'Token ID (desc)',
  creationDateAsc = 'Creation Date (asc)',
  creationDateDesc = 'Creation Date (desc)',
}
const orderList = [
  PizzaOrder.rarityAsc,
  PizzaOrder.rarityDesc,
  PizzaOrder.tokenIdAsc,
  PizzaOrder.tokenIdDesc,
  PizzaOrder.creationDateAsc,
  PizzaOrder.creationDateDesc,
];

const PizzaImage: React.FC<{
  img: string;
  style?: CSSProperties;
  onClick?: () => void;
}> = ({ img, style, onClick }) => (
  <Box
    onClick={onClick}
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
  showOptions?: boolean;
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
  showOptions = false,
  style,
}: Props) => {
  const [lightBoxImage, setLightBoxImage] = useState<string>();
  const [order, setOrder] = useState<PizzaOrder>(PizzaOrder.rarityDesc);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const { ingredientGroups } = useWallet();
  const allIngredientOptions = useMemo(
    () =>
      [
        ...ingredientGroups[0].ingredients,
        ...ingredientGroups[1].ingredients,
        ...ingredientGroups[2].ingredients,
        ...ingredientGroups[3].ingredients,
        ...ingredientGroups[4].ingredients,
      ].map(item => ({ value: item.tokenId.toString(), label: item.name })),
    [ingredientGroups],
  );
  const visiblePizzas = useMemo(() => {
    if (!showOptions) {
      return pizzas;
    }
    let filtered = [...pizzas];
    if (selectedIngredients && selectedIngredients.length) {
      filtered = filtered.filter(
        pizza =>
          !selectedIngredients.find(
            ingredientTokenId =>
              !pizza.allIngredients.find(
                ingredient =>
                  ingredientTokenId === ingredient.tokenId.toString(),
              ),
          ),
      );
      filtered = filtered.filter(item =>
        item.allIngredients.find(
          ingredient =>
            !!selectedIngredients.find(
              tokenId => tokenId === ingredient.tokenId.toString(),
            ),
        ),
      );
    }
    switch (order) {
      case PizzaOrder.creationDateDesc:
        return filtered.reverse();
      case PizzaOrder.creationDateAsc:
        return filtered;
      case PizzaOrder.tokenIdAsc:
        return orderBy(filtered, ['tokenId'], ['asc']);
      case PizzaOrder.tokenIdDesc:
        return orderBy(filtered, ['tokenId'], ['desc']);
      case PizzaOrder.rarityAsc:
        return orderBy(filtered, ['rarity'], ['asc']);
      case PizzaOrder.rarityDesc:
        return orderBy(filtered, ['rarity'], ['desc']);
    }
  }, [pizzas, order, selectedIngredients, showOptions]);
  return (
    <Box style={{ marginTop: 20, padding: 10, ...style }}>
      {lightBoxImage && (
        <Lightbox
          mainSrc={lightBoxImage}
          onImageLoad={() => {
            window.dispatchEvent(new Event('resize'));
          }}
          onCloseRequest={() => setLightBoxImage(null)}
        />
      )}
      <Stack>
        <Flex justify={'space-between'} alignItems="center">
          <Text color="gray.dark" fontWeight={700} fontSize={'xl'}>
            {!hideTitle && 'Your Pizzas'}
          </Text>
        </Flex>
        {pizzas.length && showOptions ? (
          <Stack direction={'row'} gap="10px">
            <MultiSelectMenu
              options={orderList.map(item => ({
                value: item,
                label: item,
              }))}
              value={order}
              label={order}
              onChange={val => {
                setOrder(val as PizzaOrder);
              }}
            ></MultiSelectMenu>
            {allIngredientOptions?.length ? (
              <MultiSelectMenu
                options={allIngredientOptions}
                value={selectedIngredients}
                multi={true}
                label={
                  selectedIngredients?.length
                    ? 'Selected Ingredients'
                    : 'All Ingredients'
                }
                onChange={val => {
                  setSelectedIngredients(val as string[]);
                }}
              ></MultiSelectMenu>
            ) : null}
          </Stack>
        ) : null}
        <Grid
          templateColumns={{ md: `repeat(${columns}, 1fr)` }}
          gap={{ md: 6 }}
          minH="500px"
        >
          {visiblePizzas.map((pizza, i) => {
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
                paddingTop={showOwner && pizza.owner ? '24px' : undefined}
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
                      <PizzaImage
                        img={pizza.image}
                        onClick={() => {
                          setLightBoxImage(pizza.image);
                        }}
                      />
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
                              {pizza.payout.payout_amount && (
                                <Text>
                                  {parsePrice(
                                    Number(
                                      pizza.payout.payout_amount.toFixed(3),
                                    ),
                                    3,
                                    false,
                                  )}
                                </Text>
                              )}
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
                            {ingredient.name} - {ingredient.rarity?.toFixed(2)}%
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
                    {pizza.rarity && (
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
                    )}
                  </Flex>
                </Flex>
                {pizza.owner && showOwner ? (
                  <Link
                    target="_blank"
                    display="block"
                    position="absolute"
                    left="10px"
                    top="10px"
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
