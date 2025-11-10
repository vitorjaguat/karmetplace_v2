'use client';

import { useCollectionFloorPrice } from '~/hooks/useCollectionFloorPrice';

interface FloorPriceDisplayProps {
  contractAddress: string;
  chainId?: number;
}

export const FloorPriceDisplay = ({
  contractAddress,
  chainId = 1,
}: FloorPriceDisplayProps) => {
  const { floorPrice, isLoading, error } = useCollectionFloorPrice({
    contractAddress,
    chainId,
  });

  return (
    <div className="w-full">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
        Floor price
      </span>
      <div className="mt-2">
        {isLoading ? (
          <div className="h-8 w-20 animate-pulse rounded bg-neutral-600/50" />
        ) : error ? (
          <span className="block text-2xl font-semibold text-neutral-400">
            —
          </span>
        ) : (
          <span className="block text-2xl font-semibold text-neutral-100">
            {floorPrice || '—'}
          </span>
        )}
      </div>
    </div>
  );
};
