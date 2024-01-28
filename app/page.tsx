import ProductsCarousel from '@/components/hero/carousel/products-carousel';
import { CustomCtaCollection } from '@/components/hero/custom-cta-collection';
import { ThreeItemGrid } from 'components/grid/three-items';
import Video from '../components/hero/video';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const collection = {
    ctaEarrings: `hidden-homepage-hero-cta-earrings`,
    ctaNecklaceBracelet: 'hidden-homepage-carousel-necklace-bracelet',
    ctaShiny: 'hidden-homepage-carousel-shiny',
    featured: 'hidden-homepage-featured-items',
    earrings: 'hidden-homepage-carousel-earrings',
    sale: 'hidden-homepage-hero-cta-sale-items'
  };
  return (
    <>
      <Video fileName={'video.mp4'} />
      <CustomCtaCollection
        collection={collection.ctaEarrings}
        title={'Our Most exquisite Earrings'}
        limitItems={4}
        tagLine={
          'Explore the collection of our exquisite earrings: sophistication in every detail.'
        }
        withButton={true}
        buttonLabel="View All Earrings"
        buttonLinkTo={'/search/earrings'}
      />
      <ProductsCarousel collection={collection.earrings} />
      <ThreeItemGrid collection={collection.featured} />
      <ProductsCarousel collection={collection.ctaNecklaceBracelet} />
      <CustomCtaCollection
        collection={collection.sale}
        title={'Our featured Special Jewels'}
        limitItems={8}
        tagLine={'Sparkling Sales Await!'}
        sale={true}
        withButton={true}
        buttonLabel="See Specials"
        buttonLinkTo={'/search'}
      />
      <ProductsCarousel collection={collection.ctaShiny} />
    </>
  );
}
