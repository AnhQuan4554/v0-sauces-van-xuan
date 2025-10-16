'use client';
import { Product } from '@/app/types/products';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

interface ProductOrderActionsProps {
  product: Product;
}
const ProductOrderActions = ({ product }: ProductOrderActionsProps) => {
  const componentT = useTranslations('Component');
  const titleT = useTranslations('Title');
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    toast({
      title: 'addedToCart',
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <span className="text-sm font-medium sm:text-base">{titleT('quantity')}:</span>
        <div className="border-border flex w-fit items-center rounded-lg border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="hover:bg-muted h-9 px-3 py-2 sm:h-10"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="min-w-[3rem] px-3 py-2 text-center text-sm font-medium sm:text-base">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            className="hover:bg-muted h-9 px-3 py-2 sm:h-10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button
          onClick={addToCart}
          className="bg-primary hover:bg-primary/90 text-primary-foreground premium-button h-11 flex-1 text-base font-medium sm:h-12 sm:text-lg"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {componentT('Button.addToCard')}
        </Button>
        <Button
          variant="outline"
          className="premium-button h-11 bg-transparent text-base font-medium sm:h-12 sm:px-8 sm:text-lg"
        >
          {componentT('Button.buyNow')}
        </Button>
      </div>
    </div>
  );
};

export default ProductOrderActions;
