import Link from 'next/link';

import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME ?? SITE_NAME ?? '';

  return (
    <footer className="bg-customBeige text-sm text-black">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Link className="flex items-center gap-2 text-black md:pt-1" href="/">
            <LogoSquare size="sm" />
            <span className="ml-2 flex-none font-greatVibes text-lg font-bold text-black">
              {SITE_NAME}
            </span>
          </Link>
        </div>
        <FooterMenu menu={menu} />
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 text-black md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.')
              ? '.'
              : ''}{' '}
            All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Stylo Jewelry</p>
        </div>
      </div>
    </footer>
  );
}
