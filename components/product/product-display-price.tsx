import { getCachedVariantsHashTable } from '@/components/product/product-cached-functions';
import type { Product, ProductOption } from '@/lib/shopify/types';

/**
 * Calculates the display price for a product based on the provided search parameters.
 * If all variants have the same price or if the search parameters do not match valid product options,
 * it returns the minimum variant price. Otherwise, it finds the matching variant based on the search parameters
 * and returns its price.
 */
export async function productDisplayPrice(
  product: Product,
  searchParamsProductPage: URLSearchParams,
) {
  /* if all variants have the same price or if search parameters are not valid. */
  if (
    product.priceRange.minVariantPrice.amount ===
      product.priceRange.maxVariantPrice.amount ||
    !areValidOptionsPresentInSearchParams(
      searchParamsProductPage,
      product.options,
    )
  ) {
    return product.priceRange.minVariantPrice;
  }

  // Retrieve a hash table of product variants for efficient search.
  const variantsHashTable = await getCachedVariantsHashTable(product.variants);
  // Generate a key based on the search parameters to find a matching variant.
  const searchKey = generateSearchKey(searchParamsProductPage, product.options);
  const matchingVariant = variantsHashTable[searchKey];

  return matchingVariant
    ? matchingVariant.price
    : product.priceRange.minVariantPrice;
}

function getValidOptionNames(options: ProductOption[]): string[] {
  return options.map((option) => option.name.toLowerCase());
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
