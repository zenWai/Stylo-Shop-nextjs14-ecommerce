'use client';
import Link from 'next/link';
import { GridTileImage } from '@/components/grid/tile';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  FreeMode,
} from 'swiper/modules';
import { Product } from '@/lib/shopify/types';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function ProductsCarouselDisplay({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="py-4">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay, FreeMode]}
        slidesPerView={4}
        spaceBetween={10}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        loop
        freeMode={{
          enabled: true,
          momentum: true,
          sticky: true,
          momentumVelocityRatio: 0.8,
          minimumVelocity: 0.1,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous image from slide',
          nextSlideMessage: 'Next image from slide',
        }}
        breakpoints={{
          100: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={`${product.handle}`}>
            <div className="swiper-container aspect-square flex-none">
              <Link
                href={`/product/${product.handle}`}
                className="relative h-full w-full"
              >
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.minVariantPrice.amount,
                    currencyCode:
                      product.priceRange.minVariantPrice.currencyCode,
                  }}
                  src={product.featuredImage?.url}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
        <button
          className="custom-swiper-button-prev"
          aria-label="Previous Product"
        >
          <ArrowLeftIcon className="h-8 w-8" />
        </button>
        <button className="custom-swiper-button-next" aria-label="Next Product">
          <ArrowRightIcon className="h-8 w-8" />
        </button>
      </Swiper>
    </section>
  );
}
