import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import sellerProductSlice
  from "./seller/SellerProductSlice";

import authReducer
  from "./AuthSlice";

import sellerAuthReducer
  from "./seller/SellerAuthSlice";

import sellerSlice
  from "./seller/SellerSlice";

import productSlice
  from "./customer/ProductSlice";

import cartReducer
  from "./customer/CartSlice";

import couponReducer
  from "./customer/CouponSlice";

import wishlistReducer
  from "./customer/WishlistSlice";

import reviewReducer
  from "./customer/ReviewSlice";

import orderReducer
  from "./customer/OrderSlice";

import adminReducer
  from "./AdminSlice";

import homeReducer
  from "./HomeSlice";

import categoryReducer
  from "./CategorySlice";


const rootReducer = combineReducers({

  auth: authReducer,

  sellerAuth: sellerAuthReducer,

  seller: sellerSlice,

  sellerProduct: sellerProductSlice,

  product: productSlice,

  cart: cartReducer,

  coupon: couponReducer,

  wishlist: wishlistReducer,

  review: reviewReducer,

  order: orderReducer,

  admin: adminReducer,

  home: homeReducer,

  category: categoryReducer,
});


const store = configureStore({
  reducer: rootReducer,
});


export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;


export const useAppDispatch =
  () => useDispatch<AppDispatch>();


export const useAppSelector:
  TypedUseSelectorHook<RootState> =
  useSelector;


export default store;