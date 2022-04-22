import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useWallet } from '../hooks/useWallet';

export const ConnectWalletButton = () => {
  const toast = useToast();
  const { connect, disconnect, error, clearError, loading, address } =
    useWallet();

  console.log(loading);

  useEffect(() => {
    if (!!error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
        onCloseComplete: () => clearError(),
      });
    }
  }, [clearError, error, toast]);

  if (address) {
    return (
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              size="md"
              colorScheme="bellpepper"
              isLoading={loading}
              rightIcon={<ChevronDownIcon />}
            >
              {address &&
                `${address.slice(0, 5)}...${address.slice(
                  address.length - 4,
                  address.length,
                )}`}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={disconnect}>Disconnect</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    );
  }

  return (
    <Button
      size="md"
      onClick={connect}
      colorScheme="bellpepper"
      isLoading={loading}
    >
      Connect Wallet
    </Button>
  );
};
