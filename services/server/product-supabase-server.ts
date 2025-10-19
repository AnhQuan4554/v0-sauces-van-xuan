import { Product, SearchFilter } from '@/app/types/products';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// Get all products (server-side)
export async function getProductsServer2(): Promise<Product[]> {
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

// Định nghĩa số sản phẩm mỗi trang
export const DEFAULT_PRODUCTS_PER_PAGE = 20;

export async function getProductsServer(searchParams: SearchFilter = {}): Promise<{
  products: Product[];
  total: number;
}> {
  const supabase = await createServerSupabaseClient();

  // Khởi tạo query từ bảng products
  let query = supabase.from('products').select('*', { count: 'exact' }); // Lấy cả số lượng tổng để hỗ trợ phân trang

  // Xử lý lọc theo tên (tìm kiếm gần đúng)
  if (searchParams.name && searchParams.name.trim() !== '') {
    query = query.ilike('name', `%${searchParams.name}%`);
  }

  // Handle filter by minimum price
  if (searchParams.min_price) {
    query = query.gte('price', parseFloat(searchParams.min_price?.toString()));
  }

  // Handle filter by maximum price
  if (searchParams.max_price) {
    query = query.lte('price', parseFloat(searchParams.max_price?.toString()));
  }

  // Handle pagination
  const page = searchParams.current_page ? parseInt(searchParams.current_page.toString()) - 1 : 0;
  const from = page * Number(searchParams.limit || DEFAULT_PRODUCTS_PER_PAGE);
  const to = from + Number(searchParams.limit || DEFAULT_PRODUCTS_PER_PAGE) - 1;
  query = query.range(from, to);

  // Xử lý sắp xếp
  const validSortFields = ['price', 'name', 'created_at']; // Các trường hợp lệ để sắp xếp
  const sortBy =
    searchParams.sort_by && validSortFields.includes(searchParams.sort_by)
      ? searchParams.sort_by
      : 'created_at';
  const sortOrder = searchParams.sort_order === 'asc' ? true : false;
  query = query.order(sortBy, { ascending: sortOrder });

  // Execute query
  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return {
    products: data || [],
    total: data?.length > 0 ? (count ?? 0) : 0, // if data is null, count will be empty
  };
}
