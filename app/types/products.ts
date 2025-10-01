export interface Product {
  id: string;
  name: string;
  name_en?: string;
  price: number;
  sold: number;
  image_url: string;
  tags: string[];
  description?: string;
  description_en?: string;
}

export type ProductCreate = Omit<Product, "id">;

export interface ProductUpdate extends Partial<ProductCreate> {
  id: string;
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};
