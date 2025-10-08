'use client';

import { Phone, Mail, Facebook, Youtube, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import LanguageSelector from './ui/language-selector';

export default function Footer() {
  const componentT = useTranslations('Component');
  const titleT = useTranslations('Title');

  return (
    <footer className="bg-muted mt-8 sm:mt-16">
      {/* Contact Section */}
      <div className="bg-primary text-primary-foreground py-6 sm:py-8">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 gap-4 text-center sm:gap-8 md:grid-cols-4 md:text-left">
            {/* Hotline Support */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 md:flex-row">
              <div className="bg-primary-foreground/20 rounded-full p-3">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold sm:text-base">
                  {componentT('Header.hotlineSupport')}
                </h3>
                <p className="text-base font-bold sm:text-lg">0903.166.228</p>
              </div>
            </div>

            {/* Email Us */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 md:flex-row">
              <div className="bg-primary-foreground/20 rounded-full p-3">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold sm:text-base">{titleT('email')}</h3>
                <p className="text-sm font-bold break-all sm:text-base">cs@namanmarket.com.vn</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="mb-3 text-sm font-semibold sm:mb-4 sm:text-base">
                {titleT('followUs')}
              </h3>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-primary-foreground/20 hover:bg-primary-foreground/30 soft-button cursor-pointer p-2"
                  onClick={() => window.open('https://facebook.com/namanmarket', '_blank')}
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-primary-foreground/20 hover:bg-primary-foreground/30 soft-button cursor-pointer p-2"
                  onClick={() => window.open('https://youtube.com/namanmarket', '_blank')}
                >
                  <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-primary-foreground/20 hover:bg-primary-foreground/30 soft-button cursor-pointer p-2"
                  onClick={() => window.open('https://twitter.com/namanmarket', '_blank')}
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-primary-foreground/20 hover:bg-primary-foreground/30 soft-button cursor-pointer p-2"
                  onClick={() => window.open('https://instagram.com/namanmarket', '_blank')}
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="mb-3 text-sm font-semibold sm:mb-4 sm:text-base">
                {titleT('paymentMethods')}
              </h3>
              <div className="flex items-center gap-2">
                <div className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-800">
                  QR
                </div>
                <div className="rounded bg-pink-500 px-2 py-1 text-xs font-semibold text-white">
                  Momo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-6 sm:py-8">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-muted-foreground mb-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:mb-6 sm:gap-6 sm:text-sm">
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">
              Membership Policy
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">
              Naman Market News
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">
              Delivery & Return Policy
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">
              Discover
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-primary cursor-pointer transition-colors">
              Recruitment
            </a>
          </div>

          {/* Company Info */}
          <div className="text-muted-foreground space-y-1 text-center text-xs sm:space-y-2 sm:text-sm">
            <p className="leading-relaxed">
              Spice Market International Investment Corporation, 21 Thao Dien Street, Thao Dien
              Ward, District 2, Ho Chi Minh City.
            </p>
            <p>Hotline: 0903.166.228. Email: customerservice@spicemarket.com.vn</p>
            <p>0311897914 issued by HCMC Department of Planning and Investment on 26/07/2012.</p>
            <p>Contact for product development and cooperation: luan.l@spicemarket.com.vn</p>
          </div>

          {/* Trust Badge and Language */}
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:mt-6 sm:flex-row sm:gap-4">
            <div className="rounded bg-blue-500 px-2 py-1 text-center text-xs font-semibold text-white sm:px-3">
              ĐÃ THÔNG BÁO
              <br />
              BỘ CÔNG THƯƠNG
            </div>

            {/* Language Selector */}
            <LanguageSelector />
          </div>

          {/* Payment Methods */}
          <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:mt-6 sm:flex-row sm:gap-4">
            <div className="text-muted-foreground text-xs">Payment methods:</div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="rounded border bg-white px-1.5 py-1 text-xs font-semibold sm:px-2">
                MOMO
              </div>
              <div className="rounded bg-orange-500 px-1.5 py-1 text-xs font-semibold text-white sm:px-2">
                MasterCard
              </div>
              <div className="rounded bg-blue-600 px-1.5 py-1 text-xs font-semibold text-white sm:px-2">
                VISA
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-muted-foreground mt-4 text-center text-xs sm:mt-6 sm:text-sm">
            Copyright © 2023 Spice Market
          </div>
        </div>
      </div>
    </footer>
  );
}
