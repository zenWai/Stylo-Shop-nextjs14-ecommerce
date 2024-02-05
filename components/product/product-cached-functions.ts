'use server';
import { unstable_cache } from 'next/cache';
import type { ProductVariant } from '@/lib/shopify/types';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

/**
 * Converts product variants to combinations
 * with additional key/value pairs for each option.
 * example key/value pairs, color: 'Blue', material: 'Polyester', size: 'M'
 */
async function combinations(
  variants: ProductVariant[],
): Promise<Combination[]> {
  return variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    // Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));
}

export const getCachecombinations = unstable_cache(
  async (variants: ProductVariant[]) => {
    try {
      const cacheComb = await combinations(variants);
      return cacheComb;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  // #TODO: make unique to address changes on shopify backend or revalidate?
  [`product-cached-combinations-variants`],
);

/**
 * Creates a sorted key from variant options for hashing.
 */
function createVariantKey(variant: ProductVariant): string {
  const sortedOptions = variant.selectedOptions
    .map((option) => `${option.name}:${option.value}`)
    .sort()
    .join(';');
  return sortedOptions.toLowerCase();
}

/* Creates hashtable of variants for efficient lookup.
 * i.e of hashtable key, color:red;material:cotton;size:m
 * Will provide fast lookup
 */
async function createVariantsHashTable(
  variants: ProductVariant[],
): Promise<Record<string, ProductVariant>> {
  const promise = variants.reduce(
    async (accPromise, variant) => {
      const acc = await accPromise;
      const key = createVariantKey(variant);
      acc[key] = variant;
      return acc;
    },
    Promise.resolve({} as Record<string, ProductVariant>),
  );
  return promise;
}

export const getCachedVariantsHashTable = unstable_cache(
  async (variants: ProductVariant[]) => {
    try {
      const cacheHash = await createVariantsHashTable(variants);
      return cacheHash;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  // #TODO: make unique to address changes on shopify backend or revalidate?
  ['product-cached-Variant-Hash-Table'],
);
