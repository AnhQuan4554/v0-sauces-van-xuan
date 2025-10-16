import { Product } from '@/app/types/products';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// Get all products (server-side)
export async function getProductsServer(): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data || [];
}

// Get single product by ID
export async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

// Get related products based on origin or brand
export async function getRelatedProducts(
  origin: string | null,
  brand: string | null,
  excludeProductId: string
): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();

  if (!origin && !brand) {
    return [];
  }

  const orConditions = [];
  if (origin) orConditions.push(`origin.eq.${origin}`);
  if (brand) orConditions.push(`brand.eq.${brand}`);

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(orConditions.join(','))
    .neq('id', excludeProductId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching related products:', error);
    throw error;
  }

  return data || [];
}
