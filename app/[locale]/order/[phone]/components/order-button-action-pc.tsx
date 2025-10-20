'use client';

import { OrderTableRow } from '@/app/types/orders';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import OrderEditForm from './order-edit-form';
interface OrderButtonActionPCProps {
  order: OrderTableRow;
}
const OrderButtonActionPC = ({ order }: OrderButtonActionPCProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleOpenModal = () => {
    setIsEditDialogOpen(true);
  };
  const handleDeleteProduct = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      // Call API delete and getAll order
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleOpenModal}
        className="soft-button h-8 w-8 cursor-pointer p-0 lg:h-9 lg:w-9"
      >
        <Edit className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDeleteProduct}
        className="soft-button h-8 w-8 cursor-pointer p-0 lg:h-9 lg:w-9"
      >
        <Trash2 className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
      </Button>
      <OrderEditForm
        orderDetail={order}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />
    </div>
  );
};

export default OrderButtonActionPC;
