export interface DeliveryInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  location: string;
  note: string;
  paymentMethod: PaymentMethodType;
}

export type PaymentMethodType = "cod" | "qr";
