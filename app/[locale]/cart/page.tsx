'use client';

import { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import CheckoutModal from '@/components/checkout-modal';
import { BuyNowProductInterface } from '@/app/types/products';
import Image from 'next/image';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<BuyNowProductInterface[]>([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="bg-background min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-6 sm:flex-row sm:items-center sm:gap-4 lg:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="soft-button h-8 cursor-pointer bg-transparent px-2 sm:h-9 sm:px-3 lg:h-10 lg:px-4"
              >
                <ArrowLeft className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden text-xs sm:inline sm:text-sm lg:text-base">
                  Back to Shop
                </span>
                <span className="text-xs sm:hidden">Back</span>
              </Button>
            </Link>
            <h1 className="text-primary flex items-center gap-1 text-lg font-bold sm:gap-2 sm:text-xl md:text-2xl lg:text-3xl">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
              <span className="hidden sm:inline">Shopping Cart</span>
              <span className="sm:hidden">Cart</span>
            </h1>
          </div>
          <div className="text-muted-foreground text-xs sm:text-sm">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-lg border bg-white py-8 text-center sm:py-12">
            <ShoppingBag className="text-muted-foreground mx-auto mb-3 h-12 w-12 sm:mb-4 sm:h-16 sm:w-16" />
            <h2 className="mb-2 text-lg font-semibold sm:text-xl">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4 text-sm sm:mb-6 sm:text-base">
              Add some products to get started
            </p>
            <Link href="/">
              <Button className="soft-button cursor-pointer px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <div className="hidden overflow-hidden rounded-lg border bg-white md:block">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16 text-xs lg:text-sm">Image</TableHead>
                        <TableHead className="text-xs lg:text-sm">Product</TableHead>
                        <TableHead className="text-xs lg:text-sm">Price</TableHead>
                        <TableHead className="text-center text-xs lg:text-sm">Quantity</TableHead>
                        <TableHead className="text-xs lg:text-sm">Total</TableHead>
                        <TableHead className="text-right text-xs lg:text-sm">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Image
                              src={item.image_url || '/placeholder.svg'}
                              alt={item.name}
                              className="h-12 w-12 rounded object-cover lg:h-16 lg:w-16"
                              width={48}
                              height={48}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium lg:text-base">{item.name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-primary text-sm font-semibold lg:text-base">
                              {formatPrice(item.price)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-1 lg:gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="soft-button h-7 w-7 cursor-pointer p-0 lg:h-8 lg:w-8"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(item.id, Number.parseInt(e.target.value) || 1)
                                }
                                className="w-12 cursor-text text-center text-sm lg:w-16"
                                min="1"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="soft-button h-7 w-7 cursor-pointer p-0 lg:h-8 lg:w-8"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-primary text-sm font-bold lg:text-base">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="soft-button h-7 w-7 cursor-pointer p-0 lg:h-8 lg:w-8"
                            >
                              <Trash2 className="h-3 w-3 lg:h-4 lg:w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 md:hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="rounded-lg border bg-white p-3 sm:p-4">
                    <div className="flex gap-3 sm:gap-4">
                      <Image
                        src={item.image_url || '/placeholder.svg'}
                        alt={item.name}
                        className="h-16 w-16 flex-shrink-0 rounded object-cover sm:h-20 sm:w-20"
                        width={48}
                        height={48}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-medium sm:text-base">
                          {item.name}
                        </h3>
                        <p className="text-primary mt-1 text-sm font-semibold sm:text-base">
                          {formatPrice(item.price)}
                        </p>

                        <div className="mt-2 flex items-center justify-between sm:mt-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="soft-button h-7 w-7 cursor-pointer p-0 sm:h-8 sm:w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm font-medium sm:w-8 sm:text-base">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="soft-button h-7 w-7 cursor-pointer p-0 sm:h-8 sm:w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-primary text-sm font-bold sm:text-base">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="soft-button h-7 w-7 cursor-pointer p-0 sm:h-8 sm:w-8"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-lg border bg-white p-4 sm:p-5 lg:sticky lg:top-4 lg:p-6">
                <h2 className="text-primary mb-3 text-base font-bold sm:mb-4 sm:text-lg lg:mb-6 lg:text-xl">
                  Order Summary
                </h2>

                <div className="mb-4 space-y-2 sm:mb-5 sm:space-y-3 lg:mb-6 lg:space-y-4">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>
                      Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):
                    </span>
                    <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                  </div>

                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Shipping:</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>

                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Tax:</span>
                    <span className="font-medium">Included</span>
                  </div>

                  <hr className="my-2 sm:my-3 lg:my-4" />

                  <div className="flex justify-between text-sm font-bold sm:text-base lg:text-lg">
                    <span>Total:</span>
                    <span className="text-primary">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Button
                    onClick={() => setShowCheckoutModal(true)}
                    className="soft-button w-full cursor-pointer py-2 text-xs font-medium sm:py-2.5 sm:text-sm lg:py-3 lg:text-base"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>

                  <Link href="/" className="block">
                    <Button
                      variant="outline"
                      className="soft-button w-full cursor-pointer bg-transparent py-2 text-xs sm:py-2.5 sm:text-sm lg:py-3 lg:text-base"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <div className="mt-4 border-t pt-4 sm:mt-5 sm:pt-5 lg:mt-6 lg:pt-6">
                  <h3 className="mb-2 text-xs font-medium sm:mb-3 sm:text-sm lg:text-base">
                    Promo Code
                  </h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      className="h-8 flex-1 cursor-text text-xs sm:h-9 sm:text-sm lg:h-10"
                    />
                    <Button
                      variant="outline"
                      className="soft-button h-8 cursor-pointer bg-transparent px-2 text-xs sm:h-9 sm:px-3 sm:text-sm lg:h-10 lg:px-4"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <CheckoutModal open={showCheckoutModal} onOpenChange={setShowCheckoutModal} />
    </div>
  );
}
