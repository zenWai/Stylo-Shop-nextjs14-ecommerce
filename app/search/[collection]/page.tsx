import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCollection, getCollectionProducts } from 'lib/shopify';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  const { src, width, height } = collection.image ?? {};

  return {
    title: collection.seo?.title ?? collection.title,
    description:
      (collection.seo?.description ?? collection.description) ||
      `${collection.title} products`,
    openGraph: src
      ? {
          url: `/search/${collection.handle}`,
          images: [
            {
              url: src,
              width,
              height,
            },
          ],
        }
      : null,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { sort } = searchParams as Record<string, string>;
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
  });
  /*const products:any = await mockFetchDelay(() => getCollectionProducts({ collection: params.collection, sortKey, reverse }));*/
  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">No products found in this collection</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
