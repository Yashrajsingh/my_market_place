import { User } from "./UserTypes";
import { Product } from "./ProductTypes";

export interface WishList {
  id: number;
  user: User;
  products: Product[];
}
