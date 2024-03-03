import type { Metadata } from 'next';
import { default as NextDynamic } from 'next/dynamic';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { Gallery } from 'components/product/gallery';
import { HIDDEN_PRODUCT_TAG } from 'lib/constants';
import { getProduct } from 'lib/shopify';
import type { Image } from 'lib/shopify/types';

const RelatedProducts = NextDynamic(
  () =>
    import('@/components/related-products').then((mod) => mod.RelatedProducts),
  { ssr: true },
);

const ProductDescription = NextDynamic(
  () => import('@/components/product/product-description'),
  { ssr: true },
);

const BreadCrumbsProduct = NextDynamic(
  () => import('@/components/product/bread-crumbs-product'),
  { ssr: true },
);
export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) notFound();
  const productBaseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/product/${params.handle}`
    : `http://localhost:3000/product/${params.handle}`;

  const { url, width, height, altText: alt } = product.featuredImage;

  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    alternates: {
      canonical: productBaseUrl,
    },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          url: productBaseUrl,
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProduct(params.handle);

  if (!product) notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <Script
        id="product-schema"
        strategy="afterInteractive"
        type="application/ld+json"
      >
        {JSON.stringify(productJsonLd)}
      </Script>

      <div className="mx-auto max-w-screen-2xl px-4 py-8">
        <BreadCrumbsProduct
          productHandler={product.handle}
          productTags={product.tags}
          productTitle={product.title}
        />
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            {product.images ? (
              <Gallery
                images={product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            ) : null}
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription
              productDescriptionHtml={product.descriptionHtml}
              productMaxPrice={product.priceRange.maxVariantPrice}
              productMinPrice={product.priceRange.minVariantPrice}
              productOptions={product.options}
              productTitle={product.title}
              productVariants={product.variants}
            />
          </div>
        </div>
        <RelatedProducts id={product.id} />
      </div>
    </>
  );
}
