import clsx from 'clsx';

export default function SkeletonCollectionListSearchPage() {
  const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
  const skeletonMobile = 'mb-1.5 animate-pulse rounded w-full h-8';
  const activeAndTitles = 'bg-neutral-800';
  const items = 'bg-neutral-400';
  return (
    <nav className="md:sticky md:top-28 md:z-10">
      <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 md:block lg:block">
        <div className={clsx(skeleton, activeAndTitles)} />
        <div className={clsx(skeleton, activeAndTitles)} />
        <div className={clsx(skeleton, items)} />
        <div className={clsx(skeleton, items)} />
        <div className={clsx(skeleton, items)} />
        <div className={clsx(skeleton, items)} />
        <div className={clsx(skeleton, items)} />
        <div className={clsx(skeleton, items)} />
        <div className={clsx(skeleton, items)} />
        <div className={clsx(skeleton, items)} />
      </div>
      <div className="flex-none md:hidden">
        <div className={clsx(skeletonMobile, activeAndTitles)} />
      </div>
    </nav>
  );
}
