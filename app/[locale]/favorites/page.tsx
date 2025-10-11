"use client"

import { useState, useEffect } from "react"
import { Heart, ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface FavoriteItem {
  id: number
  name: string
  price: number
  image: string
  vendor: string
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(savedFavorites)
  }, [])

  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id)
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    window.dispatchEvent(new Event("favoritesUpdated"))

    toast({
      title: "Removed from favorites",
      description: "Item has been removed from your favorites list.",
    })
  }

  const addToCart = (item: FavoriteItem) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItem = cart.find((cartItem: any) => cartItem.id === item.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="soft-button bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">My Favorites</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No favorites yet</p>
          <p className="text-sm text-muted-foreground mb-6">
            Start adding products to your favorites by clicking the heart icon
          </p>
          <Link href="/">
            <Button className="soft-button">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="relative mb-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 soft-button"
                  onClick={() => removeFromFavorites(item.id)}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                <p className="text-xs text-muted-foreground">{item.vendor}</p>
                <p className="text-primary font-bold">{item.price.toLocaleString()}đ</p>

                <Button className="w-full soft-button" size="sm" onClick={() => addToCart(item)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
