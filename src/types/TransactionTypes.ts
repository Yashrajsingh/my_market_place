import { User } from "./UserTypes";
import { Order } from "./OrderTypes";
import { Seller } from "./SellerTypes";

export interface Transaction {
  id: number;
  Customer: User;
  order: Order;
  seller: Seller;
  date: string;
}
