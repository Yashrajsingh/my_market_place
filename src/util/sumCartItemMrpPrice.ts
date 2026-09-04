// import CartItem from "../customer/component/pages/cart/CartItem";
import { CartItem } from "../types/CartTypes";

export const sumCartItemMrpPrice = (CartItem : CartItem[]) => {
    return CartItem.reduce((acc,item) => acc+item.mrpPrice*item.quantity,0)
}

export const sumCartItemSellingPrice = (CartItem : CartItem[]) => {
    return CartItem.reduce((acc,item) => acc+item.sellingPrice*item.quantity,0)
}