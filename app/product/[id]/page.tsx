"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getProduct, getProducts } from "@/app/utils/supabase/products";
import { Separator } from "@/components/ui/separator";
import { formatPrice, Product } from "@/app/types/products";

const defaultData: Product = {
  id: 1,
  image_url: "./asian-bean-sauce-jar.jpg",
  name: "",
  price: 0,
  sold: 0,
  tags: [""],
  description: "",
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = String(params?.id);
  console.log("productID", productId);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>(defaultData);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  // Related products (same category or random selection)
  const relatedProducts = useMemo(() => {
    return allProducts?.filter((p) => p.id !== product?.id)?.slice(0, 4);
  }, [product]);

  useEffect(() => {
    if (product) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.includes(product.id));
    }
  }, [product]);

  // Handle get all product and detail product
  useEffect(() => {
    const loadProducts = async () => {
      try {
        //Get all product
        const data = await getProducts();
        // Get product detail
        const dataDetail = await getProduct(productId);
        dataDetail && setProduct(dataDetail);
        data && setAllProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        alert("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((id: number) => id !== product.id);
    } else {
      updatedFavorites = [...favorites, product.id];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new CustomEvent("favoritesUpdated"));

    toast({
      title: isFavorite ? "addedToFavorites" : "addedToFavorites",
      description: `${product.name} has been ${
        isFavorite ? "removed from" : "added to"
      } your favorites`,
    });
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    toast({
      title: "addedToCart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            {"home"}
          </Link>
          <span>•</span>
          <span>{"products"}</span>
          <span>•</span>
          <span className="text-primary font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {relatedProducts &&
                relatedProducts.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={`${item.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-primary text-balance">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      (4.8) • {product.sold} {"sold"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFavorite}
                    className="p-3 rounded-full premium-button"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-3 rounded-full premium-button"
                  >
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.tags.length > 0 && (
                  <div className="flex gap-2">
                    {product.tags.slice(0, 2).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-accent/20 text-accent-foreground font-bold"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{"description"}</h3>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {product.description ||
                  "This premium spice sauce is carefully crafted with the finest ingredients to deliver exceptional flavor and quality. Perfect for enhancing your culinary creations with authentic taste and aroma."}
              </p>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-medium">{"quantity"}:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-muted"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-muted"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={addToCart}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground premium-button py-3 text-lg font-medium"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {"addToCart"}
                </Button>
                <Button
                  variant="outline"
                  className="px-8 premium-button py-3 text-lg font-medium bg-transparent"
                >
                  {"buyNow"}
                </Button>
              </div>
            </div>

            <Separator />

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{"productDetails"}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{"category"}:</span>
                    <span className="font-medium">{"Sauces"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{"brand"}:</span>
                    <span className="font-medium">Premium</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{"origin"}:</span>
                    <span className="font-medium">Vietnam</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {"shelfLife"}:
                    </span>
                    <span className="font-medium">24 months</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-primary">
            {"relatedProducts"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts?.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/product/${relatedProduct.id}`}
              >
                <Card className="product-card group border-border/50 hover:border-primary/20 bg-card overflow-hidden cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          relatedProduct.image_url ||
                          "/placeholder.svg?height=250&width=250&query=premium spice sauce"
                        }
                        alt={relatedProduct.name}
                        className="product-image w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-medium text-sm text-primary line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">
                          {formatPrice(relatedProduct.price)}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-accent text-accent" />
                          <span className="text-xs text-muted-foreground">
                            4.8
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
