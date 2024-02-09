import { default as NextDynamic } from 'next/dynamic';
import { Suspense } from 'react';
import { SkeletonVariantSelector } from '@/components/skeletons/variant-selector';
import {
  getCachecombinations,
  getCachedVariantsHashTable,
} from '@/components/product/product-cached-functions';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import type { Money, ProductOption, ProductVariant } from 'lib/shopify/types';

const VariantSelector = NextDynamic(
  () => import('./variant-selector').then((mod) => mod.VariantSelector),
  { ssr: false, loading: () => <SkeletonVariantSelector /> },
);

function getValidOptionNames(options: ProductOption[]): string[] {
  return options.map((option) => option.name.toLowerCase());
}

function areValidOptionsPresentInSearchParams(
  searchParams: URLSearchParams,
  options: ProductOption[],
): boolean {
  const validOptionNames = getValidOptionNames(options);
  const searchParamKeys = Object.keys(searchParams);
  return validOptionNames.every((name) =>
    searchParamKeys.includes(name.toLowerCase()),
  );
}

/**
 * Generates a search key from URL search parameters and product options.
 * Filters the parameters to include only valid product options
 * and creates a sorted, lowercased string key.
 */
function generateSearchKey(
  searchParamsProductPage: URLSearchParams,
  options: ProductOption[],
): string {
  const validOptionNames = getValidOptionNames(options);
  return Object.entries(searchParamsProductPage)
    .filter(([key]) => validOptionNames.includes(key.toLowerCase()))
    .map(([key, value]) => {
      // Handle the case where in a near future value is an array
      const valueStr = Array.isArray(value)
        ? value.join(',')
        : (value as string);
      return `${key}:${valueStr}`;
    })
    .sort()
    .join(';')
    .toLowerCase();
}

/**
 * Calculates the display price for a product based on the provided search parameters.
 * If all variants have the same price or if the search parameters do not match valid product options,
 * it returns the minimum variant price. Otherwise, it finds the matching variant based on the search parameters
 * and returns its price.
 */
async function productDisplayPrice(
  productMinPrice: Money,
  productMaxPrice: Money,
  productOptions: ProductOption[],
  searchParamsProductPage: URLSearchParams,
  searchKey: string,
  variantsHashTable: Record<string, ProductVariant>,
) {
  /* if all variants have the same price or if search parameters are not valid. */
  if (
    productMinPrice.amount === productMaxPrice.amount ||
    !areValidOptionsPresentInSearchParams(
      searchParamsProductPage,
      productOptions,
    )
  ) {
    return productMinPrice;
  }

  const matchingVariant = variantsHashTable[searchKey];

  return matchingVariant?.availableForSale
    ? matchingVariant.price
    : productMinPrice;
}

export async function ProductDescription({
  productAvailableForSale,
  productDescriptionHtml,
  productMaxPrice,
  productMinPrice,
  productOptions,
  productTitle,
  productVariants,
  searchParamsProductPage,
}: {
  productAvailableForSale: boolean;
  productDescriptionHtml: string;
  productMaxPrice: Money;
  productMinPrice: Money;
  productOptions: ProductOption[];
  productTitle: string;
  productVariants: ProductVariant[];
  searchParamsProductPage: URLSearchParams;
}) {
  const hasNoOptionsOrJustOneOption =
    !productOptions.length ||
    (productOptions.length === 1 && productOptions[0]?.values.length === 1);

  let availableForSale, displayPrice, cachedCombinations;
  // if product has options we need to find display price and handle availableForSale of chosen options
  if (!hasNoOptionsOrJustOneOption) {
    cachedCombinations = await getCachecombinations(productVariants);
    // variants hash table for fast lookup
    const variantsHashTable = await getCachedVariantsHashTable(productVariants);
    const searchKey = generateSearchKey(
      searchParamsProductPage,
      productOptions,
    );

    displayPrice = await productDisplayPrice(
      productMinPrice,
      productMaxPrice,
      productOptions,
      searchParamsProductPage,
      searchKey,
      variantsHashTable,
    );
    availableForSale = variantsHashTable[searchKey]?.availableForSale;
  }

  availableForSale ??= productAvailableForSale; // availableForSale of the variant, else, availableForSale of the product
  displayPrice ??= productMinPrice; // price of the variant, else, minimum price of the product
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <h1 className="mb-2 text-5xl font-medium">{productTitle}</h1>
        <div className="mr-auto w-auto rounded-full bg-coralPink p-2 text-sm text-black">
          <Price
            amount={displayPrice.amount}
            currencyCode={displayPrice.currencyCode}
          />
        </div>
      </div>
      {!hasNoOptionsOrJustOneOption ? (
        <VariantSelector
          cachedCombinations={cachedCombinations}
          options={productOptions}
        />
      ) : null}
      {productDescriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight"
          html={productDescriptionHtml}
        />
      ) : null}
      <Suspense>
        <AddToCart
          availableForSale={availableForSale}
          variants={productVariants}
        />
      </Suspense>
    </>
  );
}
