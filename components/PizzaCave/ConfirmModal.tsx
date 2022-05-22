import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  useDisclosure,
  Center,
  Text,
  Flex,
} from '@chakra-ui/react';

export const ConfirmModal = ({
  isOpen,
  setIsOpen,
  handleProceed,
}: {
  isOpen: boolean;
  setIsOpen;
  handleProceed;
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
            <Text textAlign={'center'} fontSize={'2xl'}>{`Are You Sure?`}</Text>
          </Center>
          <Center mt={8}>
            <Flex>
              <Button
                backgroundColor={'cheese.200'}
                color="gray.dark"
                mr={3}
                onClick={handleProceed}
              >
                Proceed
              </Button>
              <Button
                backgroundColor={'white'}
                color="gray.dark"
                mr={3}
                onClick={handleOnClose}
              >
                Close
              </Button>
            </Flex>
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};
