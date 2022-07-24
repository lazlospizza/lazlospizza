import persistedNetworks from './networks.json';

export type ContractConfiguration = {
  mainContractAddress: string;
  ingredientsContractAddress: string;
  pizzaContractAddress: string;
};

export enum EthNetwork {
  mainnet = 'mainnet',
  rinkeby = 'rinkeby',
}

const contractConfig = persistedNetworks;

export type EthNetworkConfig = {
  name: string;
  chainId: number;
  rpcUrl: string;
  blockExplorer?: string;
  contractConfig: any;
  openSeaBaseUrl?: string;
  openSeaProjectSlug?: string;
  openSeaBaseApiUrl: string;
  defaultBlockInterval?: number;
};

export const NETWORK_CONFIG: Record<EthNetwork, EthNetworkConfig> = {
  mainnet: {
    name: 'mainnet',
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    blockExplorer: 'https://etherscan.io',
    contractConfig: contractConfig.mainnet,
    openSeaBaseUrl: 'https://opensea.io',
    openSeaProjectSlug: 'lazlospizza',
    openSeaBaseApiUrl: 'https://api.opensea.io',
    defaultBlockInterval: 10000,
  },
  rinkeby: {
    name: 'rinkeby',
    chainId: 4,
    rpcUrl: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    blockExplorer: 'https://rinkeby.etherscan.io',
    contractConfig: contractConfig.rinkeby,
    openSeaBaseUrl: 'https://testnets.opensea.io',
    openSeaProjectSlug: 'lazlospizza',
    openSeaBaseApiUrl: 'https://testnets-api.opensea.io',
    defaultBlockInterval: 100,
  },
};
