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
              backgroundColor="cheese.200"
              borderWidth={2}
              borderColor="cheese.200"
              fontWeight="900"
              color="gray.800"
              _hover={{
                textDecoration: 'none',
                backgroundColor: 'tomato.500',
                borderColor: 'cheese.200',
                color: 'cheese.200',
              }}
              size="lg"
              isActive={isOpen}
              as={Button}
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
      backgroundColor="cheese.200"
      borderWidth={2}
      borderColor="cheese.200"
      fontWeight="900"
      color="gray.800"
      _hover={{
        textDecoration: 'none',
        backgroundColor: 'tomato.500',
        borderColor: 'cheese.200',
        color: 'cheese.200',
      }}
      size="lg"
      onClick={connect}
      isLoading={loading}
    >
      Connect Wallet
    </Button>
  );
};
