'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Heart, ShoppingCart, Minus, Plus, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { getProduct, getProducts } from '@/lib/supabase/products';
import { Separator } from '@/components/ui/separator';
import { formatPrice, type Product } from '@/app/types/products';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const defaultData: Product = {
  id: '1',
  image_url: './asian-bean-sauce-jar.jpg',
  name: '',
  price: 0,
  sold: 0,
  stock: 0,
  tags: [''],
  description: '',
};
interface ProductDetailProps {
  productId: string;
}
const ProductDetail = ({ productId }: ProductDetailProps) => {
  const componentT = useTranslations('Component');
  const titleT = useTranslations('Title');

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>(defaultData);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const relatedProducts = allProducts?.filter((p) => p.id !== product?.id)?.slice(0, 10);

  useEffect(() => {
    if (product) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(product.id));
    }
  }, [product]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [data, dataDetail] = await Promise.all([getProducts(), getProduct(productId)]);
        dataDetail && setProduct(dataDetail);
        data && setAllProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        alert('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-sm sm:text-base">Loading products...</p>
        </div>
      </div>
    );
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((id: string) => id !== product.id);
    } else {
      updatedFavorites = [...favorites, product.id];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new CustomEvent('favoritesUpdated'));

    toast({
      title: isFavorite ? 'addedToFavorites' : 'addedToFavorites',
      description: `${product.name} has been ${isFavorite ? 'removed from' : 'added to'} your favorites`,
    });
  };

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
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-3 py-6 sm:px-4 sm:py-8 lg:px-6 lg:py-12">
        <div className="text-muted-foreground mb-6 flex items-center gap-2 text-xs sm:mb-8 sm:text-sm">
          <Link href="/" className="hover:text-primary transition-colors">
            {titleT('home')}
          </Link>
          <span>•</span>
          <span>{titleT('products')}</span>
          <span>•</span>
          <span className="text-primary line-clamp-1 font-medium">{product.name}</span>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:mb-16 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl">
              <Image
                src={product.image_url || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="mb-3 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-2 sm:gap-3">
                  <h1 className="text-primary text-2xl font-bold text-balance sm:text-3xl lg:text-4xl">
                    {product.name}
                  </h1>
                  <Badge className="bg-accent text-input w-fit rounded-xl px-3 py-1 text-center text-sm sm:text-base">
                    {(product?.stock ?? 0) > 0 ? titleT('inStock') : titleT('outOfStock')}
                  </Badge>
                </div>

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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="premium-button rounded-full p-2 sm:p-3"
                  >
                    <Share2 className="text-muted-foreground h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center">
                <span className="text-primary text-3xl font-bold sm:text-4xl lg:text-5xl">
                  {formatPrice(product.price)}
                </span>
                {product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.slice(0, 2).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-accent/20 text-accent-foreground text-xs font-bold sm:text-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-base font-semibold sm:text-lg">{`${titleT('sold')}: ${product.sold}`}</h3>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold sm:text-lg">{`${titleT('warehouse')}: ${product.stock}`}</h3>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-semibold sm:text-lg lg:text-xl">
                {titleT('productDescription')}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed text-pretty sm:text-base">
                {product.description ||
                  'This premium spice sauce is carefully crafted with the finest ingredients to deliver exceptional flavor and quality. Perfect for enhancing your culinary creations with authentic taste and aroma.'}
              </p>
            </div>

            <Separator />

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

            <Separator />

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base font-semibold sm:text-lg lg:text-xl">
                {titleT('productDetail')}
              </h3>
              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-4 sm:text-base">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{'category'}:</span>
                    <span className="font-medium">{'Sauces'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{'brand'}:</span>
                    <span className="font-medium">Premium</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{'origin'}:</span>
                    <span className="font-medium">Vietnam</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{'shelfLife'}:</span>
                    <span className="font-medium">24 months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-primary text-xl font-bold sm:text-2xl lg:text-3xl">
            {'Sản phẩm liên quan'}
          </h2>
          <div className="relative w-full">
            <h4 className="text-primary mb-3 text-sm sm:text-base md:hidden">
              Trượt sang để xem thêm
            </h4>
            <div className="carousel scrollbar-hide flex gap-3 overflow-x-auto py-2 sm:gap-4">
              {relatedProducts?.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  id={`slide-${index}`}
                  className="carousel-item w-[45%] flex-shrink-0 sm:w-1/3 md:w-1/4 lg:w-1/5"
                >
                  <Link href={`/product/${relatedProduct.id}`}>
                    <Card className="product-card group border-border/50 hover:border-primary/20 bg-card h-full cursor-pointer overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative h-36 w-full overflow-hidden sm:h-40 lg:h-48">
                          <Image
                            src={
                              relatedProduct.image_url ||
                              '/placeholder.svg?height=250&width=250&query=premium spice sauce' ||
                              '/placeholder.svg' ||
                              '/placeholder.svg'
                            }
                            alt={relatedProduct.name}
                            fill
                            className="product-image object-cover"
                          />
                        </div>
                        <div className="space-y-2 p-3 sm:p-4">
                          <h3 className="text-primary line-clamp-2 min-h-[36px] text-xs font-medium sm:min-h-[40px] sm:text-sm">
                            {relatedProduct.name}
                          </h3>
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <span className="text-primary text-sm font-bold sm:text-base">
                              {formatPrice(relatedProduct.price)}
                            </span>
                            <div className="text-muted-foreground text-xs sm:text-sm">{`Đã bán: ${relatedProduct.sold}`}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
