import ProductGrid from '@/components/product-grid';
import Sidebar from '@/components/sidebar';
import FloatingSocial from '@/components/floating-social';
import MobileFilterToggle from '@/components/mobile-filter-toggle';
import Pagination from '@/components/ui/pagination';
import {
  DEFAULT_PRODUCTS_PER_PAGE,
  getProductsServer,
} from '@/services/server/product-supabase-server';
import { SearchFilter } from '../types/products';
import { dataFake } from './data-fake';

interface HomeProps {
  searchParams: SearchFilter;
}
export default async function Home({ searchParams }: HomeProps) {
  // const productList = await getProductsServer(searchParams);
  // const { products, total } = productList;

  return (
    <div className="bg-background min-h-screen">
      <FloatingSocial />
      <main className="container mx-auto px-2 py-4 sm:px-4 sm:py-8">
        <div className="flex flex-col gap-4 sm:gap-8 lg:flex-row">
          <aside className="hidden lg:block lg:w-1/4">
            <Sidebar />
          </aside>

          <section className="lg:w-3/4">
            <MobileFilterToggle />
            {/* <ProductGrid products={products} /> */}
            <ProductGrid products={dataFake as any} />
            {/* <Pagination
              totalPages={Math.ceil(total / (searchParams.limit || DEFAULT_PRODUCTS_PER_PAGE))}
            /> */}
          </section>
        </div>
      </main>
    </div>
  );
}
