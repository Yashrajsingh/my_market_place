import { User } from "./UserTypes";

export interface CartItem {
  id: number;
  quantity: number;
  size: string;
  mrpPrice: number;
  sellingPrice: number;
  product: Product;
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  mrpPrice: number;
  sellingPrice: number;
  images: string[];
}

export interface Cart {
  id: number;
  user: User;

  // IMPORTANT: use cartItems, not cartItem
  cartItems: CartItem[];

  totalSellingPrice: number;
  totalItem: number;
  totalMrpPrice: number;
  discount: number;
  couponCode: string | null;
}