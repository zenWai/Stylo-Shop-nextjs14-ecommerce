import { Bars3Icon } from '@heroicons/react/24/outline';

export default function SkeletonMobileMenu() {
  return (
    <button
      aria-label="Open mobile menu"
      className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden"
      type="button"
    >
      <Bars3Icon className="h-4" />
    </button>
  );
}
