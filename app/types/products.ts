export interface Product {
  id: number;
  name: string;
  price: number;
  sold: number;
  image_url: string;
  tags: string[];
  description?: string;
}

export type ProductCreate = Omit<Product, "id">;

export type ProductUpdate = Partial<ProductCreate>;

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};
