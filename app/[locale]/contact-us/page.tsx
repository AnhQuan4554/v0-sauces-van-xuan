import { Metadata } from 'next';
import ContactUsClientPage from './contact-us-client';

// export const metadata: Metadata = {
//   title: 'Contact Us | Spice Market - Premium Spices & Sauces',
//   description:
//     'Contact Spice Market for premium spices, sauces, and international food products. Visit our store, call our hotline, or send us an email for support and partnership opportunities.',
//   openGraph: {
//     title: 'Contact Us | Spice Market',
//     description:
//       'Get in touch with Spice Market for the best in spices and sauces. Find our address, hotline, and email here.',
//     url: '/contact-us',
//     type: 'website',
//     images: [
//       {
//         url: '/spice-market-og.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Spice Market Contact',
//       },
//     ],
//   },
// };
export const metadata: Metadata = {
  title: 'Contact Us | NAMAN Market - Premium Spices & Sauces in Vietnam',
  description:
    'Contact NAMAN Market for premium spices, sauces, and international food products. Visit our store in District 2, Ho Chi Minh City, call our hotline at 0903.166.228, or email us at cs@namanmarket.com.vn. Open Monday-Sunday 8:00 AM - 10:00 PM.',
  keywords: [
    'contact NAMAN Market',
    'spice store Vietnam',
    'premium sauces Ho Chi Minh',
    'international food products',
    'Thao Dien store',
    'District 2 spices',
    'Vietnamese spice market',
  ],
  openGraph: {
    title: 'Contact Us | NAMAN Market - Premium Spices & Sauces',
    description:
      'Get in touch with NAMAN Market for the best in spices and sauces. Visit us in Thao Dien, District 2, or contact us via phone or email.',
    url: '/contact-us',
    type: 'website',
    locale: 'en_US',
    siteName: 'NAMAN Market',
    images: [
      {
        url: '/spice-market-og.jpg',
        width: 1200,
        height: 630,
        alt: 'NAMAN Market Contact - Premium Spices Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | NAMAN Market',
    description:
      'Premium spices and sauces in Ho Chi Minh City. Visit our Thao Dien store or contact us today.',
  },
  alternates: {
    canonical: '/contact-us',
  },
};
export default function ContactUsPage() {
  return <ContactUsClientPage />;
}
