import dynamic from 'next/dynamic';

const ProductDetail = dynamic(() => import('@/components/product-detail'), {
  loading: () => <p></p>,
  ssr: false, // Skip server-side rendering for client-only components
});

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetail productId={id} />;
}
