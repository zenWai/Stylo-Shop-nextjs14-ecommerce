'use client';

import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ProductOption } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export default function VariantSelector({
  options,
  cachedCombinations,
}: {
  options: ProductOption[];
  cachedCombinations: Combination[] | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleOptionClick = (optionName: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (newSearchParams.get(optionName) === value) {
      // If the option is already selected, remove it
      newSearchParams.delete(optionName);
    } else {
      newSearchParams.set(optionName, value);
    }

    const newUrl = createUrl(pathname, newSearchParams);
    router.replace(newUrl, { scroll: false });
  };

  return options.map((option) => (
    <dl className="mb-8" key={option.id}>
      <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
      <dd className="flex flex-wrap gap-3">
        {option.values.map((value) => {
          const optionNameLowerCase = option.name.toLowerCase();

          // Base option params on current params so we can preserve any other param state in the url.
          const optionSearchParams = new URLSearchParams(
            searchParams.toString(),
          );

          // Update the option params using the current option to reflect how the url *would* change,
          // if the option was clicked.
          optionSearchParams.set(optionNameLowerCase, value);

          // In order to determine if an option is available for sale, we need to:
          //
          // 1. Filter out all other param state
          // 2. Filter out invalid options
          // 3. Check if the option combination is available for sale
          //
          // This is the "magic" that will cross check possible variant combinations and preemptively
          // disable combinations that are not available. For example, if the color gray is only available in size medium,
          // then all other sizes should be disabled.
          /* # TODO: Think about improving filtered and isAvailableForSale, maybe
           *     Since we updating isAvailableForSale according to currently selected options...
           *     Seems unnecessary tho,
           *     after cachedCombinations, selecting different options and price updates are fast enough */
          const filtered = Array.from(optionSearchParams.entries()).filter(
            ([key, value]) =>
              options.find(
                (option) =>
                  option.name.toLowerCase() === key &&
                  option.values.includes(value),
              ),
          );

          const isAvailableForSale = cachedCombinations?.find((combination) =>
            filtered.every(
              ([key, value]) =>
                combination[key] === value && combination.availableForSale,
            ),
          );

          // The option is active if it's in the url params.
          const isActive = searchParams.get(optionNameLowerCase) === value;

          return (
            <button
              aria-disabled={!isAvailableForSale}
              className={clsx(
                'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm',
                {
                  'cursor-default ring-2 ring-blue-600': isActive,
                  'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ':
                    !isActive && isAvailableForSale,
                  'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform':
                    !isAvailableForSale,
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
  ));
}
