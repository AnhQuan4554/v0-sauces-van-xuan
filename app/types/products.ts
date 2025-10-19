export interface Product {
  id: string;
  name: string;
  name_en?: string;
  price: number;
  sold: number;
  stock?: number;
  image_url: string;
  tags: string[];
  description?: string;
  description_en?: string;
  origin?: string;
  brand?: string;
}

export type ProductCreate = Omit<Product, 'id'>;

export interface ProductUpdate extends Partial<ProductCreate> {
  id: string;
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

// Interface custom
export interface BuyNowProductInterface extends Product {
  quantity: number;
}

// Search Filter
export interface SearchFilter {
  name?: string;
  min_price?: number;
  max_price?: number;
  limit?: number;
  current_page?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}
