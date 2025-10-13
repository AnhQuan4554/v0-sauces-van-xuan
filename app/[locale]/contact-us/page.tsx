import { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact Us | Spice Market - Premium Spices & Sauces',
  description:
    'Contact Spice Market for premium spices, sauces, and international food products. Visit our store, call our hotline, or send us an email for support and partnership opportunities.',
  openGraph: {
    title: 'Contact Us | Spice Market',
    description:
      'Get in touch with Spice Market for the best in spices and sauces. Find our address, hotline, and email here.',
    url: '/contact-us',
    type: 'website',
    images: [
      {
        url: '/spice-market-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Spice Market Contact',
      },
    ],
  },
};

export default function ContactUsPage() {
  const t = useTranslations('Component');
  const titleT = useTranslations('Title');

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-2 py-8 sm:px-4 sm:py-12">
        <h1 className="text-primary mb-4 text-3xl font-bold sm:text-4xl">
          {t('Navbar.contactUs')}
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl text-base sm:text-lg">
          Spice Market is dedicated to bringing you the finest spices and sauces from around the
          world. For inquiries, support, or partnership opportunities, please reach out to us using
          the information below.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-accent rounded-full p-3">
                <Phone className="text-accent-foreground h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t('Header.hotlineSupport')}</h3>
                <p className="text-primary text-base font-bold">0903.166.228</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-accent rounded-full p-3">
                <Mail className="text-accent-foreground h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{titleT('email')}</h3>
                <p className="text-primary text-base font-bold break-all">cs@namanmarket.com.vn</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-accent rounded-full p-3">
                <MapPin className="text-accent-foreground h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Store Address</h3>
                <p className="text-primary text-base font-bold">
                  21 Thao Dien Street, Thao Dien Ward, District 2, Ho Chi Minh City, Vietnam
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">{titleT('followUs')}</h3>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/namanmarket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 hover:bg-primary/20 rounded-full p-2 transition"
                  aria-label="Facebook"
                >
                  <Image src="/contacts/facebook.png" alt="Facebook" width={28} height={28} />
                </a>
                <a
                  href="https://instagram.com/namanmarket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 hover:bg-primary/20 rounded-full p-2 transition"
                  aria-label="Instagram"
                >
                  <Image src="/contacts/instagram.png" alt="Instagram" width={28} height={28} />
                </a>
                <a
                  href="https://youtube.com/namanmarket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 hover:bg-primary/20 rounded-full p-2 transition"
                  aria-label="YouTube"
                >
                  <Image src="/contacts/youtube.png" alt="YouTube" width={28} height={28} />
                </a>
              </div>
            </div>
          </div>
          {/* Google Map */}
          <div className="overflow-hidden rounded-lg border bg-white shadow-lg">
            <div className="h-96 w-full">
              <iframe
                title="Spice Market Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.435021002288!2d106.7305400759056!3d10.85382685780347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175271e2b9e5b7b%3A0x9e2e7e6e8e7e6e7e!2s21%20Thao%20Dien%2C%20Thao%20Dien%2C%20District%202%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
