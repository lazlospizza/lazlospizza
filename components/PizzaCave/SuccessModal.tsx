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
    [myPizzas],
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
              <img src={mintedPizza.image} style={{ width: '100%' }} />
            )}
          </Center>
          <Center mt={8}>
            <TwitterShareButton
              url={mintedPizza?.image}
              title="Look what I made @LazlosPizza. Bet you can't beat my score and win the $ETH rewards, anon!"
              hashtags={['BitcoinPizzaDay', 'NFTCommunity', 'LazlosPizza']}
            >
              <Stack spacing={4} direction="row" alignItems="center">
                <Text color="white">Share on Twitter!</Text>
                <TwitterIcon size={32} round={true} />
              </Stack>
            </TwitterShareButton>
          </Center>
          <Center mt={8}>
            <Button
              backgroundColor={'white'}
              color="gray.dark"
              mr={3}
              onClick={handleOnClose}
            >
              Close
            </Button>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};
