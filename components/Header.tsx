import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { getIsMobile } from '../utils/general';
import { ConnectWalletButton } from './ConnectWalletButton';

export const Header = () => {
  const router = useRouter();
  const ref = useRef(null);
  const { isConnected } = useWallet();
  const isMobile = getIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const onClickOutside = () => {
    setShowMobileMenu(false);
  };

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
        zIndex={1000}
        p="16px"
        w="80%"
        maxW="300px"
        mt={0}
        backgroundColor={'background.brown'}
      >
        <Stack className="menu" spacing={10}>
          <Link href="/">
            <a className={router.pathname === '/' ? 'current' : ''}>Home</a>
          </Link>
          <Link href="/pizza-cave">
            <a
              className={
                router.pathname.startsWith('/pizza-cave') ? 'current' : ''
              }
            >
              Pizza Cave
            </a>
          </Link>
          <Link href="/meet-artists">
            <a
              className={
                router.pathname.startsWith('/meet-artists')
                  ? ''
                  : // ? 'mobile-nav-item'
                    'mobile-nav-item'
              }
            >
              Meet Artists
            </a>
          </Link>
          <Link href="/rarity-rewards">
            <a
              className={
                router.pathname.startsWith('/rarity-rewards') ? 'current' : ''
              }
            >
              Rarity Rewards
            </a>
          </Link>
          {isConnected && (
            <Link href="/my-wallet">
              <a
                className={
                  router.pathname.startsWith('/my-wallet') ? 'current' : ''
                }
              >
                My Wallet
              </a>
            </Link>
          )}
          <ConnectWalletButton />{' '}
        </Stack>
      </Box>
    );
  };

  return (
    <Stack spacing={0}>
      <Box className="header">
        <Link href="/">
          <a>
            <img
              style={{ height: isMobile ? '120px' : '' }}
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
            {!isMobile && (
              <Stack direction="row" className="menu">
                <Link href="/">
                  <a className={router.pathname === '/' ? 'current' : ''}>
                    Home
                  </a>
                </Link>
                <Link href="/pizza-cave">
                  <a
                    className={
                      router.pathname.startsWith('/pizza-cave') ? 'current' : ''
                    }
                  >
                    Pizza Cave
                  </a>
                </Link>
                <Link href="/meet-artists">
                  <a
                    className={
                      router.pathname.startsWith('/meet-artists')
                        ? 'current'
                        : ''
                    }
                  >
                    Meet Artists
                  </a>
                </Link>
                <Link href="/rarity-rewards">
                  <a
                    className={
                      router.pathname.startsWith('/rarity-rewards')
                        ? 'current'
                        : ''
                    }
                  >
                    Rarity Rewards
                  </a>
                </Link>
                {isConnected && (
                  <Link href="/my-wallet">
                    <a
                      className={
                        router.pathname.startsWith('/my-wallet')
                          ? 'current'
                          : ''
                      }
                    >
                      My Wallet
                    </a>
                  </Link>
                )}
              </Stack>
            )}
          </Stack>
          {isMobile ? (
            <HamburgerIcon
              ref={ref}
              style={{
                transition: 'all 0.3s',
                transform: showMobileMenu ? 'rotate(90deg)' : '',
              }}
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
      </Box>
      {/* {true && <MobileMenu />} */}
      {showMobileMenu && <MobileMenu />}
    </Stack>
  );
};
