import type React from 'react';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: 'Spice Market - Premium Spices & Sauces',
  description: 'Your one-stop shop for premium spices, sauces, and international food products',
  generator: 'v0.app',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            {children}
            <Toaster />
            <Analytics />
            <Footer />
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
