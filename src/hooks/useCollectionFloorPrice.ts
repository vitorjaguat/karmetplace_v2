import { useMemo } from 'react';

import { formatPrice, MarketplaceKind } from '@0xsequence/marketplace-sdk';
import {
  useLowestListing,
  useCurrencies,
} from '@0xsequence/marketplace-sdk/react/hooks';
import { type Hex } from 'viem';

interface UseCollectionFloorPriceParams {
  contractAddress: string;
  chainId?: number;
}

interface UseCollectionFloorPriceReturn {
  floorPrice: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useCollectionFloorPrice = ({
  contractAddress,
  chainId = 1,
}: UseCollectionFloorPriceParams): UseCollectionFloorPriceReturn => {
  // Fetch lowest listings for tokens 1-6 with marketplace filter
  const token1 = useLowestListing({
    chainId,
    collectionAddress: contractAddress as Hex,
    tokenId: '1',
    filter: { marketplace: [MarketplaceKind.sequence_marketplace_v2] },
  });

  const token2 = useLowestListing({
    chainId,
    collectionAddress: contractAddress as Hex,
    tokenId: '2',
    filter: { marketplace: [MarketplaceKind.sequence_marketplace_v2] },
  });

  const token3 = useLowestListing({
    chainId,
    collectionAddress: contractAddress as Hex,
    tokenId: '3',
    filter: { marketplace: [MarketplaceKind.sequence_marketplace_v2] },
  });

  const token4 = useLowestListing({
    chainId,
    collectionAddress: contractAddress as Hex,
    tokenId: '4',
    filter: { marketplace: [MarketplaceKind.sequence_marketplace_v2] },
  });

  const token5 = useLowestListing({
    chainId,
    collectionAddress: contractAddress as Hex,
    tokenId: '5',
    filter: { marketplace: [MarketplaceKind.sequence_marketplace_v2] },
  });

  const token6 = useLowestListing({
    chainId,
    collectionAddress: contractAddress as Hex,
    tokenId: '6',
    filter: { marketplace: [MarketplaceKind.sequence_marketplace_v2] },
  });

  const {
    data: currencies,
    isLoading: isCurrenciesLoading,
    error: currenciesError,
  } = useCurrencies({
    chainId,
  });

  // Collect all token queries
  const tokenQueries = [token1, token2, token3, token4, token5, token6];

  // Check if any queries are still loading
  const isLoading =
    tokenQueries.some((query) => query.isLoading) || isCurrenciesLoading;

  // Check for errors
  const error =
    tokenQueries.find((query) => query.error)?.error || currenciesError;

  // Calculate the floor price from all listings
  const floorPrice = useMemo(() => {
    if (!currencies || isLoading || error) {
      return null;
    }

    // Get all valid listings with prices
    const validListings = tokenQueries
      .map((query) => query.data)
      .filter(
        (listing): listing is NonNullable<typeof listing> =>
          listing != null && listing.priceAmount != null,
      )
      .map((listing) => ({
        priceAmount: BigInt(listing.priceAmount),
        priceCurrencyAddress: listing.priceCurrencyAddress,
      }));

    if (validListings.length === 0) {
      return null;
    }

    // Find the listing with the smallest price
    const cheapestListing = validListings.reduce((min, current) =>
      current.priceAmount < min.priceAmount ? current : min,
    );

    // Find the currency for the cheapest listing
    const currency = currencies.find(
      (c) => c.contractAddress === cheapestListing.priceCurrencyAddress,
    );

    if (!currency) {
      return null;
    }

    // Format the price
    const formattedPrice = formatPrice(
      cheapestListing.priceAmount,
      currency.decimals,
    );
    return `${formattedPrice} ${currency.symbol}`;
  }, [currencies, isLoading, error, ...tokenQueries.map((q) => q.data)]);

  return {
    floorPrice,
    isLoading,
    error: error ? error.message : null,
  };
};

export default useCollectionFloorPrice;
