export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  status: string;
  payment_method: string;
  transaction_id: string | null;
  paid_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  sepay_transaction_id: string | null;
  sepay_gateway: string | null;
  sepay_amount: number | null;
  sepay_status: string | null;
  sepay_paid_at: string | null;
  sepay_content: string | null;
}
export type OrderStatus = 'pending' | 'paid' | 'processing' | 'delivered' | 'cancelled';
export interface CreateOrder {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  payment_method: string;
  notes?: string;
}

export interface OrderUpdatePayload {
  status?: string;
  sepay_transaction_id?: string;
  sepay_gateway?: string;
  sepay_amount?: number;
  sepay_status?: string;
  sepay_paid_at?: string; // ISO date string
  sepay_content?: string;
  updated_at?: string; // ISO date string
}
// Order Item
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  subtotal: number;
  created_at: string;
}

export interface OrderItemInput {
  product_id: string;
  quantity: number;
  price_at_purchase: number;
}
export interface CreateOrderItem {
  order_id: string;
  items: OrderItemInput[];
}

export type UpdateOrderItem = Partial<Omit<OrderItem, 'id' | 'created_at'>>;
