import { getCollectionProducts } from '@/lib/shopify';
import { GridTileImage } from '@/components/grid/tile';
import Link from 'next/link';
import type { Product } from '@/lib/shopify/types';
import CustomButtonLink from '@/components/hero/custom-button-link';

export async function CustomCtaCollection({
  collection,
  title,
  limitItems = 0,
  tagLine = null,
  sale = false,
  withButton = false,
  buttonLabel = null,
  buttonLinkTo = null,
}: {
  collection: string;
  title: string;
  limitItems?: number;
  tagLine?: null | string;
  sale?: boolean;
  withButton?: boolean;
  buttonLabel?: null | string;
  buttonLinkTo?: null | string;
}) {
  const ctaProducts = await getCollectionProducts({
    collection: collection,
  });

  if (!ctaProducts[0]) return null;
  if (limitItems < 0) return null;

  const products =
    limitItems > 0 ? ctaProducts.slice(0, limitItems) : ctaProducts;

  buttonLabel ??= 'View More';
  buttonLinkTo ??= '/search/all';
  const customButton = withButton ? (
    <CustomButtonLink text={buttonLabel} linkTo={buttonLinkTo} />
  ) : null;

  const SingleCtaItem = ({ product }: { product: Product }) => (
    <Link
      className="relative block aspect-square h-full w-full"
      href={`/product/${product.handle}`}
    >
      <GridTileImage
        src={product.featuredImage.url}
        fill
        sizes={'(min-width: 768px) 33vw, 100vw'}
        loading="lazy"
        alt={product.title}
        label={{
          position: 'bottom',
          title: product.title as string,
          amount: product.priceRange.minVariantPrice.amount,
          currencyCode: product.priceRange.minVariantPrice.currencyCode,
        }}
      />
      {/* Sale label */}
      {sale && (
        <div className="absolute top-0 m-1 rounded-full bg-white">
          <p className="rounded-full bg-blue-600 p-1 text-[10px] font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
            Sale
          </p>
        </div>
      )}
    </Link>
  );

  return (
    <section className="bg-white py-12 text-gray-700 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">{title}</h2>
          {tagLine && <p className="mt-4 text-base text-gray-700">{tagLine}</p>}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {products?.map((product) => (
            <SingleCtaItem key={product.title} product={product} />
          ))}
        </div>
        {customButton}
      </div>
    </section>
  );
}
