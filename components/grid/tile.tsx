import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-gray-400 bg-customBeige hover:border-blushPink',
        {
          relative: label,
          'border-2 border-blue-600': active,
          'border-neutral-200': !active,
        },
      )}
    >
      {props.src ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is inherited from `props`, which is being enforced with TypeScript
        <Image
          className={clsx('relative h-full w-full object-fill', {
            'transition duration-300 ease-in-out group-hover:scale-105':
              isInteractive,
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
          title={label.title}
        />
      ) : null}
    </div>
  );
}
