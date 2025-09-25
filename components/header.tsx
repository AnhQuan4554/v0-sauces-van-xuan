"use client"

import { useState, useEffect } from "react"
import { Phone, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import AdminModal from "./admin-modal"

export default function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [showAdminModal, setShowAdminModal] = useState(false)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(totalItems)
    }

    const updateFavoritesCount = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
      setFavoritesCount(favorites.length)
    }

    // Initial load
    updateCartCount()
    updateFavoritesCount()

    // Listen for updates
    window.addEventListener("cartUpdated", updateCartCount)
    window.addEventListener("favoritesUpdated", updateFavoritesCount)

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount)
      window.removeEventListener("favoritesUpdated", updateFavoritesCount)
    }
  }, [])

  return (
    <>
      <header className="bg-white border-b">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between py-2 sm:py-4 gap-2 sm:gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 cursor-pointer">
              <div className="text-lg sm:text-2xl font-bold text-primary">
                NAMAN
                <div className="text-xs sm:text-sm font-normal text-muted-foreground -mt-1">market</div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-xs sm:max-w-md md:max-w-2xl mx-2 sm:mx-4 md:mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search product..."
                  className="w-full pl-2 sm:pl-4 pr-16 sm:pr-24 py-1.5 sm:py-2 text-sm rounded-lg border-2 border-gray-200 focus:border-primary cursor-text"
                />
                <Button
                  size="sm"
                  className="absolute right-0.5 sm:right-1 top-0.5 sm:top-1 bottom-0.5 sm:bottom-1 px-2 sm:px-6 bg-primary hover:bg-primary/90 soft-button text-xs sm:text-sm cursor-pointer"
                >
                  <span className="hidden sm:inline">Search</span>
                  <span className="sm:hidden">Go</span>
                </Button>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-1 sm:gap-3 md:gap-6">
              {/* Hotline Support */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Hotline Support</div>
                  <div className="font-semibold text-primary">0903.166.228</div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdminModal(true)}
                className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-xs sm:text-sm font-medium"
              >
                Admin
              </Button>

              {/* Favorites Icon */}
              <Link href="/favorites" className="cursor-pointer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative p-1.5 sm:p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                >
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Cart Icon */}
              <Link href="/cart" className="cursor-pointer">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative p-1.5 sm:p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Language Selector */}
              <div className="bg-amber-100 text-amber-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium cursor-pointer">
                VI
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="bg-primary text-white">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-8 py-2 sm:py-3 overflow-x-auto">
              <Button
                variant="secondary"
                className="bg-accent text-white hover:bg-accent/90 soft-button text-xs sm:text-sm whitespace-nowrap cursor-pointer"
              >
                Shop by Category
              </Button>

              <div className="flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm whitespace-nowrap">
                <a href="#" className="hover:text-accent transition-colors cursor-pointer">
                  Gift Hampers
                </a>
                <a href="#" className="hover:text-accent transition-colors cursor-pointer">
                  Our Story
                </a>
                <a href="#" className="hover:text-accent transition-colors cursor-pointer">
                  News
                </a>
                <a href="#" className="hover:text-accent transition-colors cursor-pointer">
                  Contact us
                </a>
                <a href="#" className="hover:text-accent transition-colors cursor-pointer">
                  Mooncake
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AdminModal open={showAdminModal} onOpenChange={setShowAdminModal} />
    </>
  )
}
