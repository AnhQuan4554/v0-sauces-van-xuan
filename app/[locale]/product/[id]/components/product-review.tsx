import React from 'react';
import { formatPrice, Product } from '@/app/types/products';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface ProductReviewProps {
  relatedProducts: Product[];
}
const ProductReview = ({ relatedProducts }: ProductReviewProps) => {
  // const toggleFavorite = () => {
  //   const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  //   let updatedFavorites;

  //   if (isFavorite) {
  //     updatedFavorites = favorites.filter((id: string) => id !== product.id);
  //   } else {
  //     updatedFavorites = [...favorites, product.id];
  //   }

  //   localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  //   setIsFavorite(!isFavorite);
  //   window.dispatchEvent(new CustomEvent('favoritesUpdated'));

  //   toast({
  //     title: isFavorite ? 'addedToFavorites' : 'addedToFavorites',
  //     description: `${product.name} has been ${isFavorite ? 'removed from' : 'added to'} your favorites`,
  //   });
  // };

  // useEffect(() => {
  //   if (product) {
  //     const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  //     setIsFavorite(favorites.includes(product.id));
  //   }
  // }, [product]);
  return (
    <div className="carousel scrollbar-hide flex gap-3 overflow-x-auto py-2 sm:gap-4">
      {relatedProducts?.map((relatedProduct, index) => (
        <div
          key={relatedProduct.id}
          id={`slide-${index}`}
          className="carousel-item w-[45%] flex-shrink-0 sm:w-1/3 md:w-1/4 lg:w-1/5"
        >
          <Link href={`/product/${relatedProduct.id}`} prefetch={true}>
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
  );
};

export default ProductReview;
