import clsx from 'clsx';
import React from 'react';

function Price({
  amount,
  className,
  currencyCode = 'USD',
  currencyCodeClassName,
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) {
  return (
    <p className={className} suppressHydrationWarning>
      {new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol',
      }).format(parseFloat(amount))}
      <span className={clsx('ml-1 inline', currencyCodeClassName)}>
        {currencyCode}
      </span>
    </p>
  );
}

export default Price;
