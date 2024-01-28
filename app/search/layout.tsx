import Loading from '@/app/search/loading';
import CollectionsList from '@/components/layout/search/collections-list';
import SkeletonCollectionListSearchPage from '@/components/skeletons/collection-list-search-page';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 py-8 text-black md:flex-row">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <Suspense fallback={<SkeletonCollectionListSearchPage />}>
            <CollectionsList />
          </Suspense>
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
    </Suspense>
  );
}
