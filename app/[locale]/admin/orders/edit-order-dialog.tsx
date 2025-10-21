'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  items: OrderItem[];
}

interface EditOrderDialogProps {
  order: Order;
  onClose: () => void;
  onSave: (order: Order) => void;
}

export function EditOrderDialog({ order, onClose, onSave }: EditOrderDialogProps) {
  const [status, setStatus] = useState<Order['status']>(order.status);

  const handleSave = () => {
    onSave({ ...order, status });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogDescription>Update the status for order {order.orderNumber}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Order Info */}
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm font-medium">Order Number</Label>
            <p className="text-lg font-semibold">{order.orderNumber}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm font-medium">Customer</Label>
            <p className="text-lg font-semibold">{order.customerName}</p>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm font-medium">Total Amount</Label>
            <p className="text-lg font-semibold">${order.totalAmount.toFixed(2)}</p>
          </div>

          {/* Status Selector */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium">
              Order Status
            </Label>
            <Select value={status} onValueChange={(value) => setStatus(value as Order['status'])}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
