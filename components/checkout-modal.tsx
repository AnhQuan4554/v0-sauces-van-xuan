"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, MapPin } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CheckoutModal({ open, onOpenChange }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    country: "Vietnam",
    address: "",
    location: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deliveryType, setDeliveryType] = useState("delivery")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Get cart items from localStorage
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")

      // Calculate total amount
      const totalAmount = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

      // Save order to database
      const supabase = createClient()
      const { data, error } = await supabase
        .from("orders")
        .insert({
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email: formData.email,
          country: formData.country,
          address: formData.address,
          location: formData.location,
          delivery_type: deliveryType,
          cart_items: cart,
          total_amount: totalAmount,
          order_status: "pending",
        })
        .select()

      if (error) {
        console.error("Error saving order:", error)
        alert("Failed to complete order. Please try again.")
        return
      }

      console.log("Order saved successfully:", data)

      // Clear cart after successful order
      localStorage.removeItem("cart")
      window.dispatchEvent(new Event("cartUpdated"))

      // Show success message
      alert("Order completed successfully! We'll contact you soon.")

      // Close modal and reset form
      onOpenChange(false)
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        country: "Vietnam",
        address: "",
        location: "",
      })
    } catch (error) {
      console.error("Error completing order:", error)
      alert("Failed to complete order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Checkout</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sign in section */}
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Sign in to unlock seamless shopping and exclusive deals just for you
            </p>
            <Button variant="outline" className="cursor-pointer bg-transparent">
              Sign in
            </Button>
          </div>

          {/* Delivery information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Delivery information</h2>

            <Tabs value={deliveryType} onValueChange={setDeliveryType} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="delivery" className="flex items-center gap-2 cursor-pointer">
                  <Truck className="h-4 w-4" />
                  Delivery
                </TabsTrigger>
                <TabsTrigger value="pickup" className="flex items-center gap-2 cursor-pointer">
                  <MapPin className="h-4 w-4" />
                  Pick up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="delivery" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="cursor-text"
                    required
                  />

                  <div className="relative">
                    <Input
                      placeholder="Enter phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="cursor-text pl-12"
                      required
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-4 bg-red-500 rounded-sm flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🇻🇳</span>
                      </div>
                    </div>
                  </div>

                  <Input
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="cursor-text"
                    required
                  />

                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vietnam">Vietnam</SelectItem>
                      <SelectItem value="Thailand">Thailand</SelectItem>
                      <SelectItem value="Singapore">Singapore</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="cursor-text"
                    required
                  />

                  <Input
                    placeholder="Province/City, District/County, Ward/Commune"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="cursor-text"
                    required
                  />

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
                      {isSubmitting ? "Processing..." : "Complete Order"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="pickup" className="mt-6">
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Pick up option coming soon!</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
