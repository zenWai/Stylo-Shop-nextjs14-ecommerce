'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { generateSearchKey } from '@/components/product/product-utils';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import type { ProductOption, ProductVariant } from 'lib/shopify/types';

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean | undefined;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-coralPink p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
        type="button"
      >
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-disabled
        aria-label="Please select an option"
        className={clsx(buttonClasses, disabledClasses)}
        type="button"
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-disabled={pending}
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        disabledClasses: pending,
      })}
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      type="submit"
    >
      <div className="absolute left-0 ml-4">
        {pending ? (
          <LoadingDots className="mb-3 bg-white" />
        ) : (
          <PlusIcon className="h-5" />
        )}
      </div>
      Add To Cart
    </button>
  );
}

export default function AddToCart({
  variantsHashTable,
  productOptions,
  variants,
}: {
  variantsHashTable: Record<string, ProductVariant>;
  productOptions: ProductOption[];
  variants: ProductVariant[];
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  let searchKey, variant;
  // When only when variant we don't need to search
  if (!defaultVariantId) {
    searchKey = generateSearchKey(searchParams, productOptions);
    variant = variantsHashTable[searchKey];
  }

  const selectedVariantId = variant?.id ?? defaultVariantId;
  const availableForSale =
    variant?.availableForSale ?? variants.some((v) => v.availableForSale);
  const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
