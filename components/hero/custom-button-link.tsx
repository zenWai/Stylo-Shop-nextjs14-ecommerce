import Link from 'next/link';

export default function CustomButtonLink({ text, linkTo }: { text: string; linkTo: string }) {
  return (
    <div className="mt-4 flex justify-center">
      <Link
        className="relative inline-flex items-center justify-center rounded-full bg-coralPink p-4 tracking-wide text-white hover:opacity-80"
        href={linkTo}
      >
        {text}
      </Link>
    </div>
  );
}
