'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Button } from './button';
import Image from 'next/image';

export default function LanguageSelector() {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === 'en' ? 'vi' : 'en';
  const router = useRouter();

  const handleSwitchLanguage = () => {
    router.replace(pathname, { locale: nextLocale });
  };
  return (
    <Button
      onClick={handleSwitchLanguage}
      className="min-w-18 cursor-pointer rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 transition hover:bg-amber-200 sm:px-3 sm:text-sm"
    >
      {nextLocale.toUpperCase()}

      <Image
        src={`/language/${nextLocale === 'vi' ? 'vn' : 'usa'}.png`}
        alt="VN"
        width={20}
        height={20}
        className="mx-auto"
      />
    </Button>
  );
}
