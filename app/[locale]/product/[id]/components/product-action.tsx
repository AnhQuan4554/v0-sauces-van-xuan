'use client';
// React and hooks
import React, { useEffect, useState } from 'react';

// UI components
import { Button } from '@/components/ui/button';

// Icons
import { Heart, Share2 } from 'lucide-react';

// Custom hooks
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/app/types/products';

interface ProductActionButtonsProps {
  product: Product;
}

const ProductActionButtons = ({ product }: ProductActionButtonsProps) => {
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((item: Product) => item.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new CustomEvent('favoritesUpdated'));
    toast({
      title: isFavorite ? 'addedToFavorites' : 'removedFromFavorites',
      description: `${product.name} has been ${isFavorite ? 'removed from' : 'added to'} your favorites`,
    });
  };

  useEffect(() => {
    // Initialize favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    console.log('product', product);
    console.log('savedFavorites', savedFavorites);
    console.log('check++++', savedFavorites.includes(product.id));
    setIsFavorite(savedFavorites.some((item: Product) => item.id === product.id));
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleFavorite}
        className="premium-button rounded-full p-2 sm:p-3"
      >
        <Heart
          className={`h-5 w-5 sm:h-6 sm:w-6 ${
            isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
          }`}
        />
      </Button>
      <Button variant="ghost" size="sm" className="premium-button rounded-full p-2 sm:p-3">
        <Share2 className="text-muted-foreground h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>
  );
};

export default ProductActionButtons;
