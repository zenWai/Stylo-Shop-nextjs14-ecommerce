import AddToCart from '@/components/cart/add-to-cart';
import Price from '@/components/price';
import {
  getCachedConvertVariantsToCombinations,
  getCachedVariantsHashTable,
} from '@/components/product/product-cached-functions';
import VariantSelectorAndPrice from '@/components/product/variant-selector-and-price';
import Prose from 'components/prose';
import type { Money, ProductOption, ProductVariant } from 'lib/shopify/types';

export default async function ProductDescription({
  productDescriptionHtml,
  productMaxPrice,
  productMinPrice,
  productOptions,
  productTitle,
  productVariants,
}: {
  productDescriptionHtml: string;
  productMaxPrice: Money;
  productMinPrice: Money;
  productOptions: ProductOption[];
  productTitle: string;
  productVariants: ProductVariant[];
}) {
  const hasOneOptionOrLess =
    !productOptions.length ||
    (productOptions.length === 1 && productOptions[0]?.values.length === 1);
  let cachedConvertVariantsToCombinations;
  let variantsHashTable = {};
  if (!hasOneOptionOrLess) {
    cachedConvertVariantsToCombinations =
      await getCachedConvertVariantsToCombinations(productVariants);
    variantsHashTable = await getCachedVariantsHashTable(productVariants);
  }

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <h1 className="mb-2 text-5xl font-medium">{productTitle}</h1>
        {hasOneOptionOrLess ? (
          <div className="mr-auto w-auto rounded-full bg-coralPink p-2 text-sm text-black">
            <Price
              amount={productMinPrice.amount}
              currencyCode={productMinPrice.currencyCode}
            />
          </div>
        ) : (
          <VariantSelectorAndPrice
            cachedConvertVariantsToCombinations={
              cachedConvertVariantsToCombinations
            }
            productMaxPrice={productMaxPrice}
            productMinPrice={productMinPrice}
            productOptions={productOptions}
            variantsHashTable={variantsHashTable}
          />
        )}
      </div>
      {productDescriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight"
          html={productDescriptionHtml}
        />
      ) : null}
      <AddToCart
        productOptions={productOptions}
        variants={productVariants}
        variantsHashTable={variantsHashTable}
      />
    </>
  );
}
