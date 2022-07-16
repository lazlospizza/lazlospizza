import { Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { PageRoutes, Pages } from '../../types';
import { ConnectWalletButton } from '../ConnectWalletButton';

export const HeaderMenu = ({
  direction,
  pathname,
  isWalletConnected,
  showConnectWallet = false,
  children,
}: {
  direction: 'row' | 'column';
  pathname: string;
  isWalletConnected: boolean;
  showConnectWallet?: boolean;
  children?: any;
}) => {
  return (
    <Stack
      direction={direction}
      className={`menu menu--${direction}`}
      sx={{
        ...(direction === 'row'
          ? {
              width: '100%',
              justifyContent: 'space-around',
              fontFamily: 'heading',
              fontSize: '12px',
            }
          : {}),
      }}
    >
      {/* <Link href={PageRoutes.home}>
        <a
          style={{ marginRight: 16 }}
          className={pathname === PageRoutes.home ? 'current' : ''}
        >
          {Pages.home}
        </a>
      </Link> */}
      <Link href={PageRoutes.pizzaCave}>
        <a
          style={{ marginRight: 16 }}
          className={pathname === PageRoutes.pizzaCave ? 'current' : ''}
        >
          {Pages.pizzaCave}
        </a>
      </Link>
      <Link href={PageRoutes.meetArtists}>
        <a
          style={{ marginRight: 16 }}
          className={`${
            pathname.startsWith(PageRoutes.meetArtists) ? 'current ' : ''
          }tour-meet-artists`}
        >
          {Pages.meetArtists}
        </a>
      </Link>
      <Link href={PageRoutes.rarityRewards}>
        <a
          style={{ marginRight: 16 }}
          className={`${
            pathname.startsWith(PageRoutes.rarityRewards) ? 'current ' : ''
          }tour-rarity-rewards`}
        >
          {Pages.rarityRewards}
        </a>
      </Link>
      <Link href={PageRoutes.faq}>
        <a
          style={{ marginRight: 16 }}
          className={`${
            pathname.startsWith(PageRoutes.faq) ? 'current ' : ''
          }tour-faq`}
        >
          {Pages.faq}
        </a>
      </Link>
      {isWalletConnected && (
        <Link href={PageRoutes.myWallet}>
          <a
            style={{ marginRight: 16 }}
            className={`${
              pathname.startsWith(PageRoutes.myWallet) ? 'current ' : ''
            }tour-my-wallet`}
          >
            {Pages.myWallet}
          </a>
        </Link>
      )}
      {!!children && children}
    </Stack>
  );
};
