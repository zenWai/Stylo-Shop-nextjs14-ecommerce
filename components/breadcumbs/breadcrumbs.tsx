import { clsx } from 'clsx';
import { Link } from 'next-view-transitions';
import React from 'react';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
  logo?: React.ReactNode;
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
            aria-current={breadcrumb.active ? 'page' : undefined}
            className={clsx('flex items-center', {
              'text-customBlack underline': breadcrumb.active,
              'text-gray-600': !breadcrumb.active,
            })}
            key={breadcrumb.href}
          >
            <Link className="flex items-center" href={breadcrumb.href}>
              {breadcrumb.logo ? (
                <span className="flex items-center justify-center">
                  {breadcrumb.logo}
                </span>
              ) : null}
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 flex items-center">
                {/*separator*/}
                <svg
                  aria-hidden="true"
                  className="mx-1 block h-3 w-3 text-customBlack rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 6 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m1 9 4-4-4-4"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
