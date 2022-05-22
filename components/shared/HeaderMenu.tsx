import { Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { PageRoutes, Pages } from '../../types';
import { ConnectWalletButton } from '../ConnectWalletButton';

export const HeaderMenu = ({
  direction,
  pathname,
  isWalletConnected,
  showConnectWallet = false,
}: {
  direction: 'row' | 'column';
  pathname: string;
  isWalletConnected: boolean;
  showConnectWallet?: boolean;
}) => {
  return (
    <Stack direction={direction} className="menu">
      <Link href={PageRoutes.home}>
        <a
          style={{ marginRight: 16 }}
          className={pathname === PageRoutes.home ? 'current' : ''}
        >
          {Pages.home}
        </a>
      </Link>
      <Link href={PageRoutes.pizzaCave}>
        <a
          style={{ marginRight: 16 }}
          className={pathname.startsWith(PageRoutes.pizzaCave) ? 'current' : ''}
        >
          {Pages.pizzaCave}
        </a>
      </Link>
      <Link href={PageRoutes.meetArtists}>
        <a
          style={{ marginRight: 16 }}
          className={
            pathname.startsWith(PageRoutes.meetArtists) ? 'current' : ''
          }
        >
          {Pages.meetArtists}
        </a>
      </Link>
      <Link href={PageRoutes.rarityRewards}>
        <a
          style={{ marginRight: 16 }}
          className={
            pathname.startsWith(PageRoutes.rarityRewards) ? 'current' : ''
          }
        >
          {Pages.rarityRewards}
        </a>
      </Link>
      {isWalletConnected && (
        <Link href={PageRoutes.myWallet}>
          <a
            style={{ marginRight: 16 }}
            className={
              pathname.startsWith(PageRoutes.myWallet) ? 'current' : ''
            }
          >
            {Pages.myWallet}
          </a>
        </Link>
      )}
      {showConnectWallet && <ConnectWalletButton />}
    </Stack>
  );
};
