'use client';

import { useState, useEffect } from 'react';
import { Heart, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { formatPrice, Product } from '@/app/types/products';
import Image from 'next/image';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event('favoritesUpdated'));

    toast({
      title: 'Removed from favorites',
      description: 'Item has been removed from your favorites list.',
    });
  };

  const addToCart = (item: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((cartItem: any) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));

    toast({
      title: 'Added to cart',
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="soft-button bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">My Favorites</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="py-12 text-center">
          <Heart className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <p className="text-muted-foreground mb-4">No favorites yet</p>
          <p className="text-muted-foreground mb-6 text-sm">
            Start adding products to your favorites by clicking the heart icon
          </p>
          <Link href="/">
            <Button className="soft-button">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((item) => (
            <div key={item.id} className="rounded-lg border p-4 transition-shadow hover:shadow-lg">
              <div className="relative mb-4">
                <Image
                  src={item.image_url || '/placeholder.svg'}
                  alt={item.name}
                  className="h-48 w-full rounded object-cover"
                  width={192}
                  height={192}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="soft-button absolute top-2 right-2"
                  onClick={() => removeFromFavorites(item.id)}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <h3 className="line-clamp-2 text-sm font-semibold">{item.name}</h3>
                <span className="text-primary text-sm font-bold sm:text-lg">
                  {formatPrice(item.price)}
                </span>
                <div className="text-muted-foreground text-lg">Sold: {item.sold}</div>

                <Button className="soft-button w-full" size="sm" onClick={() => addToCart(item)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
