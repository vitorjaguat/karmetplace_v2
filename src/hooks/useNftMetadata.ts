import { useState, useEffect } from 'react';

import contract from '../lib/contract';
import { type Nft } from 'alchemy-sdk';

interface UseNftMetadataParams {
  contractAddress?: string;
  tokenId: string;
}

interface UseNftMetadataReturn {
  metadata: Nft | null;
  isLoading: boolean;
  error: string | null;
}

export const useNftMetadata = ({
  tokenId,
  contractAddress = contract,
}: UseNftMetadataParams): UseNftMetadataReturn => {
  const [metadata, setMetadata] = useState<Nft | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      // Reset state
      setIsLoading(true);
      setError(null);
      setMetadata(null);

      try {
        // Validate inputs
        if (!contractAddress || !tokenId) {
          throw new Error('Contract address and token ID are required');
        }

        const response = await fetch(
          `/api/nft/metadata?contractAddress=${contractAddress}&tokenId=${tokenId}&chainId=1`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch NFT metadata');
        }

        const data = await response.json();
        setMetadata(data.metadata);
      } catch (err) {
        console.error('Error fetching NFT metadata:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to fetch metadata',
        );
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we have the required parameters
    if (contractAddress && tokenId) {
      void fetchMetadata();
    }
  }, [contractAddress, tokenId]);

  return {
    metadata,
    isLoading,
    error,
  };
};

export default useNftMetadata;
