'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Heart, ShoppingCart, Star, Minus, Plus, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { getProduct, getProducts } from '@/lib/supabase/products';
import { Separator } from '@/components/ui/separator';
import { formatPrice, Product } from '@/app/types/products';

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

export default function ProductDetailPage() {
  const params = useParams();
  const productId = String(params?.id);
  console.log('productID', productId);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>(defaultData);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  // Related products (same category or random selection)
  const relatedProducts = allProducts?.filter((p) => p.id !== product?.id)?.slice(0, 4);

  useEffect(() => {
    if (product) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(product.id));
    }
  }, [product]);

  // Handle get all product and detail product
  useEffect(() => {
    const loadProducts = async () => {
      try {
        //Get all product
        const data = await getProducts();
        // Get product detail
        const dataDetail = await getProduct(productId);
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
          <p>Loading products...</p>
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
      description: `${product.name} has been ${
        isFavorite ? 'removed from' : 'added to'
      } your favorites`,
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
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-muted-foreground mb-8 flex items-center gap-2 text-sm">
          <Link href="/" className="hover:text-primary transition-colors">
            {'home'}
          </Link>
          <span>•</span>
          <span>{'products'}</span>
          <span>•</span>
          <span className="text-primary font-medium">{product.name}</span>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-muted aspect-square overflow-hidden rounded-2xl">
              <img
                src={product.image_url || '/placeholder.svg'}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* <div className="grid grid-cols-4 gap-3">
              {relatedProducts &&
                relatedProducts.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={item.image_url || '/placeholder.svg'}
                      alt={`${item.name} view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
            </div> */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center space-y-2 pr-2">
                  <h1 className="text-primary text-3xl font-bold text-balance">{product.name}</h1>
                  <h4 className="bg-accent text-input rounded-2xl p-1 text-center text-lg">
                    {' '}
                    {(product?.stock ?? 0) > 0 ? 'Còn hàng' : 'Hết hàng'}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFavorite}
                    className="premium-button rounded-full p-3"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                      }`}
                    />
                  </Button>
                  <Button variant="ghost" size="sm" className="premium-button rounded-full p-3">
                    <Share2 className="text-muted-foreground h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-3">
                <span className="text-primary text-4xl font-bold">
                  {formatPrice(product.price)}
                </span>
                {product.tags.length > 0 && (
                  <div className="flex gap-2">
                    {product.tags.slice(0, 2).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-accent/20 text-accent-foreground font-bold"
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
              <h3 className="text-lg font-semibold">{`Số lượt đã bán: ${product.sold}`}</h3>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {`Hàng còn lại trong kho: ${product.stock}`}
              </h3>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{'Chi tiết sản phẩm'}</h3>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {product.description ||
                  'This premium spice sauce is carefully crafted with the finest ingredients to deliver exceptional flavor and quality. Perfect for enhancing your culinary creations with authentic taste and aroma.'}
              </p>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-medium">{'quantity'}:</span>
                <div className="border-border flex items-center rounded-lg border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:bg-muted px-3 py-2"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="min-w-[3rem] px-4 py-2 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="hover:bg-muted px-3 py-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={addToCart}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground premium-button flex-1 py-3 text-lg font-medium"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {'addToCart'}
                </Button>
                <Button
                  variant="outline"
                  className="premium-button bg-transparent px-8 py-3 text-lg font-medium"
                >
                  {'buyNow'}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{'productDetails'}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
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

        {/* Related Products */}
        <div className="space-y-8">
          <h2 className="text-primary text-2xl font-bold">{'Sản phẩm liên quan'}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {relatedProducts?.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                <Card className="product-card group border-border/50 hover:border-primary/20 bg-card cursor-pointer overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          relatedProduct.image_url ||
                          '/placeholder.svg?height=250&width=250&query=premium spice sauce'
                        }
                        alt={relatedProduct.name}
                        className="product-image h-48 w-full object-cover"
                      />
                    </div>
                    <div className="space-y-2 p-4">
                      <h3 className="text-primary line-clamp-2 text-sm font-medium">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold">
                          {formatPrice(relatedProduct.price)}
                        </span>
                        <div className="flex items-center gap-1">{`Đã bán: ${product.sold}`}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
