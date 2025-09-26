"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import CheckoutModal from "@/components/checkout-modal"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(cart)
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }

    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="soft-button bg-transparent cursor-pointer h-8 sm:h-9 lg:h-10 px-2 sm:px-3 lg:px-4"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm lg:text-base hidden sm:inline">Back to Shop</span>
                <span className="text-xs sm:hidden">Back</span>
              </Button>
            </Link>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary flex items-center gap-1 sm:gap-2">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
              <span className="hidden sm:inline">Shopping Cart</span>
              <span className="sm:hidden">Cart</span>
            </h1>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-white rounded-lg border">
            <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">Add some products to get started</p>
            <Link href="/">
              <Button className="soft-button cursor-pointer text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <div className="hidden md:block bg-white rounded-lg border overflow-hidden">
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
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-sm lg:text-base">{item.name}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold text-primary text-sm lg:text-base">
                              {formatPrice(item.price)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-1 lg:gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="soft-button h-7 w-7 lg:h-8 lg:w-8 p-0 cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                className="w-12 lg:w-16 text-center cursor-text text-sm"
                                min="1"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="soft-button h-7 w-7 lg:h-8 lg:w-8 p-0 cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-bold text-primary text-sm lg:text-base">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="soft-button cursor-pointer h-7 w-7 lg:h-8 lg:w-8 p-0"
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

              <div className="md:hidden space-y-3 sm:space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg border p-3 sm:p-4">
                    <div className="flex gap-3 sm:gap-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base line-clamp-2">{item.name}</h3>
                        <p className="text-primary font-semibold mt-1 text-sm sm:text-base">
                          {formatPrice(item.price)}
                        </p>

                        <div className="flex items-center justify-between mt-2 sm:mt-3">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="soft-button h-7 w-7 sm:h-8 sm:w-8 p-0 cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="soft-button h-7 w-7 sm:h-8 sm:w-8 p-0 cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="font-bold text-primary text-sm sm:text-base">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="soft-button cursor-pointer h-7 w-7 sm:h-8 sm:w-8 p-0"
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
              <div className="bg-white border rounded-lg p-4 sm:p-5 lg:p-6 lg:sticky lg:top-4">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6 text-primary">
                  Order Summary
                </h2>

                <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-5 lg:mb-6">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
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

                  <div className="flex justify-between text-sm sm:text-base lg:text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Button
                    onClick={() => setShowCheckoutModal(true)}
                    className="w-full soft-button text-xs sm:text-sm lg:text-base py-2 sm:py-2.5 lg:py-3 cursor-pointer font-medium"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>

                  <Link href="/" className="block">
                    <Button
                      variant="outline"
                      className="w-full soft-button cursor-pointer bg-transparent text-xs sm:text-sm lg:text-base py-2 sm:py-2.5 lg:py-3"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <div className="mt-4 sm:mt-5 lg:mt-6 pt-4 sm:pt-5 lg:pt-6 border-t">
                  <h3 className="font-medium mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base">Promo Code</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      className="flex-1 cursor-text text-xs sm:text-sm h-8 sm:h-9 lg:h-10"
                    />
                    <Button
                      variant="outline"
                      className="soft-button cursor-pointer bg-transparent text-xs sm:text-sm px-2 sm:px-3 lg:px-4 h-8 sm:h-9 lg:h-10"
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
  )
}
