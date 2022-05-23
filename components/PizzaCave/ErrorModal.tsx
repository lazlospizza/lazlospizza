import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
  Center,
  Text,
} from '@chakra-ui/react';

export const ErrorModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen;
}) => {
  const { onClose } = useDisclosure();

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={'tomato.500'} p={12}>
          <Center>
            <Text
              textAlign={'center'}
              fontSize={'2xl'}
            >{`Something's Gone Wrong`}</Text>
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
