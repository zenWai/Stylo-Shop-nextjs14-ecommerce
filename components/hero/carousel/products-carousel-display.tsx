'use client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  FreeMode,
} from 'swiper/modules';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import type { Product } from '@/lib/shopify/types';
import { GridTileImage } from '@/components/grid/tile';

export default function ProductsCarouselDisplay({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="py-4">
      <Swiper
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous image from slide',
          nextSlideMessage: 'Next image from slide',
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        breakpoints={{
          100: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        freeMode={{
          enabled: true,
          momentum: true,
          sticky: true,
          momentumVelocityRatio: 0.8,
          minimumVelocity: 0.1,
        }}
        loop
        modules={[Navigation, Pagination, A11y, Autoplay, FreeMode]}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        slidesPerView={4}
        spaceBetween={10}
      >
        {products.map((product) => (
          <SwiperSlide key={product.handle}>
            <div className="swiper-container aspect-square flex-none">
              <Link
                className="relative h-full w-full"
                href={`/product/${product.handle}`}
              >
                <GridTileImage
                  alt={product.title}
                  fill
                  label={{
                    title: product.title,
                    amount: product.priceRange.minVariantPrice.amount,
                    currencyCode:
                      product.priceRange.minVariantPrice.currencyCode,
                  }}
                  loading="lazy"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  src={product.featuredImage.url}
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
        <button
          aria-label="Previous Product"
          className="custom-swiper-button-prev"
          type="button"
        >
          <ArrowLeftIcon className="h-8 w-8" />
        </button>
        <button
          aria-label="Next Product"
          className="custom-swiper-button-next"
          type="button"
        >
          <ArrowRightIcon className="h-8 w-8" />
        </button>
      </Swiper>
    </section>
  );
}
