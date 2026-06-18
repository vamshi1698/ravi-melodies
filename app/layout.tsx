import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Ravi Melodies Events & Orchestra | Live Music for Weddings & Events in Kadapa',
  description: 'Premium live orchestra services for weddings, birthday parties, cultural programs, and corporate events in Kadapa, Badvel, and Andhra Pradesh. Live singers, DJ, sound systems, and professional anchoring.',
  keywords: 'orchestra in Kadapa, live orchestra in Badvel, wedding orchestra services, event orchestra Andhra Pradesh, live music for weddings, DJ services Kadapa, cultural program orchestra, birthday party entertainment',
  authors: [{ name: 'Anakarla Ravindra' }],
  creator: 'Ravi Melodies Events & Orchestra',
  publisher: 'Ravi Melodies Events & Orchestra',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ravimelodies.com',
    siteName: 'Ravi Melodies Events & Orchestra',
    title: 'Ravi Melodies Events & Orchestra | Live Music for Weddings & Events',
    description: 'Premium live orchestra services for weddings, birthday parties, cultural programs, and corporate events. Creating unforgettable musical moments.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ravi Melodies Events & Orchestra - Live Performances',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ravi Melodies Events & Orchestra',
    description: 'Premium live orchestra services for weddings and events in Kadapa, Andhra Pradesh',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="IN-AP" />
        <meta name="geo.placename" content="Gopavaram, Badvel, Kadapa District" />
        <link rel="canonical" href="https://ravimelodies.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Ravi Melodies Events & Orchestra',
              image: '/og-image.jpg',
              telephone: '+91-9347456157',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Gopavaram',
                addressLocality: 'Badvel',
                addressRegion: 'Kadapa District',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '14.7352',
                longitude: '78.8754',
              },
              openingHours: 'Mo-Su 09:00-21:00',
              priceRange: '$$',
              areaServed: 'Andhra Pradesh',
              serviceType: ['Live Orchestra', 'DJ Services', 'Event Entertainment', 'Wedding Music'],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-matte-black text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
