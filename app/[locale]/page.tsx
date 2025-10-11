import ProductGrid from '@/components/product-grid';
import Sidebar from '@/components/sidebar';
import FloatingSocial from '@/components/floating-social';
import MobileFilterToggle from '@/components/mobile-filter-toggle';
import Pagination from '@/components/ui/pagination';

interface HomeProps {
  searchParams: {
    id?: string;
    name?: string;
    min_price?: string;
    max_price?: string;
    current_page?: string;
  };
}
export default function Home({ searchParams }: HomeProps) {
  console.log('search parames', searchParams);

  // const [searchFilter, setSearchFilter] = useState({});
  return (
    <div className="bg-background min-h-screen">
      {/* <AdminModal /> */}
      <FloatingSocial />

      <main className="container mx-auto px-2 py-4 sm:px-4 sm:py-8">
        <div className="flex flex-col gap-4 sm:gap-8 lg:flex-row">
          <aside className="hidden lg:block lg:w-1/4">
            <Sidebar />
          </aside>

          <section className="lg:w-3/4">
            <MobileFilterToggle />
            <ProductGrid />
            <Pagination totalPages={5} />
          </section>
        </div>
      </main>
    </div>
  );
}
