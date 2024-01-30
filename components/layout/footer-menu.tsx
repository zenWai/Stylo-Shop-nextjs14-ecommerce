import clsx from 'clsx';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';

const FooterMenuItem = ({ item }: { item: Menu }) => {
  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          'block p-2 text-lg text-black underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm',
        )}
      >
        {item.title}
      </Link>
    </li>
  );
};

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul className="flex flex-col gap-4 md:flex-row md:gap-8">
        {menu.map((item: Menu) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
