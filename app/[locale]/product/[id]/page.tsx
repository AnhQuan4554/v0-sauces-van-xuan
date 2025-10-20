import { formatPrice } from '@/app/types/products';
import { Separator } from '@/components/ui/separator';
import { getProduct, getRelatedProducts } from '@/services/server/product-supabase-server';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductOrderActions from './components/product-order-actions';
import ProductReview from './components/product-review';
import ProductActionButtons from './components/product-action';
import { getTranslations } from 'next-intl/server';
import { dataFake } from '../../data-fake';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // const product = await getProduct(id);
  // const relatedProducts = await getRelatedProducts(
  //   product?.origin || null,
  //   product?.brand || null,
  //   id
  // );
  const product = dataFake.find((item) => item.id === id);
  const relatedProducts = dataFake.filter((item) => item.id !== id).slice(0, 4);
  const componentT = await getTranslations('Component');
  const titleT = await getTranslations('Title');
  if (!product) {
    notFound();
  }
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
                <ProductActionButtons product={product} />
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
            <ProductOrderActions product={product} />
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
            <ProductReview relatedProducts={relatedProducts ?? []} />
          </div>
        </div>
      </main>
    </div>
  );
}
