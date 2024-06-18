import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css';
import './swiper.css';
import ProductsCarouselDisplay from '@/components/hero/carousel/products-carousel-display';
import { getCollectionProducts } from '@/lib/shopify';

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

  return <ProductsCarouselDisplay products={simplifiedProducts} />;
}
