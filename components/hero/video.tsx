import Image from 'next/image';
import { list } from '@vercel/blob';

export default async function Video({ fileName }: { fileName: string }) {
  const { blobs } = await list({
    prefix: fileName,
    limit: 1,
  });
  if (!blobs[0]) return null;
  const { url } = blobs[0];
  return (
    <section>
      <div className="relative h-screen min-w-full overflow-hidden">
        {/* Video */}
        <video
          autoPlay
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
          loop
          muted
          playsInline //ios safari fix
          preload="auto"
        >
          <source src={url} type="video/mp4" />
          {/* Fallback image for browsers that don't support video */}
          <Image
            alt="Hero Video image"
            className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
            height="500"
            src="/video-fallback.webp"
            width="500"
          />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />

        {/* Content overlay */}
        <div className="relative z-10 flex h-full items-center justify-center text-white">
          <div className="text-center">
            <h1 className="font-windSong text-4xl text-customBeige md:text-8xl">
              Handcrafted Elegance
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
