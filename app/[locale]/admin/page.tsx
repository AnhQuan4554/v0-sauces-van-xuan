'use client';

import type React from 'react';

import { useState } from 'react';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Product, ProductCreate, ProductUpdate } from '@/app/types/products';
import { createProduct } from '@/lib/supabase/products';

const initialProducts: Product[] = [
  {
    id: `1`,
    name: 'Hot Salsa Doritos 300G',
    price: 179900,
    sold: 48,
    image_url: '/hot-salsa-sauce-jar.jpg',
    tags: ['HOT', 'HOT', 'HOT', 'HOT'],
    description: 'Spicy hot salsa sauce perfect for adding heat to your meals',
  },
  {
    id: `2`,
    name: 'Green Pepper Sauce Tabasco 60ML',
    price: 79900,
    sold: 19,
    image_url: '/green-tabasco-sauce-bottle.jpg',
    tags: [],
    description: 'Classic green pepper sauce with authentic Tabasco flavor',
  },
];

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductUpdate | null>(null);
  const [formData, setFormData] = useState<ProductCreate>({
    name: '',
    price: 0,
    image_url: '',
    tags: [''],
    description: '',
    sold: 0,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: ProductCreate = {
      // id: Math.max(...products.map((p) => p.id)) + 1,
      name: formData.name,
      price: Number(formData.price),
      sold: 0,
      image_url: formData.image_url || '/placeholder.svg',
      tags: formData.tags,
      description: formData.description,
    };
    // setProducts([...products, newProduct]);
    setFormData({
      name: '',
      price: 0,
      image_url: '',
      tags: [''],
      description: '',
      sold: 0,
    });
    // Handle add product to DB
    try {
      const res = await createProduct(newProduct);
      if (res) {
        setIsAddDialogOpen(false);
        alert(`Create ${res?.name} success`);
      }
    } catch (error) {
      console.log('err when create new product');
    }
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updatedProduct: ProductUpdate = {
      ...editingProduct,
      name: formData.name,
      price: Number(formData.price),
      image_url: formData.image_url || '/placeholder.svg',
      tags: formData.tags,
      description: formData.description,
    };

    // setProducts(
    //   products.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
    // );
    setFormData({
      name: '',
      price: 0,
      image_url: '',
      tags: [''],
      description: '',
      sold: 0,
    });
    setEditingProduct(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const openEditDialog = (product: ProductUpdate) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      price: product.price || 0,
      image_url: product.image_url || '',
      tags: product.tags || [''],
      description: product.description || '',
      sold: product.sold || 0,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="bg-background min-h-screen p-4 sm:p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="soft-button cursor-pointer bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shop
              </Button>
            </Link>
            <h1 className="text-primary text-2xl font-bold sm:text-3xl">Product Management</h1>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="soft-button cursor-pointer">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="mx-2 max-h-[90vh] overflow-y-auto sm:mx-auto sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Enter the details for the new product.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                    required
                    className="cursor-text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (VND)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    placeholder="Enter price"
                    required
                    className="cursor-text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="Enter image URL or leave empty for placeholder"
                    className="cursor-text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => {
                      const valueTags = e.target.value;
                      const arrTags = valueTags
                        ?.split(',')
                        ?.map((tag) => tag.trim())
                        .filter((tag) => tag);
                      setFormData({ ...formData, tags: arrTags });
                    }}
                    placeholder="HOT, SPICY, NEW"
                    className="cursor-text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter product description"
                    className="cursor-text"
                  />
                </div>
                <div className="flex flex-col justify-end gap-2 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                    className="soft-button cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="soft-button cursor-pointer">
                    Add Product
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Table */}
        <div className="overflow-hidden rounded-lg border bg-white">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.image_url || '/placeholder.svg'}
                        alt={product.name}
                        className="h-12 w-12 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-primary font-semibold">
                      {formatPrice(product.price)}
                    </TableCell>
                    <TableCell>{product.sold}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {product.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(product)}
                          className="soft-button cursor-pointer"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="soft-button cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="mx-2 max-h-[90vh] overflow-y-auto sm:mx-auto sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>Update the product details.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditProduct} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  required
                  className="cursor-text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price (VND)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="Enter price"
                  required
                  className="cursor-text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="Enter image URL"
                  className="cursor-text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                <Input
                  id="edit-tags"
                  value={formData.tags}
                  onChange={(e) => {
                    const valueTags = e.target.value;
                    const arrTags = valueTags
                      ?.split(',')
                      ?.map((tag) => tag.trim())
                      .filter((tag) => tag);
                    setFormData({ ...formData, tags: arrTags });
                  }}
                  placeholder="HOT, SPICY, NEW"
                  className="cursor-text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  className="cursor-text"
                />
              </div>
              <div className="flex flex-col justify-end gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="soft-button cursor-pointer"
                >
                  Cancel
                </Button>
                <Button type="submit" className="soft-button cursor-pointer">
                  Update Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
