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
