import { formatPrice } from '@0xsequence/marketplace-sdk';
import {
  useFloorOrder,
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
  const {
    data: floorOrder,
    isLoading: isFloorLoading,
    error: floorError,
  } = useFloorOrder({
    chainId,
    collectionAddress: contractAddress as Hex,
  });

  const {
    data: currencies,
    isLoading: isCurrenciesLoading,
    error: currenciesError,
  } = useCurrencies({
    chainId,
  });

  const isLoading = isFloorLoading || isCurrenciesLoading;
  const error = floorError || currenciesError;

  let floorPrice: string | null = null;

  if (floorOrder?.order?.priceAmount && currencies) {
    const floorCurrency = currencies.find(
      (currency) =>
        currency.contractAddress === floorOrder.order?.priceCurrencyAddress,
    );

    if (floorCurrency && floorOrder.order) {
      const formattedPrice = formatPrice(
        BigInt(floorOrder.order.priceAmount),
        floorCurrency.decimals,
      );
      floorPrice = `${formattedPrice} ${floorCurrency.symbol}`;
    }
  }

  return {
    floorPrice,
    isLoading,
    error: error ? error.message : null,
  };
};

export default useCollectionFloorPrice;
