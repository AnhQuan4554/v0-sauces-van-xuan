'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OrderTableRow } from '@/app/types/orders';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { getStatusColorClass } from '@/app/utils/orderStatus';
import { updateOrderStatus } from '@/services/client/orders-supabase-client';

const ORDER_STATUS = ['pending', 'processing', 'completed', 'cancelled'];

interface OrderEditFormProps {
  orderDetail: OrderTableRow;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
}

const OrderEditForm = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  orderDetail,
}: OrderEditFormProps) => {
  const t = useTranslations();
  const [orderStatus, setOrderStatus] = useState(orderDetail?.status || 'pending');

  const handleEditOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedOrder = {
      ...orderDetail,
      status: orderStatus,
    };

    const updatedStatus = await updateOrderStatus(updatedOrder.orderItemId, updatedOrder.status);
    console.log('updateOrder', updatedStatus);
  };

  return (
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
                  className={`h-9 w-full justify-between text-xs sm:h-10 sm:text-sm ${getStatusColorClass(
                    orderStatus
                  )}`}
                >
                  {orderStatus || 'Select status'}
                </Button>
              </DialogTrigger>
              <DialogContent className="mx-3 w-[calc(100%-1.5rem)] max-w-xs sm:mx-auto">
                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg">Update Status</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  {ORDER_STATUS.map((status) => (
                    <DialogClose asChild key={status}>
                      <Button
                        key={status}
                        variant={orderStatus === status ? 'default' : 'outline'}
                        onClick={() => {
                          setOrderStatus(status);
                        }}
                        className={`h-9 w-full text-xs sm:h-10 sm:text-sm ${getStatusColorClass(
                          status
                        )}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    </DialogClose>
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
  );
};

export default OrderEditForm;
