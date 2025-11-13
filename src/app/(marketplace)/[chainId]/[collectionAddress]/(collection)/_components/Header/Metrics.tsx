'use client';

import CustomSkeleton from '~/components/custom-skeleton/CustomSkeleton';
import { Grid } from '~/components/ui';
import { useIsMinWidth } from '~/hooks/ui/useIsMinWidth';
import { useCollectionFloorPrice } from '~/hooks/useCollectionFloorPrice';

import { Text } from '@0xsequence/design-system';
import { OrderSide } from '@0xsequence/marketplace-sdk';
import { useCountOfCollectables } from '@0xsequence/marketplace-sdk/react/hooks';
import { useParams } from 'next/navigation';
import type { Hex } from 'viem';

const Metrics = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;

  const { isLoading: isTotalLoading, data: total } = useCountOfCollectables({
    chainId,
    collectionAddress,
  });

  const {
    isLoading: isListedCollectiblesCountLoading,
    data: listedCollectiblesCount,
  } = useCountOfCollectables({
    chainId,
    collectionAddress,
    filter: {
      includeEmpty: false,
    },
    side: OrderSide.listing,
  });

  const isMd = useIsMinWidth('@md');
  const metricsTemplate = isMd
    ? `"collection-metrics-listed collection-metrics-floor collection-metrics-volume collection-metrics-owners" auto
            / auto auto auto auto`
    : `[row1-start] "collection-metrics-listed collection-metrics-floor" auto [row1-end]
            [row2-start] "collection-metrics-volume collection-metrics-owners" auto [row2-end]`;

  return (
    <Grid.Child name="collection-metrics" className="col-span-2">
      <Grid.Root template={metricsTemplate} className="gap-x-3 justify-start">
        <Grid.Child
          name="collection-metrics-listed"
          className="flex items-center gap-1"
        >
          <Text className="text-sm text-muted">Listed:</Text>

          {isListedCollectiblesCountLoading || isTotalLoading ? (
            <div className="flex w-16">
              <CustomSkeleton />
            </div>
          ) : (
            <Text className="text-sm text-secondary whitespace-nowrap">
              {listedCollectiblesCount} / {total}
            </Text>
          )}
        </Grid.Child>

        <FloorPriceMetric />
      </Grid.Root>
    </Grid.Child>
  );
};

const FloorPriceMetric = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;

  const { floorPrice, isLoading: isFloorLoading } = useCollectionFloorPrice({
    contractAddress: collectionAddress,
    chainId,
  });

  if (isFloorLoading) {
    return (
      <div className="flex w-16">
        <CustomSkeleton />
      </div>
    );
  }

  // if (!floorPrice) {
  //   return null;
  // }

  return (
    <Grid.Child
      name="collection-metrics-floor"
      className="flex items-center gap-1 pr-3 border-l border-primary/15 pl-3"
    >
      <Text className="text-sm text-muted">Floor:</Text>

      <div className="text-sm text-secondary">{floorPrice ?? '-'}</div>
    </Grid.Child>
  );
};

export default Metrics;
