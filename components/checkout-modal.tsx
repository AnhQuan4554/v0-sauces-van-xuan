'use client';

import type React from 'react';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, MapPin } from 'lucide-react';
import { DeliveryInfo, PaymentMethodType } from '@/app/types/deliveryInfor';
import { BuyNowProductInterface, Product } from '@/app/types/products';
import { CreateOrderItem, OrderItem, OrderItemInput } from '@/app/types/orders';
import { createOrder, createOrderItems } from '@/lib/supabase/orders';

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buyNowProduct?: BuyNowProductInterface;
}
const defaultForm: DeliveryInfo = {
  fullName: '',
  phoneNumber: '',
  email: '',
  address: '',
  location: '',
  note: '',
  paymentMethod: 'cod',
};

export default function CheckoutModal({ open, onOpenChange, buyNowProduct }: CheckoutModalProps) {
  const [formData, setFormData] = useState<DeliveryInfo>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryType, setDeliveryType] = useState('delivery');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Calculate total amount
      let totalAmount = 0;
      let arrProdcut: BuyNowProductInterface[] = [];
      if (buyNowProduct) {
        totalAmount = buyNowProduct.price * buyNowProduct.quantity;
        arrProdcut = [buyNowProduct];
      } else {
        // Get cart items from localStorage
        const newOrders = await JSON.parse(localStorage.getItem('cart') || '[]');
        totalAmount = newOrders.reduce(
          (sum: number, item: any) => sum + item.price * item.quantity,
          0
        );
        arrProdcut = newOrders;
      }

      // Save order to database
      const { id: orderId } = await createOrder({
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phoneNumber,
        customer_address: formData.address,
        payment_method: formData.paymentMethod,
        notes: formData.note,
        total_amount: totalAmount,
      });

      console.log('Order saved successfully:', orderId);
      // Save order item
      const orderItemInput: OrderItemInput[] = arrProdcut.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      const { status } =
        orderId &&
        createOrderItems({
          order_id: orderId,
          items: orderItemInput,
        });
      console.log('status create order item ++++', status);
      // Clear cart after successful order
      if (!buyNowProduct) {
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
      }

      // Show success message
      alert("Order completed successfully! We'll contact you soon.");

      // Close modal and reset form
      onOpenChange(false);
      setFormData(defaultForm);
    } catch (error) {
      console.error('Error completing order:', error);
      alert('Failed to complete order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="sr-only">Checkout</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Delivery information */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Delivery information</h2>

            <Tabs value={deliveryType} onValueChange={setDeliveryType} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="delivery" className="flex cursor-pointer items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Delivery
                </TabsTrigger>
                <TabsTrigger value="pickup" className="flex cursor-pointer items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Pick up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="delivery" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    id="fullName"
                    placeholder="Enter full name"
                    label="Full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="cursor-text"
                    required
                  />

                  <div className="relative">
                    <Input
                      id="phoneNumber"
                      label="Phone"
                      placeholder="Enter phone number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="relative cursor-text pl-12"
                      required
                    />
                    <div className="absolute top-1/2 left-3 mt-3 -translate-y-1/2 transform">
                      <div className="flex h-4 w-6 items-center justify-center rounded-sm bg-red-500">
                        <span className="text-xs font-bold text-white">🇻🇳</span>
                      </div>
                    </div>
                  </div>

                  <Input
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="cursor-text"
                  />

                  <Input
                    id="address"
                    label="Address"
                    placeholder="Enter Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="cursor-text"
                    required
                  />
                  <Input
                    id="note"
                    label="Note"
                    placeholder="Enter note"
                    value={formData.note}
                    onChange={handleInputChange}
                    className="cursor-text"
                  />

                  <div className="space-y-2">
                    <p className="text-foreground mb-2 text-sm font-medium">Payment Method</p>

                    {/* Pay on Delivery */}
                    <label className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            paymentMethod: e.target.value as PaymentMethodType,
                          }))
                        }
                        className="radio radio-primary"
                      />
                      {/* Icon của DaisyUI (heroicons) */}
                      <span className="text-xl">💵</span>
                      <span className="text-sm">Pay on Delivery</span>
                    </label>

                    {/* Pay with QR */}
                    <label className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="qr"
                        checked={formData.paymentMethod === 'qr'}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            paymentMethod: e.target.value as PaymentMethodType,
                          }))
                        }
                        className="radio radio-primary"
                      />
                      <span className="text-xl">📷</span>
                      <span className="text-sm">Pay with QR</span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onOpenChange(false)}
                      className="flex-1 cursor-pointer"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 cursor-pointer" disabled={isSubmitting}>
                      {isSubmitting ? 'Processing...' : 'Complete Order'}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="pickup" className="mt-6">
                <div className="py-8 text-center text-gray-500">
                  <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <p>Pick up option coming soon!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
