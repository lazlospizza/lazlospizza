import {
  EthNetwork,
  EthNetworkConfig,
  NETWORK_CONFIG,
} from '../config/network';

const ENV_VAR_NET_NAME = process.env.NEXT_PUBLIC_ETH_NETWORK ?? 'mainnet';
console.log(`Current Network: ${ENV_VAR_NET_NAME}`);

export function getCurrentNetwork(): EthNetwork {
  const ethNetwork: EthNetwork =
    EthNetwork[ENV_VAR_NET_NAME.toLowerCase() as EthNetwork];
  if (!ethNetwork) {
    throw new Error(`Unrecognized network found: ${ENV_VAR_NET_NAME}`);
  }
  return ethNetwork;
}

export function getNetworkConfig(): EthNetworkConfig {
  return NETWORK_CONFIG[getCurrentNetwork()];
}

export function getMainContractAddress(): string {
  return getNetworkConfig().contractConfig.mainContractAddress;
}

export function getIngredientsContractAddress(): string {
  return getNetworkConfig().contractConfig.ingredientsContractAddress;
}

export function getPizzaContractAddress(): string {
  return getNetworkConfig().contractConfig.pizzaContractAddress;
}

export function getBlockExplorerUrl(): string | undefined {
  return getNetworkConfig().blockExplorer;
}
