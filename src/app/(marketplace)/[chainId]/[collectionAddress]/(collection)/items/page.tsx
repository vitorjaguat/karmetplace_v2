'use client';

import { useMemo, useState, useCallback } from 'react';

import { CollectiblesGrid } from '~/components/collectablesGrid';

import ErrorFetchingCollectibles from '../_components/ErrorFetchingCollectibles';
import NoItemsFound from '../_components/NoItemsFound';
import { useListCollectiblesArgs } from '../_hooks/useListCollectiblesArgs';
import { Spinner } from '@0xsequence/design-system';
import { MarketplaceKind } from '@0xsequence/marketplace-sdk';
import { useListCollectibles } from '@0xsequence/marketplace-sdk/react';
import { useLowestListing } from '@0xsequence/marketplace-sdk/react/hooks';
import { useParams } from 'next/navigation';
import type { Hex } from 'viem';

// Helper component to fetch lowest listing for a single collectible
const CollectibleWithLowestListing = ({
  collectible,
  chainId,
  collectionAddress,
  onListingFetched,
}: {
  collectible: any;
  chainId: number;
  collectionAddress: Hex;
  onListingFetched: (tokenId: string, listing: any | null) => void;
}) => {
  const { data: lowestListing, isLoading: lowestListingLoading } =
    useLowestListing({
      chainId,
      collectionAddress,
      tokenId: collectible.metadata.tokenId,
      filter: {
        marketplace: [MarketplaceKind.sequence_marketplace_v2],
      },
    });

  // Update the parent when listing is fetched (or when no listing is found)
  useMemo(() => {
    if (!lowestListingLoading) {
      // Set to the actual listing if found, or null if no listing from sequence marketplace
      onListingFetched(collectible.metadata.tokenId, lowestListing || null);
    }
  }, [
    lowestListing,
    lowestListingLoading,
    collectible.metadata.tokenId,
    onListingFetched,
  ]);

  return null; // This component doesn't render anything
};

const CollectionPage = () => {
  const {
    data: collectiblesList,
    fetchNextPage,
    isLoading: collectiblesListLoading,
    isError: errorFetchingCollectibles,
    error,
  } = useListCollectibles(useListCollectiblesArgs());
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;

  // State to store lowest listings for each token (null means no listing, undefined means not fetched yet)
  const [lowestListings, setLowestListings] = useState<
    Record<string, any | null>
  >({});

  // Callback to update lowest listings
  const handleListingFetched = useCallback(
    (tokenId: string, listing: any | null) => {
      setLowestListings((prev) => ({
        ...prev,
        [tokenId]: listing,
      }));
    },
    [],
  );

  const baseCollectiblesList =
    collectiblesList?.pages.flatMap((p) => p.collectibles) ?? [];

  // Map collectibles with their lowest listings from sequence marketplace only
  const collectiblesListMapped = useMemo(() => {
    return baseCollectiblesList.map((collectible) => {
      const tokenId = collectible.metadata.tokenId;
      const hasLowestListingData = tokenId in lowestListings;

      return {
        ...collectible,
        listing: hasLowestListingData
          ? lowestListings[tokenId]
          : collectible.listing,
      };
    });
  }, [baseCollectiblesList, lowestListings]);
  // collectiblesList?.pages
  //   .flatMap((p) => p.collectibles)
  //   .map((collectible) => ({
  //     ...collectible,
  //     offer:
  //       collectible.offer?.marketplace === 'magic_eden'
  //         ? undefined
  //         : collectible.offer,
  //     listing:
  //       collectible.listing?.marketplace === 'magic_eden'
  //         ? undefined
  //         : collectible.listing,
  //     order:
  //       collectible.order?.marketplace === 'magic_eden'
  //         ? undefined
  //         : collectible.order,
  //   })) ?? [];

  console.dir(collectiblesListMapped, { depth: null });

  if (errorFetchingCollectibles) {
    console.log('an error occurred while fetching collectibles', error);

    return <ErrorFetchingCollectibles />;
  }

  if (collectiblesListLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner className="mt-4" />;
      </div>
    );
  }

  if (!collectiblesListMapped.length) {
    return (
      <NoItemsFound collectionAddress={collectionAddress} chainId={chainId} />
    );
  }

  return (
    <>
      {/* Render invisible components to fetch lowest listings */}
      {baseCollectiblesList.map((collectible) => (
        <CollectibleWithLowestListing
          key={collectible.metadata.tokenId}
          collectible={collectible}
          chainId={chainId}
          collectionAddress={collectionAddress}
          onListingFetched={handleListingFetched}
        />
      ))}

      <CollectiblesGrid
        endReached={fetchNextPage}
        collectiblesList={collectiblesListMapped}
        collectiblesListLoading={collectiblesListLoading}
        collectionAddress={collectionAddress}
        chainId={chainId}
      />
    </>
  );
};

export default CollectionPage;
