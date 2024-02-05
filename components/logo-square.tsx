import clsx from 'clsx';
import Image from 'next/image';
import logoShop from '@/public/logonew.png';

export default function LogoSquare({ size }: { size?: 'sm' }) {
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-center border border-neutral-200 bg-customBeige',
        {
          'h-[40px] w-[40px] rounded-xl': !size,
          'h-[30px] w-[30px] rounded-lg': size === 'sm',
        },
      )}
    >
      <Image alt="logo" height={40} src={logoShop} width={40} />
    </div>
  );
}
