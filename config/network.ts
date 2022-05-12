import persistedNetworks from './networks.json';
import persistedLocalNetworks from './networks.local.default.json';
import localNetworks from './networks.local.json';

export type ContractConfiguration = {
  mainContractAddress: string;
  ingredientsContractAddress: string;
  pizzaContractAddress: string;
};

export enum EthNetwork {
  localhost = 'localhost',
  hardhat = 'hardhat',
  mainnet = 'mainnet',
  rinkeby = 'rinkeby',
}

const contractConfig = persistedNetworks;
let localContractConfig = persistedLocalNetworks;
try {
  localContractConfig = localNetworks;
} catch {
  console.warn(
    'Failed to load local contract config, using defaults which may have empty values',
  );
}

export type EthNetworkConfig = {
  name: string;
  chainId: number;
  rpcUrl: string;
  blockExplorer?: string;
  contractConfig: any;
  openSeaBaseUrl?: string;
  openSeaProjectSlug?: string;
  openSeaBaseApiUrl: string;
};

const localNetworkConfig: EthNetworkConfig = {
  name: 'localhost',
  chainId: 1337,
  rpcUrl: 'http://localhost:8545',
  contractConfig: localContractConfig.localhost,
  openSeaBaseApiUrl: 'https://api.opensea.io',
};

export const NETWORK_CONFIG: Record<EthNetwork, EthNetworkConfig> = {
  localhost: localNetworkConfig,
  hardhat: {
    ...localNetworkConfig,
    name: 'hardhat',
  },
  mainnet: {
    name: 'mainnet',
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    blockExplorer: 'https://etherscan.io',
    contractConfig: contractConfig.mainnet,
    openSeaBaseUrl: 'https://opensea.io',
    openSeaProjectSlug: 'lazlospizza',
    openSeaBaseApiUrl: 'https://api.opensea.io',
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
  },
};
