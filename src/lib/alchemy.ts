import { Alchemy, Network } from 'alchemy-sdk';

export const getAlchemyNetwork = (chainId: number): Network => {
  switch (chainId) {
    case 1:
      return Network.ETH_MAINNET;
    case 137:
      return Network.MATIC_MAINNET;
    case 10:
      return Network.OPT_MAINNET;
    case 42161:
      return Network.ARB_MAINNET;
    case 8453:
      return Network.BASE_MAINNET;
    case 11155111:
      return Network.ETH_SEPOLIA;
    default:
      return Network.ETH_MAINNET;
  }
};

export const createAlchemy = (chainId: number = 1): Alchemy => {
  // Use server-side environment variable (no NEXT_PUBLIC_ prefix)
  const apiKey =
    process.env.ALCHEMY_API_KEY ||
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ||
    '';

  return new Alchemy({
    apiKey,
    network: getAlchemyNetwork(chainId),
  });
};
