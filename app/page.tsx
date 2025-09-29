import Header from "@/components/header";
import ProductGrid from "@/components/product-grid";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import AdminModal from "@/components/admin-modal";
import FloatingSocial from "@/components/floating-social";
import MobileFilterToggle from "@/components/mobile-filter-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AdminModal />
      <FloatingSocial />

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          <aside className="hidden lg:block lg:w-1/4">
            <Sidebar />
          </aside>

          <section className="lg:w-3/4">
            <MobileFilterToggle />
            <ProductGrid />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
