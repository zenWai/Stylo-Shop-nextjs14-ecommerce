import Link from 'next/link';
import { GridTileImage } from '@/components/grid/tile';
import { getProductRecommendations } from '@/lib/shopify';

export async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
            key={product.handle}
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
            >
              <GridTileImage
                alt={product.title}
                fill
                label={{
                  title: product.title,
                  amount: product.priceRange.minVariantPrice.amount,
                  currencyCode: product.priceRange.minVariantPrice.currencyCode,
                }}
                loading="lazy"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                src={product.featuredImage.url}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
