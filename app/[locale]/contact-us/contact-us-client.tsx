'use client';

import { Mail, Phone, MapPin, Clock, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ContactUsClientPage() {
  const t = useTranslations('Component');
  const titleT = useTranslations('Title');

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-3 py-6 sm:px-4 sm:py-10 lg:px-6 lg:py-16">
        {/* Responsive header with better text sizing */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-primary mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl lg:text-4xl">
            {t('Navbar.contactUs')}
          </h1>
          <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed sm:text-base lg:text-lg">
            NAMAN Market is dedicated to bringing you the finest spices and sauces from around the
            world. For inquiries, support, or partnership opportunities, please reach out to us
            using the information below.
          </p>
        </div>

        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-5 sm:space-y-6">
            {/* Responsive contact cards */}
            <Card className="border-primary/20 overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-accent flex-shrink-0 rounded-full p-2.5 sm:p-3">
                    <Phone className="text-accent-foreground h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-base font-semibold sm:text-lg">
                      {t('Header.hotlineSupport')}
                    </h3>
                    <p className="text-primary text-lg font-bold sm:text-xl">0903.166.228</p>
                    <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                      Available for customer support and inquiries
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-accent flex-shrink-0 rounded-full p-2.5 sm:p-3">
                    <Mail className="text-accent-foreground h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-base font-semibold sm:text-lg">{titleT('email')}</h3>
                    <p className="text-primary text-base font-bold break-all sm:text-lg">
                      cs@namanmarket.com.vn
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-accent flex-shrink-0 rounded-full p-2.5 sm:p-3">
                    <MapPin className="text-accent-foreground h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-base font-semibold sm:text-lg">Store Address</h3>
                    <p className="text-primary text-sm leading-relaxed font-bold sm:text-base">
                      21 Thao Dien Street, Thao Dien Ward, District 2, Ho Chi Minh City, Vietnam
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                      Easy parking available nearby
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* New business hours section */}
            <Card className="border-primary/20 overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-accent flex-shrink-0 rounded-full p-2.5 sm:p-3">
                    <Clock className="text-accent-foreground h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-2 text-base font-semibold sm:text-lg">Business Hours</h3>
                    <div className="space-y-1 text-sm sm:text-base">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monday - Friday:</span>
                        <span className="text-primary font-semibold">8:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Saturday - Sunday:</span>
                        <span className="text-primary font-semibold">8:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Public Holidays:</span>
                        <span className="text-primary font-semibold">9:00 AM - 9:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-4 sm:my-6" />

            {/* Social Media */}
            <div>
              <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg lg:text-xl">
                {titleT('followUs')}
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="https://facebook.com/namanmarket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 hover:bg-primary/20 flex items-center gap-2 rounded-full px-4 py-2 transition sm:px-5 sm:py-2.5"
                  aria-label="Facebook"
                >
                  <Image src="/contacts/facebook.png" alt="Facebook" width={24} height={24} />
                  <span className="text-sm font-medium sm:text-base">Facebook</span>
                </a>
                <a
                  href="https://instagram.com/namanmarket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 hover:bg-primary/20 flex items-center gap-2 rounded-full px-4 py-2 transition sm:px-5 sm:py-2.5"
                  aria-label="Instagram"
                >
                  <Image src="/contacts/instagram.png" alt="Instagram" width={24} height={24} />
                  <span className="text-sm font-medium sm:text-base">Instagram</span>
                </a>
                <a
                  href="https://youtube.com/namanmarket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 hover:bg-primary/20 flex items-center gap-2 rounded-full px-4 py-2 transition sm:px-5 sm:py-2.5"
                  aria-label="YouTube"
                >
                  <Image src="/contacts/youtube.png" alt="YouTube" width={24} height={24} />
                  <span className="text-sm font-medium sm:text-base">YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Responsive map and FAQ section */}
          <div className="space-y-6 sm:space-y-8">
            {/* Google Map */}
            <div className="overflow-hidden rounded-xl border bg-white shadow-lg">
              <div className="h-64 w-full sm:h-80 lg:h-96">
                <iframe
                  title="NAMAN Market Location"
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

            {/* New FAQ section for better SEO and user experience */}
            <Card className="border-primary/20">
              <CardContent className="p-4 sm:p-6">
                <div className="mb-4 flex items-center gap-2 sm:mb-6">
                  <HelpCircle className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                  <h3 className="text-base font-semibold sm:text-lg lg:text-xl">
                    Frequently Asked Questions
                  </h3>
                </div>
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <h4 className="text-primary mb-1 text-sm font-semibold sm:mb-2 sm:text-base">
                      Do you offer delivery services?
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                      Yes, we offer delivery throughout Ho Chi Minh City. Contact us for delivery
                      rates and estimated times.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-primary mb-1 text-sm font-semibold sm:mb-2 sm:text-base">
                      Can I place bulk orders?
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                      We welcome bulk orders for restaurants, hotels, and businesses. Contact us for
                      special pricing.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-primary mb-1 text-sm font-semibold sm:mb-2 sm:text-base">
                      Do you accept returns?
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                      Yes, we accept returns within 7 days of purchase for unopened products with
                      original packaging and receipt.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-primary mb-1 text-sm font-semibold sm:mb-2 sm:text-base">
                      What payment methods do you accept?
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                      We accept cash, credit/debit cards, bank transfers, and popular e-wallets like
                      Momo and ZaloPay.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
