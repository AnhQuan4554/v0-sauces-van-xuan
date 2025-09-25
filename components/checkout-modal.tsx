"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, MapPin } from "lucide-react"

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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle checkout submission
    console.log("Checkout data:", formData)
    onOpenChange(false)
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

            <Tabs defaultValue="delivery" className="w-full">
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
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 cursor-pointer">
                      Complete Order
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
