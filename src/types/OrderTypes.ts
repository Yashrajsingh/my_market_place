import { Address } from "./UserTypes";
import { Product } from "./ProductTypes";

export type OrderStatus =
  | "PENDING"
  | "PLACED"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

export type PaymentMethod = "RAZORPAY" | "STRIPE";

export interface PaymentDetails {
  paymentId: string | null;
  razorpayPaymentLinkId: string | null;
  razorpayPaymentLinkReferenceId: string | null;
  razorpayPaymentLinkStatus: string | null;
  razorpayPaymentId: string | null;
}

export interface OrderItem {
  id: number;
  product: Product;
  size: string;
  quantity: number;
  mrpPrice: number;
  sellingPrice: number;
  userId: number;
}

export interface Order {
  id: number;
  orderId: string | null;
  sellerId: number;
  orderItems: OrderItem[];
  shippingAddress: Address;
  paymentDetails: PaymentDetails;
  totalMrpPrice: number;
  totalSellingPrice: number;
  discount: number;
  totalItem: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  orderDate: string;
  deliverDate: string;
}

export interface PaymentLinkResponse {
  payment_link_url: string;
  payment_link_id: string | null;
}
