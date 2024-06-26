import { Link } from 'next-view-transitions';
import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === 'full'
          ? 'md:col-span-4 md:row-span-2'
          : 'md:col-span-2 md:row-span-1'
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
      >
        <GridTileImage
          alt={item.title}
          fill
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title,
            amount: item.priceRange.minVariantPrice.amount,
            currencyCode: item.priceRange.minVariantPrice.currencyCode,
          }}
          loading="lazy"
          priority={priority}
          sizes={
            size === 'full'
              ? '(min-width: 768px) 66vw, 100vw'
              : '(min-width: 768px) 33vw, 100vw'
          }
          src={item.featuredImage.url}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid({ collection }: { collection: string }) {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection,
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 py-2 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem item={firstProduct} priority={false} size="full" />
      <ThreeItemGridItem item={secondProduct} priority={false} size="half" />
      <ThreeItemGridItem item={thirdProduct} priority={false} size="half" />
    </section>
  );
}
