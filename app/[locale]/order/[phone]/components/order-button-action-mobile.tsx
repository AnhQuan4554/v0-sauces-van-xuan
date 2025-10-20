'use client';
import { Edit, Trash2 } from 'lucide-react';
import { OrderTableRow } from '@/app/types/orders';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useTranslations } from 'use-intl';

interface OrderButtonActionMobileProps {
  order: OrderTableRow;
}
const OrderButtonActionMobile = ({ order }: OrderButtonActionMobileProps) => {
  const t = useTranslations();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleOpenModal = (order: OrderTableRow) => {
    // setOrderDetail(order);
    setIsEditDialogOpen(true);
  };
  const handleDeleteProduct = (orderItemId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      // Call API delete and getAll order
    }
  };
  return (
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
  );
};

export default OrderButtonActionMobile;
