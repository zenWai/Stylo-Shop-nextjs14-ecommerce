import { default as NextDynamic } from 'next/dynamic';
import { Link } from 'next-view-transitions';
import SkeletonMobileMenu from '@/components/skeletons/mobile-menu';
import SkeletonSearchInput from '@/components/skeletons/search-input';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import type { Menu } from 'lib/shopify/types';

const MobileMenu = NextDynamic(() => import('./mobile-menu'), {
  ssr: false,
  loading: () => <SkeletonMobileMenu />,
});
const Search = NextDynamic(() => import('./search'), {
  ssr: false,
  loading: () => <SkeletonSearchInput />,
});
const Cart = NextDynamic(() => import('../../cart'), {
  ssr: false,
  loading: () => <OpenCart />,
});

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <header className="sticky top-0 z-50">
      <nav className="relative flex items-center justify-between bg-customBeige p-4 shadow-md lg:px-6">
        <div className="block flex-none md:hidden">
          <MobileMenu menu={menu} />
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full font-windSong text-black md:w-1/3">
            <Link
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
              href="/"
            >
              <LogoSquare />
              <div className="ml-2 flex-none text-2xl font-bold md:hidden lg:block">
                {SITE_NAME}
              </div>
            </Link>
            {menu.length ? (
              <ul className="hidden gap-6 text-xl underline md:flex md:items-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link className="hover:text-black/50" href={item.path}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Search />
          </div>
          <div className="flex justify-end md:w-1/3">
            <Cart />
          </div>
        </div>
      </nav>
    </header>
  );
}
