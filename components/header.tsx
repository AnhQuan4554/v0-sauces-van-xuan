'use client';

import { useState, useEffect } from 'react';
import { Phone, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import AdminModal from './admin-modal';
import LanguageSelector from './ui/language-selector';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';

export default function Header() {
  const t = useTranslations('Component');
  const bt = useTranslations('Button');
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);
  // Add state for My Order dialog
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [orderPhone, setOrderPhone] = useState('');
  const router = useRouter();

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
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between gap-2 py-2 sm:gap-4 sm:py-4">
            {/* Logo */}
            <Link href="/" className="flex flex-shrink-0 cursor-pointer items-center">
              <div className="text-primary text-lg font-bold sm:text-2xl">
                NAMAN
                <div className="text-muted-foreground -mt-1 text-xs font-normal sm:text-sm">
                  market
                </div>
              </div>
            </Link>

            <div className="mx-2 hidden min-w-0 flex-1 sm:mx-4 sm:block md:mx-8">
              <div className="relative mx-auto max-w-xs sm:max-w-md md:max-w-2xl">
                <Input
                  type="text"
                  placeholder={t('Header.placeHolderTitle')}
                  className="focus:border-primary w-full cursor-text rounded-lg border-2 border-gray-200 py-2 pr-12 pl-3 text-sm sm:py-2.5 sm:pr-20 sm:pl-4"
                />
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 soft-button absolute top-1/2 right-0 h-7 -translate-y-1/2 cursor-pointer px-2 text-xs active:scale-95 sm:h-8 sm:px-4 sm:text-sm"
                >
                  <span className="hidden lg:inline">{t('Button.buttonSearch')}</span>
                  <span className="lg:hidden">Search</span>
                </Button>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex flex-shrink-0 items-center gap-4 sm:gap-3 md:gap-6">
              {/* Hotline Support */}
              <div className="hidden items-center gap-2 text-sm lg:flex">
                <div className="bg-primary/10 rounded-full p-2">
                  <Phone className="text-primary h-4 w-4" />
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">{t('Header.hotlineSupport')}</div>
                  <div className="text-primary font-semibold">0903.166.228</div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdminModal(true)}
                className="cursor-pointer rounded-lg px-2 py-1.5 text-xs font-medium hover:bg-gray-100 sm:flex sm:px-3 sm:py-2 sm:text-sm"
              >
                Admin
              </Button>

              {/* Favorites Icon */}
              <Link href="/favorites" className="cursor-pointer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative cursor-pointer rounded-full p-1.5 hover:bg-gray-100 sm:p-2"
                >
                  <Heart className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
                  {favoritesCount > 0 && (
                    <span className="bg-accent absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs text-white sm:h-5 sm:w-5">
                      {favoritesCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Cart Icon */}
              <Link href="/cart" className="cursor-pointer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative cursor-pointer rounded-full p-1.5 hover:bg-gray-100 sm:p-2"
                >
                  <ShoppingCart className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
                  {cartCount > 0 && (
                    <span className="bg-accent absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs text-white sm:h-5 sm:w-5">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Language Selector */}
              <LanguageSelector />
            </div>
          </div>
          {/* Button Search when browser have size phone */}
          <div className="mx-2 mb-2 min-w-0 sm:mx-4 sm:hidden md:mx-8">
            <div className="relative mx-auto max-w-xs sm:max-w-md md:max-w-2xl">
              <Input
                type="text"
                placeholder={t('Header.placeHolderTitle')}
                className="focus:border-primary w-full cursor-text rounded-lg border-2 border-gray-200 py-2 pr-12 pl-3 text-sm sm:py-2.5 sm:pr-20 sm:pl-4"
              />
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 soft-button absolute top-1/2 right-0 h-7 h-full -translate-y-1/2 cursor-pointer text-xs active:scale-95"
              >
                <span className="hidden lg:inline">{t('Button.buttonSearch')}</span>
                <span className="lg:hidden">Search</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="bg-primary text-white">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="flex items-center gap-2 overflow-x-auto py-2 sm:gap-4 sm:py-3 md:gap-8">
              <Button
                variant="secondary"
                className="bg-accent hover:bg-accent/90 soft-button cursor-pointer text-xs whitespace-nowrap text-white sm:text-sm"
              >
                {t('Navbar.allProducts')}
              </Button>
              {/* My Order Nav */}
              <button
                type="button"
                className="hover:text-accent cursor-pointer text-xs transition-colors sm:text-sm"
                onClick={() => setShowOrderDialog(true)}
              >
                {t('Navbar.myOrder') || 'My Order'}
              </button>

              <div className="flex items-center gap-2 text-xs whitespace-nowrap sm:gap-4 sm:text-sm md:gap-6">
                <a href="#" className="hover:text-accent cursor-pointer transition-colors">
                  {t('Navbar.ourStory')}
                </a>
                <a
                  href="/contact-us"
                  className="hover:text-accent cursor-pointer transition-colors"
                >
                  {t('Navbar.contactUs')}
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* My Order Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>{t('Header.myOrder')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm">
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
                className="w-full cursor-text text-sm sm:text-base"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowOrderDialog(false)}
                className="soft-button"
              >
                {bt('cancel')}
              </Button>
              <Button type="submit" className="soft-button bg-primary text-white">
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
