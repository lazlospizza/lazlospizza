import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
  Center,
  Text,
  Stack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { useWallet } from '../../hooks/useWallet';

export const SuccessModal = ({
  isOpen,
  setIsOpen,
  pizzaTokenId,
}: {
  isOpen: boolean;
  setIsOpen: (show: boolean) => void;
  pizzaTokenId?: number;
}) => {
  const { myPizzas } = useWallet();
  const { onClose } = useDisclosure();

  const handleOnClose = () => {
    setIsOpen(false);
  };

  const mintedPizza = useMemo(
    () => myPizzas.find(p => p.tokenId === pizzaTokenId),
    [myPizzas, pizzaTokenId],
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={'tomato.500'} p={12}>
          <Center>
            <Text
              textAlign={'center'}
              color={'cheese.200'}
              fontSize={'2xl'}
            >{`Transaction Complete`}</Text>
          </Center>
          <Center mt={8}>
            {!!mintedPizza && (
              <img
                alt="Pizza"
                // NOTE: added hash to invalidate cache
                src={`${mintedPizza.image}?hash=${Math.round(
                  Math.random() * 1e10,
                )}`}
                style={{ width: '100%' }}
              />
            )}
          </Center>
          <Stack direction="row" justifyContent="center" mt={8}>
            <Center>
              <TwitterShareButton
                url={mintedPizza?.image}
                title="Look what I made @LazlosPizza. Bet you can't beat my score and win the $ETH rewards, anon!"
                hashtags={['BitcoinPizzaDay', 'NFTCommunity', 'LazlosPizza']}
              >
                <Button backgroundColor="cheese.200">
                  <TwitterIcon
                    size={32}
                    round={true}
                    iconFillColor="#00acee"
                    bgStyle={{ fill: 'rgba(0,0,0,0)' }}
                  />
                  <Text color="gray.dark">Share on Twitter!</Text>
                </Button>
              </TwitterShareButton>
            </Center>
            <Center>
              <Button
                backgroundColor={'white'}
                color="gray.dark"
                mr={3}
                onClick={handleOnClose}
              >
                Close
              </Button>
            </Center>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
};
