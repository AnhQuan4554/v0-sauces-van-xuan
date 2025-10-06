'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function FloatingSocial() {
  const handleMessengerClick = () => {
    window.open('https://m.me/your-page-id', '_blank');
  };

  const handleZaloClick = () => {
    window.open('https://zalo.me/your-zalo-id', '_blank');
  };

  return (
    <div className="fixed right-2 bottom-24 z-50 flex flex-col gap-4">
      <a
        href="https://zalo.me/0866105029"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-pulse-subtle flex max-w-[50px] items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Contact via Zalo"
      >
        <Image src={'contacts/zalo.png'} alt="VN" width={50} height={50} className="mx-auto" />
      </a>

      <a
        href="https://zalo.me/0866105029"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-pulse-subtle flex max-w-[50px] items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Contact via Zalo"
      >
        <Image src={'contacts/messenger.png'} alt="VN" width={45} height={45} className="" />
      </a>
    </div>
  );
}
