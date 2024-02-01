'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { FilterItem } from './item';
import type { ListItemType } from '.';

export default function FilterItemDropdown({ list }: { list: ListItemType[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    list.forEach((listItem: ListItemType) => {
      if (
        ('path' in listItem && pathname === listItem.path) ||
        ('slug' in listItem && searchParams.get('sort') === listItem.slug)
      ) {
        setActive(listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm"
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Space') {
            setOpenSelect(!openSelect);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div>{active}</div>
        <ChevronDownIcon className="h-4" />
      </div>
      {openSelect ? (
        <div
          className="absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md"
          onClick={() => {
            setOpenSelect(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Space') {
              setOpenSelect(false);
            }
          }}
          role="button"
          tabIndex={0}
        >
          {list.map((item: ListItemType, i) => (
            <FilterItem item={item} key={i} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
