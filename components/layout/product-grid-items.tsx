import Link from 'next/link';
import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import type { Product } from 'lib/shopify/types';

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item className="animate-fadeIn" key={product.handle}>
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.handle}`}
          >
            <GridTileImage
              alt={product.title}
              fill
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode,
              }}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              src={product.featuredImage.url}
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
