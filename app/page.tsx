import { default as NextDynamic } from 'next/dynamic';
import Video from '../components/hero/video';

const ProductsCarousel = NextDynamic(
  () => import('@/components/hero/carousel/products-carousel'),
  { ssr: false },
);
const CustomCtaCollection = NextDynamic(
  () =>
    import('@/components/hero/custom-cta-collection').then(
      (mod) => mod.CustomCtaCollection,
    ),
  { ssr: false },
);
const ThreeItemGrid = NextDynamic(
  () => import('components/grid/three-items').then((mod) => mod.ThreeItemGrid),
  { ssr: false },
);

export const runtime = 'edge';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website',
    url: baseUrl,
  },
  alternates: { canonical: baseUrl },
};

export default async function HomePage() {
  const collection = {
    ctaEarrings: `hidden-homepage-hero-cta-earrings`,
    ctaNecklaceBracelet: 'hidden-homepage-carousel-necklace-bracelet',
    ctaShiny: 'hidden-homepage-carousel-shiny',
    featured: 'hidden-homepage-featured-items',
    earrings: 'hidden-homepage-carousel-earrings',
    sale: 'hidden-homepage-hero-cta-sale-items',
  };
  return (
    <>
      <Video fileName="video.mp4" />
      <CustomCtaCollection
        buttonLabel="View All Earrings"
        buttonLinkTo="/search/earrings"
        collection={collection.ctaEarrings}
        limitItems={4}
        tagLine="Explore the collection of our exquisite earrings: sophistication in every detail."
        title="Our Most exquisite Earrings"
        withButton
      />
      <ProductsCarousel collection={collection.earrings} />
      <ThreeItemGrid collection={collection.featured} />
      <ProductsCarousel collection={collection.ctaNecklaceBracelet} />
      <CustomCtaCollection
        buttonLabel="See Specials"
        buttonLinkTo="/search"
        collection={collection.sale}
        limitItems={8}
        sale
        tagLine="Sparkling Sales Await!"
        title="Our featured Special Jewels"
        withButton
      />
      <ProductsCarousel collection={collection.ctaShiny} />
    </>
  );
}
