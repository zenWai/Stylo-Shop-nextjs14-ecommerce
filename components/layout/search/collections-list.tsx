import FilterList from '@/components/layout/search/filter';
import { getCollections } from 'lib/shopify';

export default async function CollectionsList() {
  const collections = await getCollections();
  /*const collections:any = await mockFetchDelay(() => getCollections());*/
  return <FilterList list={collections} title="Collections" />;
}
