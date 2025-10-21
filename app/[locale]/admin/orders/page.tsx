'use client';

import React, { useState } from 'react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type ExpandedState,
} from '@tanstack/react-table';
import { ChevronDown, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EditOrderDialog } from './edit-order-dialog';
import { sampleOrders } from './dataFake';
import { OrderItemTable, OrderTable } from '@/app/types/orders';

// Data Types

const statusList = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const;
type StatusType = (typeof statusList)[number];

const StatusBadge = ({ status }: { status: StatusType }) => {
  const statusConfig: Record<StatusType, { bg: string; text: string; label: string }> = {
    pending: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-800 dark:text-yellow-200',
      label: 'Pending',
    },
    processing: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-800 dark:text-blue-200',
      label: 'Processing',
    },
    shipped: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-800 dark:text-purple-200',
      label: 'Shipped',
    },
    delivered: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-200',
      label: 'Delivered',
    },
    cancelled: { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Cancelled' },
  };

  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${config?.bg} ${config?.text}`}
    >
      {config?.label}
    </span>
  );
};

function EditItemDialog({
  item,
  onClose,
  onSave,
}: {
  item: OrderItemTable;
  onClose: () => void;
  onSave: (quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-sm space-y-4 p-6">
        <h3 className="text-lg font-semibold">Edit Item Quantity</h3>
        <div className="space-y-2">
          <label className="text-sm font-medium">Product: {item.productName}</label>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="w-full"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(quantity);
              onClose();
            }}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default function OrderAdminPage() {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [editingOrder, setEditingOrder] = useState<OrderTable | null>(null);
  const [editingItem, setEditingItem] = useState<{ orderId: string; item: OrderItemTable } | null>(
    null
  );
  const [orders, setOrders] = useState<OrderTable[]>(sampleOrders);

  const handleUpdateItemQuantity = (orderId: string, itemId: string, newQuantity: number) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            items: order.items.map((item) => {
              if (item.id === itemId) {
                const newTotal = newQuantity * item.price;
                return { ...item, quantity: newQuantity, total: newTotal };
              }
              return item;
            }),
            totalAmount: order.items.reduce((sum, item) => {
              if (item.id === itemId) {
                return sum + newQuantity * item.price;
              }
              return sum + item.total;
            }, 0),
          };
        }
        return order;
      })
    );
  };

  const handleDeleteItem = (orderId: string, itemId: string) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          const updatedItems = order.items.filter((item) => item.id !== itemId);
          const newTotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
          return { ...order, items: updatedItems, totalAmount: newTotal };
        }
        return order;
      })
    );
  };

  const columns = React.useMemo<ColumnDef<OrderTable>[]>(
    () => [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => (
          <button
            onClick={row.getToggleExpandedHandler()}
            className="hover:bg-muted rounded p-1 transition-colors"
          >
            <ChevronDown
              size={18}
              className={`transition-transform ${row.getIsExpanded() ? 'rotate-180' : ''}`}
            />
          </button>
        ),
      },
      {
        accessorKey: 'id',
        header: 'Order #',
        cell: (info) => <span className="font-semibold">{info.getValue() as string}</span>,
      },
      {
        accessorKey: 'customer_name',
        header: 'Customer',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'customer_email',
        header: 'Email',
        cell: (info) => (
          <span className="text-muted-foreground text-sm">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'total_amount',
        header: 'Total',
        cell: (info) => (
          <span className="font-semibold">{(info.getValue() as number)?.toFixed(2)}</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => <StatusBadge status={info.getValue() as any} />,
      },
      {
        accessorKey: 'created_at',
        header: 'Date',
        cell: (info) => info.getValue(),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditingOrder(row.original)}
              className="gap-2"
            >
              <Edit2 size={16} />
              Edit
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: orders,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.items as any,
    getCoreRowModel: getCoreRowModel(),
    // getExpandedRowModel: getExpandedRowModel(),
  });

  const handleUpdateOrder = (updatedOrder: OrderTable) => {
    setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
    setEditingOrder(null);
  };

  return (
    <div className="bg-background min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-3xl font-bold md:text-4xl">Order Management</h1>
          <p className="text-muted-foreground">Manage and track all customer orders</p>
        </div>

        {/* Table Card */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-muted/50 border-b">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-foreground px-4 py-3 text-left text-sm font-semibold"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <React.Fragment key={row.id}>
                      <tr className="hover:bg-muted/50 border-b transition-colors">
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td key={cell.id} className="px-4 py-4 text-sm">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          );
                        })}
                      </tr>

                      {row.getIsExpanded() && row.subRows && row.subRows.length > 0 && (
                        <tr className="bg-muted/30">
                          <td colSpan={row.getVisibleCells().length} className="px-4 py-4">
                            <div className="space-y-3">
                              <h4 className="text-foreground font-semibold">Order Items</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b">
                                      <th className="text-muted-foreground px-3 py-2 text-left font-medium">
                                        Product
                                      </th>
                                      <th className="text-muted-foreground px-3 py-2 text-center font-medium">
                                        Qty
                                      </th>
                                      <th className="text-muted-foreground px-3 py-2 text-right font-medium">
                                        Price
                                      </th>
                                      <th className="text-muted-foreground px-3 py-2 text-right font-medium">
                                        Total
                                      </th>
                                      <th className="text-muted-foreground px-3 py-2 text-center font-medium">
                                        Actions
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {row.subRows.map((subRow) => {
                                      const item = subRow.original as any;
                                      return (
                                        <tr key={item.id} className="hover:bg-muted/50 border-b">
                                          <td className="px-3 py-2">{item.productName}</td>
                                          <td className="px-3 py-2 text-center">{item.quantity}</td>
                                          <td className="px-3 py-2 text-right">
                                            {item.price?.toFixed(2)}
                                          </td>
                                          <td className="px-3 py-2 text-right font-semibold">
                                            {item?.total?.toFixed(2)}
                                          </td>
                                          <td className="px-3 py-2 text-center">
                                            <div className="flex justify-center gap-2">
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                  setEditingItem({ orderId: row.original.id, item })
                                                }
                                                className="gap-1"
                                              >
                                                <Edit2 size={14} />
                                              </Button>
                                              <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                  handleDeleteItem(row.original.id, item.id)
                                                }
                                                className="text-destructive hover:text-destructive gap-1"
                                              >
                                                <Trash2 size={14} />
                                              </Button>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {table.getRowModel().rows.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          )}
        </Card>

        {/* Edit Order Dialog */}
        {/* {editingOrder && (
          <EditOrderDialog
            order={editingOrder}
            onClose={() => setEditingOrder(null)}
            onSave={handleUpdateOrder}
          />
        )} */}

        {/* Edit Item Dialog */}
        {editingItem && (
          <EditItemDialog
            item={editingItem.item}
            onClose={() => setEditingItem(null)}
            onSave={(quantity) => {
              handleUpdateItemQuantity(editingItem.orderId, editingItem.item.id, quantity);
              setEditingItem(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
