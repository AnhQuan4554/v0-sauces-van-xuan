'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { formatPrice, type Product } from '@/app/types/products';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { getProducts } from '@/services/client/product-supabase-client';

export default function ProductGrid() {
  const { toast } = useToast();
  const componentT = useTranslations('Component');
  const titleT = useTranslations('Title');

  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // ...existing code...
  const toggleFavorite = (product: Product) => {
    let updatedFavorites: Product[];
    setFavorites((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        updatedFavorites = prev.filter((item) => item.id !== product.id);
      } else {
        updatedFavorites = [...prev, product];
      }
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      // Trigger update event for other components/pages
      window.dispatchEvent(new Event('favoritesUpdated'));
      return updatedFavorites;
    });
  };
  // ...existing code...

  const addToCart = (product: (typeof products)[0]) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      toast({
        title: 'Updated cart',
        description: `${product.name} quantity updated to ${existingItem.quantity}`,
      });
    } else {
      cart.push({ ...product, quantity: 1 });
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart`,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Trigger cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  useEffect(() => {
    loadProducts();
    // Initialize favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  if (loading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div>
          <h1 className="text-primary text-xl font-bold sm:text-2xl lg:text-3xl">
            {componentT('Navbar.allProducts')}
          </h1>
          <div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs sm:gap-2 sm:text-sm">
            <span>{titleT('home')}</span>
            <span>›</span>
            <span>{titleT('products')}</span>
            <span>›</span>
            <span className="hidden sm:inline">Gia vị</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {products &&
          products?.map((product) => (
            <Card
              key={product.id}
              className="group flex h-full cursor-pointer flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:hover:scale-105"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              <CardContent className="flex h-full flex-col p-2 sm:p-3 md:p-4">
                <div className="relative mb-2 sm:mb-3 md:mb-4">
                  <Image
                    src={product.image_url || '/placeholder.svg'}
                    alt={product.name}
                    className="h-32 w-full rounded-lg object-cover sm:h-40 md:h-48 lg:h-52"
                    width={128}
                    height={128}
                  />

                  {/* Tags */}
                  {product.tags.length > 0 && (
                    <div className="absolute top-1 left-1 flex flex-wrap gap-0.5 sm:top-2 sm:left-2 sm:gap-1">
                      {product.tags.slice(0, 2).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="destructive"
                          className="px-1 py-0 text-[10px] sm:px-1.5 sm:text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Favorite button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-1 right-1 cursor-pointer rounded-full bg-white/80 p-1 hover:bg-white sm:top-2 sm:right-2 sm:p-1.5 md:p-2"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      toggleFavorite(product);
                    }}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 ${
                        favorites.some((item) => item.id === product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-500'
                      }`}
                    />
                  </Button>
                </div>

                <div className="flex flex-grow flex-col space-y-1 text-center sm:space-y-1.5 md:space-y-2">
                  <h3 className="text-primary line-clamp-2 flex flex-grow items-center justify-center px-1 text-xs leading-tight font-medium sm:text-sm md:text-base">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-center">
                    <span className="text-primary text-sm font-bold sm:text-base md:text-lg">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <div className="text-muted-foreground text-[10px] sm:text-xs md:text-sm">
                    {titleT('sold')}: {product.sold}
                  </div>

                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground soft-button mt-auto h-8 w-full cursor-pointer py-1.5 text-[10px] sm:h-9 sm:py-2 sm:text-xs md:h-10 md:py-2.5 md:text-sm"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <ShoppingCart className="mr-1 h-3 w-3 sm:mr-1.5 sm:h-3.5 sm:w-3.5 md:mr-2 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">{componentT('Button.addToCard')}</span>
                    <span className="sm:hidden">{componentT('Button.add')}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
