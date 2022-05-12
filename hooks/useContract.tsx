import { useMemo } from 'react';
import {
  LazlosIngredients,
  LazlosIngredients__factory,
  LazlosPizzas,
  LazlosPizzaShop,
  LazlosPizzaShop__factory,
  LazlosPizzas__factory,
} from '../contracts/typechain-types';
import {
  getIngredientsContractAddress,
  getMainContractAddress,
  getPizzaContractAddress,
} from '../utils/network';
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

export type UseIngredientsContractValue = {
  ingredientsContract: LazlosIngredients;
  connectionType: ContractConnectionType;
};

export type UsePizzaContractValue = {
  pizzaContract: LazlosPizzas;
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

export function useIngredientsContract(): UseIngredientsContractValue {
  const { provider } = useBackupProvider();
  const { wallet } = useWallet();
  const injectedProvider = wallet && wallet.web3Provider;
  const ingredientsContract = useMemo(
    () =>
      process.browser
        ? LazlosIngredients__factory.connect(
            getIngredientsContractAddress(),
            injectedProvider ?? provider,
          )
        : null,
    [provider, injectedProvider],
  );

  return {
    ingredientsContract,
    connectionType: injectedProvider
      ? ContractConnectionType.Injected
      : ContractConnectionType.Fallback,
  };
}

export function usePizzaContract(): UsePizzaContractValue {
  const { provider } = useBackupProvider();
  const { wallet } = useWallet();
  const injectedProvider = wallet && wallet.web3Provider;
  const pizzaContract = useMemo(
    () =>
      process.browser
        ? LazlosPizzas__factory.connect(
            getPizzaContractAddress(),
            injectedProvider ?? provider,
          )
        : null,
    [provider, injectedProvider],
  );

  return {
    pizzaContract,
    connectionType: injectedProvider
      ? ContractConnectionType.Injected
      : ContractConnectionType.Fallback,
  };
}
