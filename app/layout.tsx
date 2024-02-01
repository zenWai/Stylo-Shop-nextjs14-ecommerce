import { GeistSans } from 'geist/font/sans';
import { Great_Vibes, WindSong } from 'next/font/google';
import type { ReactNode } from 'react';
import { ensureStartsWith } from 'lib/utils';
import { Navbar } from 'components/layout/navbar';
import './globals.css';
import Footer from '../components/layout/footer';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR
  ? ensureStartsWith(TWITTER_CREATOR, '@')
  : undefined;
const twitterSite = TWITTER_SITE
  ? ensureStartsWith(TWITTER_SITE, 'https://')
  : undefined;
const siteName = SITE_NAME ?? 'Website';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
};

const windSong = WindSong({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500'],
  variable: '--font-windSong',
});
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-greatVibes',
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      className={`${GeistSans.variable} ${windSong.variable} ${greatVibes.variable}`}
      lang="en"
    >
      <body className="bg-customBeige text-black selection:bg-teal-300">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
