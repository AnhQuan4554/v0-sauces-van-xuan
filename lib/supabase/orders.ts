import { CreateOrder, CreateOrderItem, OrderUpdatePayload } from '@/app/types/orders';
import { createClient } from './client';

const supabase = createClient();
// Tạo mới đơn hàng (orders)
export async function createOrder(orderData: CreateOrder) {
  console.log('orderData++++', orderData);
  const { data, error } = await supabase
    .from('orders')
    .insert({
      customer_name: orderData.customer_name,
      customer_email: orderData.customer_email,
      customer_phone: orderData.customer_phone,
      customer_address: orderData.customer_address,
      total_amount: orderData.total_amount,
      notes: orderData.notes,
      // status: 'pending',
      // payment_method: 'sepay',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select('id,customer_phone')
    .single();
  if (error) {
    console.log('err', error);
  }
  if (error) throw new Error(`Tạo đơn hàng thất bại: ${error.message}`);
  return data;
}

// Tạo mới chi tiết đơn hàng (order_items)
export async function createOrderItems(orderItem: CreateOrderItem) {
  const listProduct = orderItem.items;
  const orderItems = listProduct.map((item) => ({
    order_id: orderItem.order_id,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_purchase: item.price_at_purchase,
    subtotal: item.quantity * item.price_at_purchase,
    created_at: new Date().toISOString(),
  }));

  const { error, status } = await supabase.from('order_items').insert(orderItems);

  if (error) throw new Error(`Tạo chi tiết đơn hàng thất bại: ${error.message}`);
  return status;
}

type OrderItemRow = {
  id: number;
  quantity: number;
  subtotal: number;
  product: { name: string; image_url: string };
  order: { customer_phone: string };
};

export interface OrderItem {
  id: string;
  quantity: number;
  subtotal: number;
  created_at: string;
  product: {
    name: string;
    image_url: string | null;
    price: number;
  };
  order: {
    customer_phone: string;
    status: string;
  };
}

export async function getAllOrderItemsByPhone(phoneInput: string): Promise<OrderItem[]> {
  let { data, error } = await supabase
    .from('order_items')
    .select(
      `
      id,
      quantity,
      subtotal,
      created_at,
      product:products (
        name,
        image_url,
        price
      ),
      order:orders!inner (
        customer_phone,
        status
      )
    `
    )
    .eq('order.customer_phone', phoneInput);

  if (error) throw error;

  const formattedData: OrderItem[] = (data || []).map((item: any) => ({
    id: item.id,
    quantity: item.quantity,
    product: item.product,
    subtotal: item.subtotal,
    order: item.order,
    created_at: item.created_at,
  }));

  console.log('Formatted Data:', formattedData);
  return formattedData;
}
// Get all order item dependent on
// export async function getAllOrderItemsByPhone(phoneInput: string) {
//   let { data, error } = await supabase
//     .from('order_items')
//     .select(
//       `
//     id,
//     quantity,
//     subtotal,
//     product:products (
//       name,
//       image_url
//     ),
//    order:orders!inner (
//       customer_phone
//     )
//   `
//     )
//     .eq('order.customer_phone', phoneInput);

//   if (error) throw error;

//   console.log(data);
//   return data;
//   // data[0].order_items => tất cả order_items của order đó
// }

// Cập nhật đơn hàng (orders)
export async function updateOrder(orderId: string, updates: OrderUpdatePayload) {
  const { error } = await supabase
    .from('orders')
    .update({
      ...updates,
      updated_at: updates.updated_at || new Date().toISOString(),
    })
    .eq('id', orderId);

  if (error) throw new Error(`Cập nhật đơn hàng thất bại: ${error.message}`);
}

////////////////////////////////
// Xóa đơn hàng (orders) và chi tiết liên quan
export async function deleteOrder(orderId: string) {
  // Xóa order_items trước (do ON DELETE CASCADE không áp dụng nếu không cấu hình)
  const { error: deleteItemsError } = await supabase
    .from('order_items')
    .delete()
    .eq('order_id', orderId);

  if (deleteItemsError)
    throw new Error(`Xóa chi tiết đơn hàng thất bại: ${deleteItemsError.message}`);

  // Xóa orders
  const { error: deleteOrderError } = await supabase.from('orders').delete().eq('id', orderId);

  if (deleteOrderError) throw new Error(`Xóa đơn hàng thất bại: ${deleteOrderError.message}`);
}

// Xóa chi tiết đơn hàng (order_items) riêng lẻ (nếu cần)
export async function deleteOrderItem(itemId: string) {
  const { error } = await supabase.from('order_items').delete().eq('id', itemId);

  if (error) throw new Error(`Xóa chi tiết đơn hàng thất bại: ${error.message}`);
}
