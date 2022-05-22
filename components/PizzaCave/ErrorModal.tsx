import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
  Center,
  Text,
} from '@chakra-ui/react';

export const ErrorModal = ({ isOpen }: { isOpen: boolean }) => {
  const { onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor={'tomato.500'} p={8}>
          <Center>
            <Text fontSize={'2xl'}>{`Something's Gone Wrong`}</Text>
          </Center>
          <Center mt={8}>
            <Button
              backgroundColor={'white'}
              color="gray.dark"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};
