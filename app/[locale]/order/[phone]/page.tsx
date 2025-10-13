'use client';
import React, { useEffect, useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/app/utils/format-price';
import Image from 'next/image';
import { get } from 'http';
import { getAllOrderItemsByPhone } from '@/lib/supabase/orders';

interface OrderTableRow {
  orderItemId: string;
  image_url: string;
  productName: string;
  quantity: number;
  price: number;
  totalAmount: number;
  createdDate: string;
  status: string;
}
interface OrderEdit {
  orderItemId: string;
  quantity: number;
}
const handleDeleteProduct = (orderItemId: string) => {
  if (confirm('Are you sure you want to delete this product?')) {
    // Call API delete and getAll order
  }
};
const handleEditOrder = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  // const orderData: OrderEdit = {
  //   orderItemId: editingProduct?.id || '',
  //   quantity: formData.get('quantity') || 1,
  // };

  // setEditingProduct(product);
  // setFormData({
  //   name: product.name || '',
  //   price: product.price || 0,
  //   image_url: product.image_url || '',
  //   tags: product.tags || [''],
  //   description: product.description || '',
  //   sold: product.sold || 0,
  // });
  // setIsEditDialogOpen(true);
};

const initialOrderDetail: OrderTableRow = {
  orderItemId: '',
  image_url: '',
  productName: '',
  quantity: 1,
  price: 0,
  totalAmount: 0,
  createdDate: '',
  status: '',
};
interface OrderCustomerProps {
  params: { phone: string };
}
const OrderCustomer = ({ params }: OrderCustomerProps) => {
  const { phone } = params;
  console.log('parame/phone', phone);
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderTableRow[]>([]);
  const [orderDetail, setOrderDetail] = useState<OrderTableRow>(initialOrderDetail);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState<OrderEdit>({
    orderItemId: '',
    quantity: 1,
  });
  const handleOpenModal = (order: OrderTableRow) => {
    setOrderDetail(order);
    setIsEditDialogOpen(true);
  };

  useEffect(() => {
    // Fetch orders by phone
    const handleFetchOrders = async () => {
      const res = await getAllOrderItemsByPhone(phone);
      const data =
        res &&
        res?.map((orderItem) => {
          return {
            orderItemId: orderItem.id,
            image_url: orderItem.product.image_url ?? '',
            productName: orderItem.product.name,
            quantity: orderItem.quantity,
            price: orderItem.product.price,
            totalAmount: orderItem.subtotal,
            createdDate: orderItem.created_at,
            status: orderItem.order.status,
          };
        });
      console.log('data when fetch++', data);
      setOrders(data);
      setLoading(false);
    };
    handleFetchOrders();
  }, [phone]);

  if (loading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }
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
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderItemId}>
                    <TableCell>
                      <img
                        src={order.image_url || '/placeholder.svg'}
                        alt={order.productName}
                        className="h-12 w-12 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{order.productName}</TableCell>
                    <TableCell className="text-primary font-semibold">
                      {formatPrice(order.price)}
                    </TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.createdDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenModal(order)}
                          className="soft-button cursor-pointer"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProduct(order.orderItemId)}
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
            <form onSubmit={handleEditOrder} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={orderDetail?.productName}
                  placeholder="Enter product name"
                  required
                  className="cursor-text"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price (VND)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={orderDetail?.price}
                  placeholder="Enter price"
                  required
                  className="cursor-text"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Image
                  src={orderDetail.image_url || '/placeholder.svg'}
                  alt={orderDetail.productName}
                  className="h-16 w-16 flex-shrink-0 rounded object-cover sm:h-20 sm:w-20"
                  width={64}
                  height={64}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline" className="w-full justify-between">
                      {orderDetail.status || 'Select status'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xs">
                    <DialogHeader>
                      <DialogTitle>Update Status</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                      {['pending', 'processing', 'completed', 'cancelled'].map((status) => (
                        <Button
                          key={status}
                          variant={orderDetail.status === status ? 'default' : 'outline'}
                          onClick={() => {
                            setOrderDetail((prev) => ({
                              ...prev,
                              status,
                            }));
                            setIsEditDialogOpen(false);
                          }}
                          className={`w-full ${
                            status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              : status === 'processing'
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                : status === 'completed'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                  : status === 'cancelled'
                                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                    : ''
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
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
};

export default OrderCustomer;
