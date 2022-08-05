import React, { CSSProperties, useState } from 'react';
import { Pizza } from '../../types';
import {
  Box,
  Text,
  Stack,
  Button,
  Flex,
  Link,
  Modal,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Heading,
} from '@chakra-ui/react';
import { colors } from '../../styles/theme';
import { FaCube, FaEthereum } from 'react-icons/fa';
import { getNetworkConfig } from '../../utils/network';
import { parsePrice } from '../../utils/general';

const PizzaModal: React.FC<{
  pizza: Pizza;
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose, pizza }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent backgroundColor={'tomato.500'}>
        <ModalCloseButton />
        <ModalHeader>
          <Heading fontSize="18px" py={2}>
            Pizza Information
          </Heading>
        </ModalHeader>
        <Tabs color={'primary'} mt={4}>
          <TabList borderBottom="none" px={5}>
            {['Pizza', 'Ingredients'].map(item => (
              <Tab
                key={item}
                fontSize="20px"
                sx={{
                  fontWeight: 'bold',
                  [`&[aria-selected=true]`]: {
                    color: 'tomato.500',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                  },
                }}
              >
                {item}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <PizzaItem pizza={pizza} modalMode />
            </TabPanel>
            <TabPanel>
              <Stack spacing={4} px={3} mt={3}>
                {pizza?.allIngredients.map(ingredient => (
                  <Stack
                    direction="row"
                    key={ingredient.tokenId}
                    justifyContent="space-between"
                  >
                    <Heading size={'sm'} color="white">
                      {ingredient.name}
                    </Heading>
                    <Heading size={'sm'} color="white">
                      {ingredient.rarity?.toFixed(2)}%
                    </Heading>
                  </Stack>
                ))}
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  );
};

const PizzaImage: React.FC<{
  img: string;
  style?: CSSProperties;
  onClick?: () => void;
}> = ({ img, style, onClick }) => (
  <Box
    onClick={onClick}
    cursor="pointer"
    style={{
      ...{
        width: '100%',
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

export const PizzaItem: React.FC<{
  pizza: Pizza;
  selected?: boolean;
  showOwner?: boolean;
  useIngredientsForImage?: boolean;
  onSelect?: (pizza: Pizza) => void;
  showPayout?: boolean;
  modalMode?: boolean;
}> = ({
  pizza,
  selected,
  showOwner,
  useIngredientsForImage,
  onSelect,
  showPayout,
  modalMode,
}) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  return (
    <>
      <Box
        className="artist-card"
        backgroundColor={selected ? colors.cheese[150] : 'white'}
        p="2"
        position="relative"
        overflow="hidden"
        onClick={modalMode ? undefined : setIsModalOpened.bind(null, true)}
      >
        <Stack
          gap={3}
          style={{
            width: '100%',
          }}
        >
          <Box
            width="100%"
            position="relative"
            _after={{ content: '" "', paddingBottom: '100%', display: 'block' }}
          >
            {!useIngredientsForImage ? (
              <PizzaImage img={pizza.image} />
            ) : (
              <Box position="absolute" width="100%">
                <img
                  src="https://lazlos-pizza.s3.amazonaws.com/pizza_layers/table_cloth.png"
                  alt="tablecloth"
                  style={{
                    width: '100%',
                  }}
                />
                <Box position="absolute" top="5%" left="5%" width="90%">
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
                        top: 0,
                        left: 0,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          {showPayout ? (
            <Stack gap={1} fontFamily={'heading'} fontSize="10">
              {pizza.payout ? (
                <>
                  <Stack direction="row" alignItems="center">
                    <FaCube fontSize="14" /> <Text>{pizza.payout.block}</Text>
                  </Stack>
                  <Text
                    color={pizza.payout.hasBeenPaid ? 'green.500' : undefined}
                    textTransform="uppercase"
                  >
                    {pizza.payout.hasBeenPaid ? 'Claimed' : 'Unclaimed'}
                  </Text>
                  <Stack direction="row" alignItems="center">
                    <FaEthereum fontSize="14" />{' '}
                    {pizza.payout.payout_amount && (
                      <Text>
                        {parsePrice(
                          Number(
                            (
                              pizza.payout.payout_amount / 1000000000000000000
                            ).toFixed(3),
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
        {/* <Flex width={'100%'} justifyContent={'space-between'}> */}
        {/* Name and Cost */}
        {/* <Flex direction={'column'} px="8" py="3">
            <Stack spacing={3}>
              {pizza?.allIngredients.map(ingredient => (
                <Heading key={ingredient.tokenId} size={'sm'} color="gray.dark">
                  {ingredient.name} - {ingredient.rarity?.toFixed(2)}%
                </Heading>
              ))}
            </Stack>
          </Flex> */}
        {/* </Flex> */}

        {!!onSelect && (
          <Flex direction={'column'} justifyContent={'flex-end'} py="2">
            <Button
              className="tomato-btn"
              onClick={e => {
                e.stopPropagation();
                onSelect(pizza);
              }}
              disabled={selected}
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
            top="-2px"
            right="-2px"
            py="2"
            px="4"
            fontSize="lg"
          >
            {pizza.rarity.toFixed(3)}
          </Text>
        )}
        {pizza.owner && showOwner ? (
          <Link
            target="_blank"
            display="block"
            position="absolute"
            right="10px"
            bottom="10px"
            marginLeft="10px"
            href={`${getNetworkConfig().openSeaBaseUrl}/${pizza.owner}`}
          >
            <Stack
              direction="row"
              alignItems="center"
              fontSize="9"
              fontFamily={'heading'}
            >
              <Text textDecoration="underline">{pizza.owner?.slice(0, 6)}</Text>
            </Stack>
          </Link>
        ) : null}
      </Box>
      <PizzaModal
        pizza={pizza}
        isOpen={isModalOpened}
        onClose={setIsModalOpened.bind(null, false)}
      />
    </>
  );
};
