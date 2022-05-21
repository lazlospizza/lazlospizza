import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Web3Modal from 'web3modal';
import { useRouter } from 'next/router';
import { Ingredient, IngredientGroup, IngredientType, Pizza } from '../types';
import axios from 'axios';
import {
  BASE_LIMIT,
  CHEESE_LIMIT,
  MEAT_LIMIT,
  SAUCE_LIMIT,
  TOPPING_LIMIT,
} from '../constants';

export const PROVIDER_OPTIONS = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID, // required
    },
  },
};

export type WalletProviderProps = {};

export const WalletContext = React.createContext<WalletContextValue>({
  connect: () => Promise.resolve(),
  disconnect: () => Promise.resolve(),
  wallet: null,
  loading: true,
  error: null,
  clearError: () => {},
  ingredients: [],
  pizzas: [],
  ingredientGroups: [],
  isLoadingIngredients: true,
  isLoadingPizzas: true,
});

let web3Modal: Web3Modal;
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'rinkeby',
    cacheProvider: true,
    providerOptions: PROVIDER_OPTIONS,
  });
}

export interface WalletStatus {
  address: string;
  chainId?: number;
  web3Provider?: providers.Web3Provider;
  provider: any;
  error?: string | null;
}

export interface WalletContextValue {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  loading: boolean;
  wallet: WalletStatus | null;
  error: string | null;
  clearError: () => void;
  ingredients: Ingredient[];
  pizzas: Pizza[];
  ingredientGroups: IngredientGroup[];
  isLoadingIngredients: boolean;
  isLoadingPizzas: boolean;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { replace } = useRouter();
  const [wallet, setWallet] = useState<WalletStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoadingPizzas, setIsLoadingPizzas] = useState(true);

  const fetchIngredients = useCallback(async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/ingredients`,
    );
    setIngredients(res.data.ingredients);
    setIsLoadingIngredients(false);
  }, []);

  const fetchPizzas = useCallback(async () => {
    if (!wallet?.address) return null;
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/${wallet.address}/pizzas`,
    );
    setPizzas(res.data.pizzas);
    setIsLoadingPizzas(false);
  }, [wallet?.address]);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  const connect = useCallback(async () => {
    setLoading(true);

    try {
      const provider = await web3Modal.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      const network = await web3Provider.getNetwork();
      setWallet({
        address,
        chainId: network.chainId,
        provider,
        web3Provider,
      });
    } catch (e) {
      if (e?.response?.data?.reference === 'signature-mismatch') {
        setError('Bad signature');
      }
    }
    setLoading(false);
  }, []);

  const provider = wallet?.provider;
  const disconnect = useCallback(async () => {
    setLoading(true);
    web3Modal.clearCachedProvider();
    replace('/');
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect();
    }
    setWallet(null);
    setLoading(false);
  }, [provider, replace]);

  useEffect(() => {
    if (!provider?.on) return;

    const handleAccountsChanged = (accounts: string[]) => {
      setWallet(wallet => {
        if (wallet === null) return null;
        const newAccount = accounts[0];
        if (!newAccount) return wallet;

        return {
          ...wallet,
          address: newAccount,
        };
      });
    };

    const handleChainChanged = (chainId: string) => {
      const parsedChainId = parseInt(chainId, 16);
      setWallet(wallet => {
        if (wallet === null) return null;

        return {
          ...wallet,
          chainId: parsedChainId,
        };
      });
    };

    const handleDisconnect = (error: { code: number; message: string }) => {
      disconnect();
    };

    provider.on('accountsChanged', handleAccountsChanged);
    provider.on('chainChanged', handleChainChanged);
    provider.on('disconnect', handleDisconnect);

    // Subscription Cleanup
    return () => {
      if (provider.removeListener) {
        provider.removeListener('accountsChanged', handleAccountsChanged);
        provider.removeListener('chainChanged', handleChainChanged);
        provider.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [provider, disconnect]);

  const ingredientGroups = useMemo(
    () =>
      [
        {
          name: 'Base',
          type: IngredientType.base,
          min: 1,
          max: BASE_LIMIT,
          ingredients: ingredients.filter(
            ingredient => ingredient.ingredientType === IngredientType.base,
          ),
        },
        {
          name: 'Sauce',
          type: IngredientType.sauce,
          min: 1,
          max: SAUCE_LIMIT,
          ingredients: ingredients.filter(
            ingredient => ingredient.ingredientType === IngredientType.sauce,
          ),
        },
        {
          name: 'Cheeses',
          type: IngredientType.cheese,
          min: 1,
          max: CHEESE_LIMIT,
          ingredients: ingredients.filter(
            ingredient => ingredient.ingredientType === IngredientType.cheese,
          ),
        },
        {
          name: 'Meats',
          type: IngredientType.meat,
          min: 0,
          max: MEAT_LIMIT,
          ingredients: ingredients.filter(
            ingredient => ingredient.ingredientType === IngredientType.meat,
          ),
        },
        {
          name: 'Toppings',
          type: IngredientType.topping,
          min: 1,
          max: TOPPING_LIMIT,
          ingredients: ingredients.filter(
            ingredient => ingredient.ingredientType === IngredientType.topping,
          ),
        },
      ] as IngredientGroup[],
    [ingredients],
  );

  return (
    <WalletContext.Provider
      value={{
        connect,
        disconnect,
        wallet,
        loading,
        error,
        clearError: () => setError(null),
        ingredients,
        pizzas,
        ingredientGroups,
        isLoadingIngredients,
        isLoadingPizzas,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export type UseWalletValue = WalletContextValue & {
  isConnected: boolean;
  address?: string;
  signature?: string;
};

export function useWallet(): UseWalletValue {
  const walletCtx = React.useContext<WalletContextValue>(WalletContext);
  const { wallet } = walletCtx;
  const isConnected = useMemo(() => Boolean(wallet), [wallet]);

  return {
    ...walletCtx,
    isConnected,
    address: wallet?.address ?? undefined,
  };
}
