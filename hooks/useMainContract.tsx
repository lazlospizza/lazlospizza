import { useMemo } from 'react';
import {
  LazlosPizzaShop,
  LazlosPizzaShop__factory,
} from '../contracts/typechain-types';
import { getMainContractAddress } from '../utils/network';
import { useBackupProvider } from './useBackupProvider';
import { useWallet } from './useWallet';

export enum ContractConnectionType {
  Injected = 0,
  Fallback = 1,
}

export type UseMainContractValue = {
  mainContract: LazlosPizzaShop;
  connectionType: ContractConnectionType;
};

export function useMainContract(): UseMainContractValue {
  const { provider } = useBackupProvider();
  const { wallet } = useWallet();
  const injectedProvider = wallet && wallet.web3Provider;
  const mainContract = useMemo(
    () =>
      process.browser
        ? LazlosPizzaShop__factory.connect(
            getMainContractAddress(),
            injectedProvider ?? provider,
          )
        : null,
    [provider, injectedProvider],
  );

  return {
    mainContract,
    connectionType: injectedProvider
      ? ContractConnectionType.Injected
      : ContractConnectionType.Fallback,
  };
}
