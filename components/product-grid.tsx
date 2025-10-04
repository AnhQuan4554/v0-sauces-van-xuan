'use client';

import { useEffect, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getProducts } from '@/lib/supabase/products';
import { useRouter } from 'next/navigation';
import { formatPrice, Product } from '@/app/types/products';

export default function ProductGrid() {
  const { toast } = useToast();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

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

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-primary text-xl font-bold sm:text-2xl">Sauces And Pastes</h1>
          <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs sm:text-sm">
            <span>Home</span>
            <span>›</span>
            <span>Products</span>
            <span>›</span>
            <span className="hidden sm:inline">Sauces And Pastes</span>
          </div>
        </div>

        <div className="text-muted-foreground text-xs sm:text-sm">Show 1-20 of 77 products</div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products &&
          products?.map((product) => (
            <Card
              key={product.id}
              className="group flex h-full cursor-pointer flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              <CardContent className="flex h-full flex-col p-2 sm:p-4">
                <div className="relative mb-3 sm:mb-4">
                  <img
                    src={product.image_url || '/placeholder.svg'}
                    alt={product.name}
                    className="h-32 w-full rounded-lg object-cover sm:h-48"
                  />

                  {/* Tags */}
                  {product.tags.length > 0 && (
                    <div className="absolute top-1 left-1 flex flex-wrap gap-1 sm:top-2 sm:left-2">
                      {product.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="destructive" className="px-1 py-0 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Favorite button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-1 right-1 cursor-pointer rounded-full bg-white/80 p-1 hover:bg-white sm:top-2 sm:right-2 sm:p-2"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        favorites.includes(product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-500'
                      }`}
                    />
                  </Button>
                </div>

                <div className="flex flex-grow flex-col space-y-1 text-center sm:space-y-2">
                  <h3 className="text-primary line-clamp-2 flex min-h-[2.5rem] flex-grow items-center justify-center text-xs leading-tight font-medium sm:min-h-[3rem] sm:text-sm">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-center">
                    <span className="text-primary text-sm font-bold sm:text-lg">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <div className="text-muted-foreground text-xs">Sold: {product.sold}</div>

                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground soft-button mt-auto w-full cursor-pointer py-1.5 text-xs sm:py-2 sm:text-sm"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <ShoppingCart className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">ADD TO CART</span>
                    <span className="sm:hidden">ADD</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          className="soft-button h-6 w-6 cursor-pointer rounded-full bg-transparent p-0 text-xs sm:h-8 sm:w-8 sm:text-sm"
        >
          1
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 cursor-pointer p-0 text-xs sm:h-8 sm:w-8 sm:text-sm"
        >
          2
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 cursor-pointer p-0 text-xs sm:h-8 sm:w-8 sm:text-sm"
        >
          3
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 cursor-pointer p-0 text-xs sm:h-8 sm:w-8 sm:text-sm"
        >
          4
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer px-2 text-xs sm:px-3 sm:text-sm"
        >
          Next ›
        </Button>
      </div>
    </div>
  );
}
