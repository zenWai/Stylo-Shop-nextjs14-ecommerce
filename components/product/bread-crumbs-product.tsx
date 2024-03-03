import Breadcrumbs from '@/components/breadcumbs/breadcrumbs';

export default function BreadCrumbsProduct({
  productHandler,
  productTags,
  productTitle,
}: {
  productHandler: string;
  productTags: string[];
  productTitle: string;
}) {
  const logoHome = (
    <svg
      className="h-6 w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
      <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
    </svg>
  );
  const logoLabel = (
    <svg
      className="h-6 w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
        fillRule="evenodd"
      />
    </svg>
  );
  return (
    <Breadcrumbs
      breadcrumbs={[
        { label: 'Home', href: '/', logo: logoHome },
        ...productTags.map((tag) => ({
          label: tag,
          href: `/search?q=${tag}`,
          logo: logoLabel,
        })),
        {
          label: productTitle,
          href: `/product/${productHandler}/`,
          active: true,
        },
      ]}
    />
  );
}
