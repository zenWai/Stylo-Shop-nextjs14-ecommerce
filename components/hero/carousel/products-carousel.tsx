import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css';
import './swiper.css';
import { default as NextDynamic } from 'next/dynamic';
import { getCollectionProducts } from '@/lib/shopify';

const SwiperComponent = NextDynamic(
  () => import('./products-carousel-display'),
  // Swiper support SSR to some extent, this way would be rendered into the HTML sent to the client,
  // making it more SEO friendly.
  // ssr: false here is trading that off for
  // a faster dom content loaded and a bit faster FCP LCP specially on non-static
  { ssr: true },
);
export default async function ProductsCarousel({
  collection,
}: {
  collection: string;
}) {
  const products = await getCollectionProducts({
    collection,
  });
  const simplifiedProducts = products.map((product) => ({
    handle: product.handle,
    title: product.title,
    priceRange: product.priceRange,
    imageUrl: product.featuredImage.url,
  }));

  return <SwiperComponent products={simplifiedProducts} />;
}
