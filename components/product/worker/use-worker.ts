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
  cachedConvertVariantsToCombinations: VariantsToCombinations[] | undefined,
  productOptions: ProductOption[],
  relevantSearchParams: URLSearchParams,
) => {
  const workerRef = useRef<Worker | null>(null);
  const [availabilityResults, setAvailabilityResults] =
    useState<AvailabilityResults>({});

  const postMessage = useCallback(
    (updatedSearchParams: [string, string][]) => {
      console.log('hi from postMessage worker');
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
    if (typeof window !== 'undefined') {
      workerRef.current = new Worker(
        new URL('./availability-checker.js', import.meta.url),
      );
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
    }
    console.log('hi from useEffect worker');
    // Setup an event listener for incoming messages

    return () => {
      workerRef.current?.terminate();
    };
  }, [cachedConvertVariantsToCombinations]);

  return [availabilityResults, postMessage] as [
    AvailabilityResults,
    typeof postMessage,
  ];
};
