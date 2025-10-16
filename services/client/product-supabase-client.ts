import { Product, ProductCreate, ProductUpdate } from '@/app/types/products';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// Get all products
export async function getProducts(): Promise<Product[]> {
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
// Get products with optional filters and pagination
export async function searchProducts({
  name,
  minPrice,
  maxPrice,
  limit = 20,
  page = 1,
}: {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  page?: number;
}): Promise<Product[]> {
  let query = supabase.from('products').select('*').order('created_at', { ascending: false });

  if (name) {
    query = query.ilike('name', `%${name}%`);
  }

  if (minPrice) {
    query = query.gte('price', minPrice);
  }

  if (maxPrice) {
    query = query.lte('price', maxPrice);
  }

  const offset = (page - 1) * limit;
  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data || [];
}

// Create new product
export async function createProduct(productData: ProductCreate): Promise<ProductCreate> {
  const { data, error, status } = await supabase
    .from('products')
    .insert(productData)
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    throw error;
  }
  console.log('status+++', status);
  return data;
}

// Update product
export async function updateProduct(productData: ProductUpdate): Promise<Product> {
  const { id, ...updateData } = productData;

  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    throw error;
  }

  return data;
}

// Delete product
export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

// Upload image to Supabase storage
export async function uploadProductImage(file: File): Promise<string> {
  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  const { data, error } = await supabase.storage.from('product-images').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    console.error('Error uploading image:', error);
    throw error;
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from('product-images').getPublicUrl(data.path);

  return publicUrl;
}
