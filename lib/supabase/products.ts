import { createClient } from "./client";
import { Product, ProductCreate, ProductUpdate } from "@/app/types/products";

// Get all products
export async function getProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return data || [];
}

// Get single product by ID
export async function getProduct(id: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
}

// Create new product
export async function createProduct(
  productData: ProductCreate
): Promise<ProductCreate> {
  const supabase = createClient();
  const { data, error, status } = await supabase
    .from("products")
    .insert(productData)
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    throw error;
  }
  console.log("status+++", status);
  return data;
}

// Update product
export async function updateProduct(
  productData: ProductUpdate
): Promise<Product> {
  const supabase = createClient();
  const { id, ...updateData } = productData;

  const { data, error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating product:", error);
    throw error;
  }

  return data;
}

// Delete product
export async function deleteProduct(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Upload image to Supabase storage
export async function uploadProductImage(file: File): Promise<string> {
  const supabase = createClient();

  // Generate unique filename
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(data.path);

  return publicUrl;
}

// Delete image from Supabase storage
export async function deleteProductImage(imageUrl: string): Promise<void> {
  const supabase = createClient();

  // Extract file path from URL
  const urlParts = imageUrl.split("/product-images/");
  if (urlParts.length < 2) return;

  const filePath = urlParts[1];

  const { error } = await supabase.storage
    .from("product-images")
    .remove([filePath]);

  if (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}
