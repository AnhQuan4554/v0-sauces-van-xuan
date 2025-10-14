'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/app/utils/format-price';
import Image from 'next/image';
import { getAllOrderItemsByPhone } from '@/lib/supabase/orders';
import { formatDate } from '@/app/utils/format-date';
import { useTranslations } from 'next-intl';

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
  const { toast } = useToast();
  const t = useTranslations();
  console.log('parame/phone', phone);
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
          <p className="text-sm sm:text-base">Loading Order...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-background min-h-screen p-3 sm:p-4 lg:p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between lg:mb-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 lg:gap-4">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="soft-button h-9 w-fit cursor-pointer bg-transparent text-xs sm:h-10 sm:text-sm"
              >
                <ArrowLeft className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="xs:inline hidden">{t('Component.Button.backToShop')}</span>
                <span className="xs:hidden">{t('Component.Button.back')}</span>
              </Button>
            </Link>
            <h1 className="text-primary text-xl font-bold sm:text-2xl lg:text-3xl">
              {t('Title.orderManagement')}
            </h1>
          </div>
        </div>

        <div className="hidden overflow-hidden rounded-lg border bg-white shadow-sm md:block">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-sm lg:w-20">{t('Table.img')}</TableHead>
                  <TableHead className="min-w-[140px] text-sm">{t('Table.productName')}</TableHead>
                  <TableHead className="min-w-[90px] text-sm">{t('Table.price')}</TableHead>
                  <TableHead className="min-w-[80px] text-sm">{t('Table.quantity')}</TableHead>
                  <TableHead className="min-w-[110px] text-sm">{t('Table.total')}</TableHead>
                  <TableHead className="min-w-[100px] text-sm">{t('Table.status')}</TableHead>
                  <TableHead className="min-w-[120px] text-sm">{t('Table.createDate')}</TableHead>
                  <TableHead className="min-w-[110px] text-right text-sm">
                    {t('Table.action')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderItemId}>
                    <TableCell className="p-3 lg:p-4">
                      <img
                        src={order.image_url || '/placeholder.svg'}
                        alt={order.productName}
                        className="h-12 w-12 rounded object-cover lg:h-14 lg:w-14"
                      />
                    </TableCell>
                    <TableCell className="p-3 text-sm font-medium lg:p-4">
                      {order.productName}
                    </TableCell>
                    <TableCell className="text-primary p-3 text-sm font-semibold lg:p-4">
                      {formatPrice(order.price)}
                    </TableCell>
                    <TableCell className="p-3 text-sm lg:p-4">{order.quantity}</TableCell>
                    <TableCell className="p-3 text-sm lg:p-4">{order.totalAmount}</TableCell>
                    <TableCell
                      className={`p-3 text-sm lg:p-4 ${
                        order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : order.status === 'completed'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : order.status === 'cancelled'
                                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                : ''
                      }`}
                    >
                      {order.status}
                    </TableCell>
                    <TableCell className="p-3 text-sm lg:p-4">
                      {formatDate(order.createdDate)}
                    </TableCell>
                    <TableCell className="p-3 text-right lg:p-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenModal(order)}
                          className="soft-button h-8 w-8 cursor-pointer p-0 lg:h-9 lg:w-9"
                        >
                          <Edit className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProduct(order.orderItemId)}
                          className="soft-button h-8 w-8 cursor-pointer p-0 lg:h-9 lg:w-9"
                        >
                          <Trash2 className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-3 md:hidden">
          {orders.map((order) => (
            <Card key={order.orderItemId} className="overflow-hidden border bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={order.image_url || '/placeholder.svg'}
                      alt={order.productName}
                      className="h-20 w-20 rounded object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h3 className="text-primary line-clamp-2 text-sm font-semibold">
                      {order.productName}
                    </h3>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                      <div>
                        <span className="text-muted-foreground">{t('Table.price')}:</span>
                        <span className="text-primary ml-1 font-semibold">
                          {formatPrice(order.price)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('Table.quantity')}:</span>
                        <span className="ml-1 font-medium">{order.quantity}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('Table.total')}:</span>
                        <span className="ml-1 font-medium">{order.totalAmount}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('Table.status')}:</span>
                        <span className="ml-1 font-medium">{order.status}</span>
                      </div>
                    </div>

                    <div className="text-muted-foreground text-xs">{order.createdDate}</div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal(order)}
                        className="soft-button h-8 flex-1 cursor-pointer text-xs"
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        {t('Component.Button.edit')}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProduct(order.orderItemId)}
                        className="soft-button h-8 flex-1 cursor-pointer text-xs"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        {t('Component.Button.delete')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="mx-3 max-h-[85vh] w-[calc(100%-1.5rem)] max-w-[425px] overflow-y-auto sm:mx-auto sm:max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">{t('Title.editProduct')}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditOrder} className="space-y-3 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="edit-name" className="text-xs sm:text-sm">
                  {t('Title.productName')}
                </Label>
                <Input
                  id="edit-name"
                  value={orderDetail?.productName}
                  placeholder={t('Title.productName')}
                  required
                  className="h-9 cursor-text text-xs sm:h-10 sm:text-sm"
                  disabled
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="edit-price" className="text-xs sm:text-sm">
                  {t('Title.price')} (VND)
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={orderDetail?.price}
                  placeholder="Enter price"
                  required
                  className="h-9 cursor-text text-xs sm:h-10 sm:text-sm"
                  disabled
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Image
                  src={orderDetail.image_url || '/placeholder.svg'}
                  alt={orderDetail.productName}
                  className="h-16 w-16 flex-shrink-0 rounded object-cover sm:h-20 sm:w-20"
                  width={80}
                  height={80}
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="edit-status" className="text-xs sm:text-sm">
                  {t('Table.status')}
                </Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-9 w-full justify-between bg-transparent text-xs sm:h-10 sm:text-sm"
                    >
                      {orderDetail.status || 'Select status'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="mx-3 w-[calc(100%-1.5rem)] max-w-xs sm:mx-auto">
                    <DialogHeader>
                      <DialogTitle className="text-base sm:text-lg">Update Status</DialogTitle>
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
                          className={`h-9 w-full text-xs sm:h-10 sm:text-sm ${
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

              <div className="flex flex-col-reverse justify-end gap-2 pt-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="soft-button h-9 cursor-pointer text-xs sm:h-10 sm:text-sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="soft-button h-9 cursor-pointer text-xs sm:h-10 sm:text-sm"
                >
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
