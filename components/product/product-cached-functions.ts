'use server';
import { unstable_cache } from 'next/cache';
import {
  convertVariantsToCombinations,
  createVariantsHashTable,
} from '@/components/product/product-utils';
import type { ProductVariant } from '@/lib/shopify/types';

export const getCachedConvertVariantsToCombinations = unstable_cache(
  async (variants: ProductVariant[]) => {
    try {
      const cacheComb = await convertVariantsToCombinations(variants);
      //console.log('cached combin created')
      return cacheComb;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  [`product-cached-combinations-variants`],
);

export const getCachedVariantsHashTable = unstable_cache(
  async (variants: ProductVariant[]) => {
    try {
      const cacheHash = await createVariantsHashTable(variants);
      //console.log('cacheHash created')
      return cacheHash;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  ['product-cached-Variant-Hash-Table'],
);
