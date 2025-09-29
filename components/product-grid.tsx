"use client";

import { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getProducts } from "@/app/utils/supabase/products";
import { useRouter } from "next/navigation";
import { formatPrice, Product } from "@/app/types/products";

export default function ProductGrid() {
  const { toast } = useToast();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: (typeof products)[0]) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      toast({
        title: "Updated cart",
        description: `${product.name} quantity updated to ${existingItem.quantity}`,
      });
    } else {
      cart.push({ ...product, quantity: 1 });
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Trigger cart update event
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary">
            Sauces And Pastes
          </h1>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
            <span>Home</span>
            <span>›</span>
            <span>Products</span>
            <span>›</span>
            <span className="hidden sm:inline">Sauces And Pastes</span>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-muted-foreground">
          Show 1-20 of 77 products
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {products &&
          products?.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col h-full cursor-pointer"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              <CardContent className="p-2 sm:p-4 flex flex-col h-full">
                <div className="relative mb-3 sm:mb-4">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-32 sm:h-48 object-cover rounded-lg"
                  />

                  {/* Tags */}
                  {product.tags.length > 0 && (
                    <div className="absolute top-1 sm:top-2 left-1 sm:left-2 flex flex-wrap gap-1">
                      {product.tags.slice(0, 2).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="destructive"
                          className="text-xs px-1 py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Favorite button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-1 sm:top-2 right-1 sm:right-2 p-1 sm:p-2 bg-white/80 hover:bg-white rounded-full cursor-pointer"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        favorites.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  </Button>
                </div>

                <div className="space-y-1 sm:space-y-2 flex-grow flex flex-col text-center">
                  <h3 className="font-medium text-xs sm:text-sm line-clamp-2 text-primary leading-tight flex-grow min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-center">
                    <span className="font-bold text-sm sm:text-lg text-primary">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Sold: {product.sold}
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground soft-button text-xs sm:text-sm py-1.5 sm:py-2 mt-auto cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">ADD TO CART</span>
                    <span className="sm:hidden">ADD</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          className="w-6 h-6 sm:w-8 sm:h-8 p-0 rounded-full bg-transparent text-xs sm:text-sm soft-button cursor-pointer"
        >
          1
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-6 h-6 sm:w-8 sm:h-8 p-0 text-xs sm:text-sm cursor-pointer"
        >
          2
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-6 h-6 sm:w-8 sm:h-8 p-0 text-xs sm:text-sm cursor-pointer"
        >
          3
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-6 h-6 sm:w-8 sm:h-8 p-0 text-xs sm:text-sm cursor-pointer"
        >
          4
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs sm:text-sm px-2 sm:px-3 cursor-pointer"
        >
          Next ›
        </Button>
      </div>
    </div>
  );
}
