import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css';
import './swiper.css';
import { getCollectionProducts } from '@/lib/shopify';
import { default as NextDynamic } from 'next/dynamic';
const SwiperComponent = NextDynamic(() => import('./products-carousel-display'), { ssr: true });
export default async function ProductsCarousel({ collection }: { collection: string }) {
  const products = await getCollectionProducts({
    collection: collection
  });
  return (
    <>
      <SwiperComponent products={products} />
    </>
  );
}
