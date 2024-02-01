import Link from 'next/link';
import { getCollectionProducts } from '@/lib/shopify';
import { GridTileImage } from '@/components/grid/tile';
import type { Product } from '@/lib/shopify/types';
import CustomButtonLink from '@/components/hero/custom-button-link';

function SingleCtaItem({
  product,
  sale,
}: {
  product: Product;
  sale?: boolean;
}) {
  return (
    <Link
      className="relative block aspect-square h-full w-full"
      href={`/product/${product.handle}`}
    >
      <GridTileImage
        alt={product.title}
        fill
        label={{
          position: 'bottom',
          title: product.title,
          amount: product.priceRange.minVariantPrice.amount,
          currencyCode: product.priceRange.minVariantPrice.currencyCode,
        }}
        loading="lazy"
        sizes="(min-width: 768px) 33vw, 100vw"
        src={product.featuredImage.url}
      />
      {/* Sale label */}
      {sale ? (
        <div className="absolute top-0 m-1 rounded-full bg-white">
          <p className="rounded-full bg-blue-600 p-1 text-[10px] font-bold uppercase tracking-wide text-white sm:px-3 sm:py-1">
            Sale
          </p>
        </div>
      ) : null}
    </Link>
  );
}

export async function CustomCtaCollection({
  collection,
  title,
  limitItems = 0,
  tagLine,
  sale,
  withButton,
  buttonLabel = 'View More',
  buttonLinkTo = '/search',
}: {
  collection: string;
  title: string;
  limitItems?: number;
  tagLine?: string;
  sale?: boolean;
  withButton?: boolean;
  buttonLabel?: string;
  buttonLinkTo?: string;
}) {
  let ctaProducts;
  try {
    ctaProducts = await getCollectionProducts({ collection });
  } catch (error) {
    return null;
  }

  if (!ctaProducts[0] || limitItems < 0) return null;

  const products =
    limitItems > 0 ? ctaProducts.slice(0, limitItems) : ctaProducts;

  const customButton = withButton ? (
    <CustomButtonLink linkTo={buttonLinkTo} text={buttonLabel} />
  ) : undefined;

  return (
    <section className="bg-white py-12 text-gray-700 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-2xl font-bold sm:text-3xl">{title}</h2>
          {tagLine ? (
            <p className="mt-4 text-base text-gray-700">{tagLine}</p>
          ) : null}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {products.map((product) => (
            <SingleCtaItem key={product.title} product={product} sale={sale} />
          ))}
        </div>
        {customButton}
      </div>
    </section>
  );
}
