import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Heading, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { headerHeight } from '../styles/theme';
import { useIsMobile } from '../utils/general';
import { ConnectWalletButton } from './ConnectWalletButton';
import { HeaderMenu } from './shared/HeaderMenu';

export const Header = () => {
  const router = useRouter();
  const ref = useRef(null);
  const { isConnected } = useWallet();
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // handle closing mobile drop menu
  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const MobileMenu = () => {
    return (
      <Box
        position="absolute"
        right={0}
        top={120}
        zIndex={1000}
        p="16px"
        w="80%"
        maxW="300px"
        mt={0}
        backgroundColor={'background.brown'}
      >
        <HeaderMenu
          direction="column"
          pathname={router.pathname}
          isWalletConnected={isConnected}
        />
      </Box>
    );
  };

  const DesktopMenu = () => {
    return (
      <HeaderMenu
        direction="row"
        pathname={router.pathname}
        isWalletConnected={isConnected}
      />
    );
  };

  return (
    <Stack spacing={0}>
      <Box className="header">
        <Link href="/">
          <a>
            <img
              style={{
                height: isMobile ? headerHeight.mobile : headerHeight.desktop,
              }}
              src="/assets/logo.png"
              className="logo"
              alt="Logo"
            />
          </a>
        </Link>
        <Box className="header-content">
          <Stack direction="column" justifyContent="center">
            <Heading
              style={
                isMobile ? { fontSize: '20px' } : { letterSpacing: '10px' }
              }
            >
              {"Lazlo's Pizza"}
            </Heading>
            {/* Menu Desktop */}
            {!isMobile && <DesktopMenu />}
          </Stack>
          {isMobile ? (
            <HamburgerIcon
              ref={ref}
              onClick={() => {
                setShowMobileMenu(prev => !prev);
              }}
              color="cheese.200"
              h="100%"
              w="auto"
              maxW="60px"
            />
          ) : (
            <ConnectWalletButton />
          )}
        </Box>
        {isMobile && showMobileMenu && <MobileMenu />}
      </Box>
      <div
        style={{
          height: isMobile ? headerHeight.mobile : headerHeight.desktop,
        }}
      />
    </Stack>
  );
};
