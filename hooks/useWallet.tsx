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
import { LazlosIngredients__factory } from '../contracts/typechain-types';
import { getIngredientsContractAddress } from '../utils/network';

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
  myIngredients: [],
  myPizzas: [],
  ingredientGroups: [],
  isLoadingIngredients: true,
  isLoadingPizzas: true,
  fetchPizzas: () => Promise.resolve(),
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
  myIngredients: Ingredient[];
  myPizzas: Pizza[];
  ingredientGroups: IngredientGroup[];
  isLoadingIngredients: boolean;
  isLoadingPizzas: boolean;
  fetchPizzas: () => Promise<void>;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { replace } = useRouter();
  const [wallet, setWallet] = useState<WalletStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [myIngredients, setMyIngredients] = useState<Ingredient[]>([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoadingPizzas, setIsLoadingPizzas] = useState(true);

  const fetchPizzas = useCallback(async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/pizzas`,
    );
    console.log(res);
    setPizzas(res.data.pizzas);
    setIngredients(res.data.ingredients);
    setIsLoadingPizzas(false);
  }, []);

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

  const myPizzas = useMemo(() => {
    if (!wallet?.address) return [];
    return pizzas.filter(p => p.owner === wallet?.address);
  }, [pizzas, wallet?.address]);

  const getMyIngredients = useCallback(async () => {
    if (!wallet?.address || !wallet?.web3Provider || !ingredients.length)
      return;
    try {
      const ingredientsContract = LazlosIngredients__factory.connect(
        getIngredientsContractAddress(),
        wallet.web3Provider,
      );
      const results = await ingredientsContract.balanceOfBatch(
        ingredients.map(() => wallet?.address),
        ingredients.map(ingredient => ingredient.tokenId),
      );
      const parsedIngredients = results.map((bigNumber, index) => ({
        ...ingredients[index],
        balance: parseInt(bigNumber._hex, 16),
      }));

      console.log(parsedIngredients);

      setMyIngredients(parsedIngredients.filter(({ balance }) => !!balance));
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.MM_ERR = e;
    }
  }, [wallet?.address, wallet?.web3Provider, ingredients]);

  useEffect(() => {
    getMyIngredients();
  }, [getMyIngredients]);

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
        myIngredients,
        myPizzas,
        ingredientGroups,
        isLoadingIngredients,
        isLoadingPizzas,
        fetchPizzas,
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
