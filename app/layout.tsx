import type { Metadata, Viewport } from 'next';
import { Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'ASAR HOLDING — строительная компания в Кокшетау',
    template: '%s — ASAR HOLDING',
  },
  description:
    'ASAR HOLDING — строительная компания из Кокшетау. С 2015 года проектируем и строим жилые дома, дуплексы и таунхаусы, реализуем квартиры, парковочные места и коммерческие помещения. Полный цикл: проектируем, строим, реализуем.',
  keywords: [
    'ASAR HOLDING',
    'ASAR HOLDING Кокшетау',
    'строительная компания Кокшетау',
    'строительство жилых домов Кокшетау',
    'ЖК ASAR',
    'ЖК ASAR PREMIUM',
    'застройщик Кокшетау',
    'дуплекс Кокшетау',
    'таунхаус Кокшетау',
  ],
  authors: [{ name: 'ASAR HOLDING' }],
  creator: 'ASAR HOLDING',
  publisher: 'ТОО ASAR Holding',
  category: 'Строительство и недвижимость',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_KZ',
    siteName: 'ASAR HOLDING',
    url: '/',
    title: 'ASAR HOLDING — строительная компания в Кокшетау',
    description:
      'Строим не стены — строим доверие. Жилые дома, дуплексы и таунхаусы в Кокшетау с 2015 года. Полный цикл: проектирование, строительство, реализация.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'ASAR HOLDING — строительная компания в Кокшетау',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASAR HOLDING — строительная компания в Кокшетау',
    description:
      'Жилые дома, дуплексы и таунхаусы в Кокшетау с 2015 года. Полный цикл: проектируем, строим, реализуем.',
    images: ['/og.jpg'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  applicationName: 'ASAR HOLDING',
  formatDetection: { telephone: true, address: true, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f2ec' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1113' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="min-h-dvh bg-stone text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-stone"
        >
          Перейти к содержанию
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
