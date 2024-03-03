import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  ProductOption,
  VariantsToCombinations,
} from '@/lib/shopify/types';

type AvailabilityResults = Record<string, boolean>;
interface WorkerMessageData {
  availabilityResults: AvailabilityResults;
}

export const useWorker = (
  workerPath: string,
  cachedConvertVariantsToCombinations: VariantsToCombinations[] | undefined,
  productOptions: ProductOption[],
  relevantSearchParams: URLSearchParams,
) => {
  const workerRef = useRef<Worker | null>(null);
  const [availabilityResults, setAvailabilityResults] =
    useState<AvailabilityResults>({});

  const postMessage = useCallback(
    (updatedSearchParams: [string, string][]) => {
      if (workerRef.current) {
        workerRef.current.postMessage({
          cachedConvertVariantsToCombinations,
          searchParams: updatedSearchParams,
          options: productOptions,
        });
      }
    },
    [cachedConvertVariantsToCombinations, productOptions],
  );

  useEffect(() => {
    workerRef.current = new Worker(workerPath);

    // Setup an event listener for incoming messages
    workerRef.current.onmessage = ({
      data,
    }: MessageEvent<WorkerMessageData>) => {
      setAvailabilityResults((prev) => ({
        ...prev,
        ...data.availabilityResults,
      }));
    };

    // Post the initial message to the worker
    postMessage(Array.from(relevantSearchParams.entries()));

    return () => {
      workerRef.current?.terminate();
    };
  }, [workerPath, cachedConvertVariantsToCombinations]);

  return [availabilityResults, postMessage] as [
    AvailabilityResults,
    typeof postMessage,
  ];
};
