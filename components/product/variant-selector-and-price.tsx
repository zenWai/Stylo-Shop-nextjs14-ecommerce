'use client';

import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import { useWorker } from '@/components/product/use-worker';
import Price from '@/components/price';
import {
  filterRelevantSearchParams,
  productDisplayPrice,
} from '@/components/product/product-utils';
import type {
  Money,
  ProductOption,
  ProductVariant,
  VariantsToCombinations,
} from 'lib/shopify/types';
import { createUrl } from 'lib/utils';

export default function VariantSelectorAndPrice({
  cachedConvertVariantsToCombinations,
  productMinPrice,
  productMaxPrice,
  productOptions,
  variantsHashTable,
}: {
  cachedConvertVariantsToCombinations: VariantsToCombinations[] | undefined;
  productMinPrice: Money;
  productMaxPrice: Money;
  productOptions: ProductOption[];
  variantsHashTable: Record<string, ProductVariant>;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const relevantSearchParams = filterRelevantSearchParams(
    searchParams,
    productOptions,
  );
  const [availabilityResults, postMessage] = useWorker(
    '/availabilityChecker.js',
    cachedConvertVariantsToCombinations,
    productOptions,
    relevantSearchParams,
  );

  const displayPrice = productDisplayPrice(
    productMinPrice,
    productMaxPrice,
    productOptions,
    relevantSearchParams,
    variantsHashTable,
  );

  const handleOptionClick = (optionName: string, value: string) => {
    const originalSearchParams = new URLSearchParams(searchParams.toString());

    if (originalSearchParams.get(optionName) === value) {
      // If the option is already selected, remove it
      originalSearchParams.delete(optionName);
    } else {
      originalSearchParams.set(optionName, value);
    }

    // Retains the original random SearchParams+relevantSearchParams
    const newUrl = createUrl(pathname, originalSearchParams);
    window.history.replaceState(null, '', newUrl);
    //router.replace(newUrl, { scroll: false });
    const relevantSearchParams = filterRelevantSearchParams(
      originalSearchParams,
      productOptions,
    );
    console.log(relevantSearchParams);
    postMessage(Array.from(relevantSearchParams.entries()));
  };

  return (
    <>
      <div className="mb-3 mr-auto w-auto rounded-full bg-coralPink p-2 text-sm text-black">
        <Price
          amount={displayPrice.amount}
          currencyCode={displayPrice.currencyCode}
        />
      </div>
      {productOptions.map((option) => (
        <dl className="mb-8" key={option.id}>
          <dt className="mb-4 text-sm uppercase tracking-wide">
            {option.name}
          </dt>
          <dd className="flex flex-wrap gap-3">
            {option.values.map((value) => {
              const optionNameLowerCase = option.name.toLowerCase();
              const isActive = searchParams.get(optionNameLowerCase) === value;
              const isAvailableKey = `${option.name}:${value}`;
              const isAvailableForSale =
                availabilityResults[isAvailableKey] ?? true; // Default to true if undefined

              return (
                <button
                  aria-disabled={!isAvailableForSale}
                  className={clsx(
                    'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm',
                    {
                      'ring-2 ring-blue-600': isActive,
                      'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform':
                        !isAvailableForSale,
                      'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600':
                        !isActive && isAvailableForSale,
                    },
                  )}
                  disabled={!isAvailableForSale}
                  key={value}
                  onClick={() => {
                    handleOptionClick(optionNameLowerCase, value);
                  }}
                  title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                  type="button"
                >
                  {value}
                </button>
              );
            })}
          </dd>
        </dl>
      ))}
    </>
  );
}
