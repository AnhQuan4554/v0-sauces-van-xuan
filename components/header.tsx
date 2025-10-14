'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Phone, ShoppingCart, Heart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import AdminModal from './admin-modal';
import LanguageSelector from './ui/language-selector';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';

export default function Header() {
  const t = useTranslations('Component');
  const bt = useTranslations('Component.Button');
  const router = useRouter();

  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [orderPhone, setOrderPhone] = useState('');
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderPhone.trim()) {
      setShowOrderDialog(false);
      router.push(`/order/${orderPhone.trim()}`);
      setOrderPhone('');
    }
  };
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    const updateFavoritesCount = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavoritesCount(favorites.length);
    };

    // Initial load
    updateCartCount();
    updateFavoritesCount();

    // Listen for updates
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('favoritesUpdated', updateFavoritesCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('favoritesUpdated', updateFavoritesCount);
    };
  }, []);

  return (
    <>
      <header className="border-b bg-white">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between gap-2 py-3 sm:gap-3 sm:py-4 lg:gap-4">
            {/* Mobile menu icon */}
            <button
              className="flex items-center justify-center rounded-md p-2 md:hidden"
              onClick={() => setShowMobileNav((prev) => !prev)}
              aria-label="Open menu"
            >
              <Menu className="text-primary h-6 w-6" />
            </button>
            {/* Logo */}
            <Link href="/" className="flex flex-shrink-0 cursor-pointer items-center">
              <div className="text-primary text-xl font-bold sm:text-2xl lg:text-3xl">
                NAMAN
                <div className="text-muted-foreground -mt-1 text-[10px] font-normal sm:text-xs lg:text-sm">
                  market
                </div>
              </div>
            </Link>

            <div className="mx-2 hidden min-w-0 flex-1 sm:mx-3 md:block lg:mx-6">
              <div className="relative mx-auto max-w-xs md:max-w-md lg:max-w-2xl">
                <Input
                  type="text"
                  placeholder={t('Header.placeHolderTitle')}
                  className="focus:border-primary h-9 w-full cursor-text rounded-lg border-2 border-gray-200 py-2 pr-16 pl-3 text-sm sm:h-10 sm:pr-20 sm:text-base lg:h-11"
                />
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 soft-button absolute top-1/2 right-1 h-[90%] -translate-y-1/2 cursor-pointer px-3 text-xs active:scale-95 sm:px-4 sm:text-sm"
                >
                  <span className="hidden lg:inline">{t('Button.buttonSearch')}</span>
                  <span className="lg:hidden">Search</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3 lg:gap-5">
              <div className="hidden items-center gap-2 text-sm xl:flex">
                <div className="bg-primary/10 rounded-full p-2 lg:p-2.5">
                  <Phone className="text-primary h-4 w-4 lg:h-5 lg:w-5" />
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">{t('Header.hotlineSupport')}</div>
                  <div className="text-primary text-sm font-semibold lg:text-base">
                    0903.166.228
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdminModal(true)}
                className="cursor-pointer rounded-lg px-2 py-1.5 text-xs font-medium hover:bg-gray-100 sm:px-3 sm:py-2 sm:text-sm lg:text-base"
              >
                <span className="hidden sm:inline">Admin</span>
                <span className="sm:hidden">A</span>
              </Button>

              <Link href="/favorites" className="cursor-pointer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative cursor-pointer rounded-full p-1.5 hover:bg-gray-100 sm:p-2 lg:p-2.5"
                >
                  <Heart className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  {favoritesCount > 0 && (
                    <span className="bg-accent absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white sm:h-5 sm:w-5 sm:text-xs">
                      {favoritesCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/cart" className="cursor-pointer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative cursor-pointer rounded-full p-1.5 hover:bg-gray-100 sm:p-2 lg:p-2.5"
                >
                  <ShoppingCart className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  {cartCount > 0 && (
                    <span className="bg-accent absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white sm:h-5 sm:w-5 sm:text-xs">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Language Selector */}
              <LanguageSelector />
            </div>
          </div>

          <div className="mb-3 min-w-0 md:hidden">
            <div className="relative">
              <Input
                type="text"
                placeholder={t('Header.placeHolderTitle')}
                className="focus:border-primary h-9 w-full cursor-text rounded-lg border-2 border-gray-200 py-2 pr-16 pl-3 text-sm"
              />
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 soft-button absolute top-1/2 right-1 h-[90%] -translate-y-1/2 cursor-pointer px-3 text-xs active:scale-95"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        <nav className={`text-white`}>
          <div className="container mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex items-center gap-3 overflow-x-auto py-2.5 sm:gap-4 sm:py-3 lg:gap-8">
              {/* Desktop nav */}
              <div className="bg-primary hidden flex-1 items-center gap-3 md:flex">
                <Button
                  variant="secondary"
                  className="bg-accent hover:bg-accent/90 soft-button cursor-pointer text-xs whitespace-nowrap text-white sm:text-sm lg:text-base"
                >
                  {t('Navbar.allProducts')}
                </Button>
                <Button
                  type="button"
                  className={`hover:text-accent cursor-pointer text-xs transition-colors sm:text-sm lg:text-base`}
                  onClick={() => setShowOrderDialog(true)}
                >
                  {t('Navbar.myOrder') || 'My Order'}
                </Button>
                <Button
                  type="button"
                  className={`hover:text-accent cursor-pointer text-xs transition-colors sm:text-sm lg:text-base`}
                >
                  <a href="#" className="hover:text-accent cursor-pointer transition-colors">
                    {t('Navbar.ourStory')}
                  </a>
                </Button>
                <Button
                  type="button"
                  className={`hover:text-accent cursor-pointer text-xs transition-colors sm:text-sm lg:text-base`}
                >
                  <a
                    href="/contact-us"
                    className="hover:text-accent cursor-pointer transition-colors"
                  >
                    {t('Navbar.contactUs')}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile nav dropdown */}
          {showMobileNav && (
            <div className="text-primary absolute right-0 left-0 z-50 bg-white shadow-md lg:hidden">
              <div className="flex flex-col gap-2 p-4">
                <Button
                  variant="secondary"
                  className="bg-accent hover:bg-accent/90 soft-button cursor-pointer text-xs whitespace-nowrap text-white"
                >
                  {t('Navbar.allProducts')}
                </Button>
                <Button
                  type="button"
                  className={`hover:text-accent cursor-pointer text-xs transition-colors`}
                  onClick={() => {
                    setShowOrderDialog(true);
                    setShowMobileNav(false);
                  }}
                >
                  {t('Navbar.myOrder') || 'My Order'}
                </Button>
                <a href="#" className="hover:text-accent cursor-pointer text-xs transition-colors">
                  {t('Navbar.ourStory')}
                </a>
                <a
                  href="/contact-us"
                  className="hover:text-accent cursor-pointer text-xs transition-colors"
                >
                  {t('Navbar.contactUs')}
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="mx-3 w-[calc(100%-1.5rem)] max-w-sm sm:mx-auto sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">{t('Header.myOrder')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm sm:text-base">
                {t('Header.enterPhoneNumber')}
              </Label>
              <Input
                id="phone"
                type="password"
                value={orderPhone}
                onChange={(e) => {
                  setOrderPhone(e.target.value);
                }}
                required
                autoFocus
                placeholder="Enter phone number"
                className="h-9 w-full cursor-text text-sm sm:h-10 sm:text-base"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowOrderDialog(false)}
                className="soft-button h-9 text-xs sm:h-10 sm:text-sm"
              >
                {bt('cancel')}
              </Button>
              <Button
                type="submit"
                className="soft-button bg-primary h-9 text-xs text-white sm:h-10 sm:text-sm"
              >
                {bt('ok')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <AdminModal open={showAdminModal} onOpenChange={setShowAdminModal} />
    </>
  );
}
