import { Suspense } from 'react';
import type { SortFilterItemType } from 'lib/constants';
import FilterItemDropdown from './dropdown';
import { FilterItem } from './item';

export type ListItemType = SortFilterItemType | PathFilterItemType;
export type PathFilterItemType = { title: string; path: string };

function FilterItemList({ list }: { list: ListItemType[] }) {
  return (
    <>
      {list.map((item: ListItemType, i) => (
        <FilterItem item={item} key={i} />
      ))}
    </>
  );
}

export default function FilterList({
  list,
  title,
}: {
  list: ListItemType[];
  title?: string;
}) {
  return (
    <nav>
      {title ? (
        <h3 className="hidden text-xs text-neutral-500 md:block">{title}</h3>
      ) : null}
      <ul className="hidden md:block">
        <Suspense>
          <FilterItemList list={list} />
        </Suspense>
      </ul>
      <ul className="md:hidden">
        <Suspense>
          <FilterItemDropdown list={list} />
        </Suspense>
      </ul>
    </nav>
  );
}
