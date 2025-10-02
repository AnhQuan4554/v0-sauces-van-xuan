import { DeliveryInfo } from '@/app/types/deliveryInfor';
import { OrderItem } from '@/app/types/orders';
import { Product } from '@/app/types/products';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';

interface Order extends Product {
  quantity: number;
}
interface QRCodePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orders: Order[];
  deliveryInfo: DeliveryInfo;
  des: string;
}

const QRCodePaymentModal = (props: QRCodePaymentModalProps) => {
  const { des, orders, deliveryInfo } = props;
  const amount = orders.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex w-full rounded-lg bg-white p-6 shadow-md">
      <div className="flex flex-col">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Quét mã QR để thanh toán</h2>
        <Image
          src={`https://qr.sepay.vn/img?acc=109882638766&bank=VietinBank&amount=${amount}&des=SEVQR+TKPECM+${des}`}
          alt="QR Code Thanh Toán"
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Thông tin đơn hàng</h2>
        <div className="mb-6 space-y-2">
          <p>
            <span className="font-medium">Họ tên:</span> {deliveryInfo.fullName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {deliveryInfo.email}
          </p>
          <p>
            <span className="font-medium">Số điện thoại:</span> {deliveryInfo.phoneNumber}
          </p>
          <p>
            <span className="font-medium">Địa chỉ:</span> {deliveryInfo.address}
          </p>
          <p>
            <span className="font-medium">Ghi chú:</span> {deliveryInfo.note || ''}
          </p>
          <p>
            <span className="font-medium">Tổng tiền:</span> {amount.toLocaleString('vi-VN')} VNĐ
          </p>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-800">Sản phẩm</h3>
        <div className="grid grid-cols-1 gap-4">
          {orders.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-2">
              <Image
                src={item.image_url}
                alt={item.name}
                width={80}
                height={80}
                className="mr-4 rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">Số lượng: {item.quantity}</p>
                <p className="text-red-600">
                  {(item.quantity * item.price).toLocaleString('vi-VN')} VNĐ
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QRCodePaymentModal;
