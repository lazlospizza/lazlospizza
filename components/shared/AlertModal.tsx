import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useInterval,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const Loader: React.FC = () => {
  const [colors, setColors] = useState(['#CC4443', 'rgba(0,0,0,0)']);
  const [progress, setProgress] = useState(0);
  useInterval(() => {
    setProgress(progress + 1 > 100 ? 0 : progress + 1);
    if (progress + 1 > 100) {
      setColors([colors[1], colors[0]]);
    }
  }, 100);
  return (
    <Box
      sx={{
        padding: 0,
        margin: 0,
        width: '200px',
        height: '200px',
        position: 'relative',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      <img
        src={'/assets/pizza-loading.png'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
        alt="pizza-loading"
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200px',
          height: '200px',
          background: `conic-gradient(${colors[0]} 0% ${progress}%, ${colors[1]} ${progress}% 100%)`,
          display: 'inline-block',
          transition: 'background 0.1s',
          zIndex: 20,
        }}
      />
    </Box>
  );
};

export const AlertModal: React.FC<{
  message?: string;
  showLoader?: boolean;
  hideClose?: boolean;
  isOpen: boolean;
  onRequestClose?: () => void;
}> = ({ message, isOpen, onRequestClose, hideClose, showLoader }) => {
  return (
    <Modal isOpen={isOpen} onClose={onRequestClose} colorScheme="red">
      <ModalOverlay />
      <ModalContent backgroundColor={'#CC4443'}>
        <ModalBody>
          <Stack alignItems="center" py="12" px="8">
            {showLoader ? <Loader /> : null}
            {message ? (
              <Text fontSize="3xl" fontWeight="black" textAlign="center" pb="4">
                {message}
              </Text>
            ) : null}
            {hideClose ? null : (
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
            )}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
