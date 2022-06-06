import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const AlertModal: React.FC<{
  message: string;
  isOpen: boolean;
  onRequestClose: () => void;
}> = ({ message, isOpen, onRequestClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onRequestClose} colorScheme="red">
      <ModalOverlay />
      <ModalContent backgroundColor={'#CC4443'}>
        <ModalBody>
          <Stack alignItems="center" py="12" px="8">
            <Text fontSize="3xl" fontWeight="black" textAlign="center" pb="4">
              {message}
            </Text>
            <Button
              color="#3D3431"
              variant="unstyled"
              backgroundColor={'white'}
              paddingRight={4}
              paddingLeft={4}
              width="auto"
              mr={3}
              onClick={onRequestClose}
            >
              Close
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
