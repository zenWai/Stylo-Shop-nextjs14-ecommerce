import { Suspense } from 'react';
import { productDisplayPrice } from '@/components/product/product-display-price';
import { getCachecombinations } from '@/components/product/product-cached-functions';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import type { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export async function ProductDescription({
  product,
  searchParamsProductPage,
}: {
  product: Product;
  searchParamsProductPage: URLSearchParams;
}) {
  const hasNoOptionsOrJustOneOption =
    !product.options.length ||
    (product.options.length === 1 && product.options[0]?.values.length === 1);

  const displayPrice = await productDisplayPrice(
    product,
    searchParamsProductPage,
  );

  const cachedCombinations = hasNoOptionsOrJustOneOption
    ? []
    : await getCachecombinations(product.variants);

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-coralPink p-2 text-sm text-white">
          <Price
            amount={displayPrice.amount}
            currencyCode={displayPrice.currencyCode}
          />
        </div>
      </div>
      <Suspense>
        {!hasNoOptionsOrJustOneOption ? (
          <VariantSelector
            cachedCombinations={cachedCombinations}
            options={product.options}
            variants={product.variants}
          />
        ) : null}
      </Suspense>
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight"
          html={product.descriptionHtml}
        />
      ) : null}
      <Suspense>
        <AddToCart
          availableForSale={product.availableForSale}
          variants={product.variants}
        />
      </Suspense>
    </>
  );
}
