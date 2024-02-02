import Image from 'next/image';
import CustomButtonLink from '@/components/hero/custom-button-link';
import { CustomCtaCollection } from '@/components/hero/custom-cta-collection';
import shopLogo from '@/public/logonew.png';

export default function NotFound() {
  return (
    <>
      <div className="items-top mt-6 flex justify-center bg-customBeige">
        <div className="text-center">
          {/* Image */}
          <div className="relative inline-block animate-bounceUp">
            <Image alt="Stylo Jewels Logo" src={shopLogo} />
          </div>
          {/* Text */}
          <div className="mt-4 tracking-widest">
            <span className="text-xl text-gray-500">
              Sorry, We couldn&apos;t find what you are looking for!
            </span>
          </div>
          {/* Button */}
          <div className="my-6">
            <CustomButtonLink linkTo="/search/" text="View All Jewels" />
          </div>
        </div>
      </div>
      {/* Special Jewels */}
      <CustomCtaCollection
        buttonLabel="See Specials"
        buttonLinkTo="/search"
        collection="hidden-homepage-hero-cta-sale-items"
        limitItems={8}
        sale
        tagLine="Sparkling Sales Await!"
        title="Our featured Special Jewels"
        withButton
      />
    </>
  );
}
