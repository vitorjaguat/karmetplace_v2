'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { CollectiblesGrid } from '~/components/collectablesGrid';
import CustomNetworkImage from '~/components/custom-network-image/CustomNetworkImage';
import CustomSkeleton from '~/components/custom-skeleton/CustomSkeleton';
import { useIsMinWidth } from '~/hooks/ui/useIsMinWidth';

import CollectionImage from '../../_landing/Card/CollectionImage';
import { useInventory } from './InventoryContext';
import { Divider } from '@0xsequence/design-system';
import {
  compareAddress,
  MarketplaceKind,
  type CollectibleOrder,
  type Order,
} from '@0xsequence/marketplace-sdk';
import {
  useCollection,
  useInventory as useSdkInventory,
  useMarketplaceConfig,
} from '@0xsequence/marketplace-sdk/react';
import { useLowestListing } from '@0xsequence/marketplace-sdk/react/hooks';
import Link from 'next/link';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

// Helper component to fetch lowest listing for a single collectible
const CollectibleWithLowestListing = ({
  collectible,
  chainId,
  collectionAddress,
  onListingFetched,
}: {
  collectible: CollectibleOrder;
  chainId: number;
  collectionAddress: Address;
  onListingFetched: (tokenId: string, listing: Order | null) => void;
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

function CollectionHeaderSkeleton() {
  return (
    <div className="flex gap-2 items-center">
      <CustomSkeleton className="w-5 h-5 rounded-xl" />

      <CustomSkeleton className="w-20 h-4" />

      <CustomSkeleton className="w-4 h-4 rounded-xl" />
    </div>
  );
}

type CollectionBalanceProps = {
  collectionAddress: Address;
};

const CollectionBalance = ({ collectionAddress }: CollectionBalanceProps) => {
  const { address: accountAddress } = useAccount();
  const { data: config } = useMarketplaceConfig();
  const chainId = config?.collections.find((c) =>
    compareAddress(c.address, collectionAddress),
  )?.chainId;

  const { setBalance } = useInventory();

  // State to store lowest listings for each token (null means no listing, undefined means not fetched yet)
  const [lowestListings, setLowestListings] = useState<
    Record<string, Order | null>
  >({});

  // Callback to update lowest listings
  const handleListingFetched = useCallback(
    (tokenId: string, listing: Order | null) => {
      setLowestListings((prev) => ({
        ...prev,
        [tokenId]: listing,
      }));
    },
    [],
  );

  const { data: collection, isLoading: collectionLoading } = useCollection({
    collectionAddress: collectionAddress,
    chainId: chainId!,
    query: {
      enabled: !!chainId,
    },
  });

  const {
    data,
    isLoading: collectionBalanceLoading,
    fetchNextPage,
    isSuccess: collectionBalanceSuccess,
  } = useSdkInventory({
    chainId: chainId!,
    collectionAddress,
    accountAddress: accountAddress!,
    query: {
      enabled: !!accountAddress && !!chainId,
    },
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (
      !collectionLoading &&
      collectionBalanceSuccess &&
      data?.pages[0]?.collectibles
    ) {
      const lastCollectible =
        data?.pages[0]?.collectibles[data?.pages[0]?.collectibles.length - 1];

      data?.pages[0]?.collectibles.forEach((collectible) => {
        setBalance(collectionAddress, {
          balance: [
            {
              collectibleId: collectible.metadata.tokenId,
              balance: Number(collectible.balance),
            },
          ],
          decimals: Number(collectible.metadata.decimals) || 0,
          fetched:
            collectible.metadata.tokenId === lastCollectible?.metadata.tokenId,
        });
      });
    }

    if (
      !collectionLoading &&
      collectionBalanceSuccess &&
      data?.pages[0]?.collectibles.length === 0
    ) {
      setBalance(collectionAddress, {
        balance: [],
        decimals: 0,
        fetched: true,
      });
    }
  }, [collectionLoading, collectionBalanceLoading, setBalance]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const isMd = useIsMinWidth('@md');

  const baseCollectiblesList = useMemo(
    () => data?.pages.flatMap((p) => p.collectibles) ?? [],
    [data],
  );

  // Map collectibles with their lowest listings from sequence marketplace only
  const collectiblesListMapped = useMemo(() => {
    return baseCollectiblesList.map((collectible) => {
      const tokenId = collectible.metadata.tokenId;
      const hasLowestListingData = tokenId in lowestListings;

      return {
        ...collectible,
        listing: hasLowestListingData
          ? (lowestListings[tokenId] ?? undefined)
          : collectible.listing,
      };
    });
  }, [baseCollectiblesList, lowestListings]);

  if (collectionLoading || collectionBalanceLoading) {
    return <CollectionHeaderSkeleton />;
  }

  if (collectiblesListMapped.length === 0 || !chainId) {
    return null;
  }

  return (
    <div className="flex flex-col">
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

      <Divider className="w-full mb-3 mt-0" />
      <Link href={`/${chainId}/${collectionAddress}/items`}>
        <div className="mb-4">
          {collectionLoading ? (
            <CollectionHeaderSkeleton />
          ) : (
            <div className="flex gap-2 items-center">
              <CollectionImage
                src={collection?.logoURI}
                className="w-5 h-5 rounded-xl"
                placeholderClassName="text-muted"
                fallbackClassName="w-5 h-5 p-0"
                alt={collection?.name}
              />

              <p className="text-sm text-primary font-bold">
                {collection?.name}
              </p>

              <CustomNetworkImage size="xs" chainId={Number(chainId)} />
            </div>
          )}
        </div>
      </Link>

      <CollectiblesGrid
        endReached={fetchNextPage}
        collectiblesList={collectiblesListMapped}
        collectiblesListLoading={collectionBalanceLoading}
        chainId={chainId}
        collectionAddress={collectionAddress}
        limit={isMd ? 10 : 5}
      />
    </div>
  );
};

export default CollectionBalance;
