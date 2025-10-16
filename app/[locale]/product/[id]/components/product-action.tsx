'use client';
// React and hooks
import React, { useEffect, useState } from 'react';

// UI components
import { Button } from '@/components/ui/button';

// Icons
import { Heart, Share2 } from 'lucide-react';

// Custom hooks
import { useToast } from '@/hooks/use-toast';

interface ProductActionButtonsProps {
  productID: string;
}

const ProductActionButtons = ({ productID }: ProductActionButtonsProps) => {
  const toast = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((id: string) => id !== productID);
    } else {
      updatedFavorites = [...favorites, productID];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new CustomEvent('favoritesUpdated'));

    // toast({
    //   title: isFavorite ? 'addedToFavorites' : 'addedToFavorites',
    //   description: `${product.name} has been ${isFavorite ? 'removed from' : 'added to'} your favorites`,
    // });
  };
  useEffect(() => {
    if (productID) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(productID));
    }
  }, [productID]);
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
