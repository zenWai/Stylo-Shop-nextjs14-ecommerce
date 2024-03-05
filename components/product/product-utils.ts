import type {
  Money,
  ProductOption,
  ProductVariant,
  VariantsToCombinations,
} from '@/lib/shopify/types';

/**
 * Calculates the display price for a product based on the provided search parameters.
 * If all variants have the same price or if the search parameters do not match valid product options,
 * it returns the minimum variant price. Otherwise, it finds the matching variant based on the search parameters
 * and returns its price.
 */

export function productDisplayPrice(
  productMinPrice: Money,
  productMaxPrice: Money,
  productOptions: ProductOption[],
  searchParams: URLSearchParams,
  variantsHashTable: Record<string, ProductVariant>,
) {
  /* if all variants have the same price or if search parameters are not valid. */
  if (
    productMinPrice.amount === productMaxPrice.amount ||
    !areValidOptionsPresentInSearchParams(searchParams, productOptions)
  ) {
    return productMinPrice;
  }

  const searchKey = generateSearchKey(searchParams, productOptions);
  const matchingVariant = variantsHashTable[searchKey];
  // Any edge case outside availableForSale show minPrice
  return matchingVariant?.availableForSale
    ? matchingVariant.price
    : productMinPrice;
}

/**
 * Generates combinations of product variants as key-value pairs for each option.
 * This transformation facilitates efficient lookups by matching variant options
 * against user selections in the variant selector component. Each combination
 * includes the variant's ID, availability status, and dynamic option attributes
 * (e.g., color: 'Blue', material: 'Polyester', size: 'M'). This structure supports
 * the component in quickly determining which variants are available for sale based
 * on selected options
 */
export async function convertVariantsToCombinations(
  variants: ProductVariant[],
): Promise<VariantsToCombinations[]> {
  const map = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    // Adds key:value for each variant (ie. "color": "Black" and "size": 'M").
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));
  //console.log(map)
  return map;
}

/** Creates hashtable of variants for efficient lookup.
 * i.e of hashtable key, color:red;material:cotton;size:m
 * Will provide fast lookup
 */
export async function createVariantsHashTable(
  variants: ProductVariant[],
): Promise<Record<string, ProductVariant>> {
  const createVariantKey = (variant: ProductVariant): string => {
    return variant.selectedOptions
      .map((option) => `${option.name}:${option.value}`)
      .sort()
      .join(';')
      .toLowerCase();
  };

  return variants.reduce(
    async (accPromise, variant) => {
      const acc = await accPromise;
      const key = createVariantKey(variant);
      acc[key] = variant;
      return acc;
    },
    Promise.resolve({} as Record<string, ProductVariant>),
  );
}

function getValidOptionNames(options: ProductOption[]): string[] {
  return options.map((option) => option.name.toLowerCase());
}

export function areValidOptionsPresentInSearchParams(
  searchParams: URLSearchParams,
  options: ProductOption[],
): boolean {
  const validOptionNames = getValidOptionNames(options).map((name) =>
    name.toLowerCase(),
  ); // Normalize to lowercase for comparison
  const searchParamKeys = Array.from(searchParams.keys()).map((key) =>
    key.toLowerCase(),
  ); // Convert keys to an array and normalize

  return validOptionNames.every((validOptionName) =>
    searchParamKeys.includes(validOptionName),
  );
}

export function filterRelevantSearchParams(
  searchParams: URLSearchParams,
  options: ProductOption[],
): URLSearchParams {
  const validOptionNames = getValidOptionNames(options); // Already lowercased
  const filteredSearchParams = new URLSearchParams();

  validOptionNames.forEach((optionName) => {
    const value = searchParams.get(optionName);
    if (value !== null) {
      // Ensures the option is present in the searchParams
      filteredSearchParams.append(optionName, value);
    }
  });

  return filteredSearchParams;
}

/**
 * Generates a search key from URL search parameters and product options.
 * Filters the parameters to include only valid product options
 * and creates a sorted, lowercased string key.
 */
export function generateSearchKey(
  searchParamsProductPage: URLSearchParams,
  options: ProductOption[],
): string {
  const validOptionNames = getValidOptionNames(options).map((name) =>
    name.toLowerCase(),
  );

  const searchParamsArray = Array.from(searchParamsProductPage.entries());

  return searchParamsArray
    .filter(([key]) => validOptionNames.includes(key.toLowerCase()))
    .map(([key, value]) => {
      return `${key}:${value}`;
    })
    .sort()
    .join(';')
    .toLowerCase();
}

export function convertToURLSearchParams(
  searchParamsProductPage: Record<string, string | string[] | undefined>,
): URLSearchParams {
  const urlSearchParams = new URLSearchParams();

  Object.entries(searchParamsProductPage).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // If the value is an array, append each item under the same key
      value.forEach((item) => {
        urlSearchParams.append(key, item);
      });
    } else if (value !== undefined) {
      // Only append if the value is not undefined
      urlSearchParams.append(key, value);
    }
    // If the value is undefined, it's skipped
  });

  return urlSearchParams;
}
