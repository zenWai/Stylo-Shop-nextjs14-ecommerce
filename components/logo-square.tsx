import LogoIcon from '@/components/icons/logo';
import clsx from 'clsx';

export default function LogoSquare({ size }: { size?: 'sm' }) {
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-center border border-neutral-200 bg-customBeige',
        {
          'h-[40px] w-[40px] rounded-xl': !size,
          'h-[30px] w-[30px] rounded-lg': size === 'sm'
        }
      )}
    >
      {/* #TODO: svg logo is making dom have too many items */}
      <LogoIcon
        className={clsx({
          'h-[40px] w-[40px] rounded-xl': !size,
          'h-[30px] w-[30px] rounded-lg': size === 'sm'
        })}
      />
      {/* Can't static import using edge? Without static import there are too many cache misses!
       * Works on production but not on development!
       * #TODO: Check later
       */}
      {/*<Image
        src={logo} alt="logo" width={40} height={40}
      />*/}
    </div>
  );
}
