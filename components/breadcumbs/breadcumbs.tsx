import { clsx } from 'clsx';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className="flex flex-row flex-wrap font-windSong text-xl md:text-2xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active
                ? 'text-customBlack underline'
                : 'text-gray-600',
            )}
            key={breadcrumb.href}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
