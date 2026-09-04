import React, { useEffect } from "react";
import "./App.css";

import { ThemeProvider } from "@mui/material";

import {
  Route,
  Routes,
} from "react-router-dom";

import customeTheme from "./customer/Theme/Customtheme";

import Navbar from "./customer/component/navbar/Navbar";

import Home from "./customer/component/pages/home/Home";

import Product from "./customer/component/pages/product/Product";

import Review from "./customer/component/pages/review/Review";

import Cart from "./customer/component/pages/cart/Cart";

import Wishlist from "./customer/component/pages/wishlist/Wishlist";

import CheckOut from "./customer/component/pages/checkOut/CheckOut";

import PaymentSuccess from "./customer/component/pages/checkOut/PaymentSuccess";

import Account from "./customer/component/pages/Account/Account";

import ProductDetails from "./customer/component/pages/pageDetails/ProdouctDetails";

import BecomeSeller from "./customer/component/pages/becomeSeller/BecomeSeller";

import VerifySellerEmail from "./customer/component/pages/becomeSeller/VerifySellerEmail";

import SellerDashBoard from "./seller/pages/sellerDashBoard/SellerDashBoard";

import AdminDashBoard from "./admin/pages/dashboard/AdminDashBoard";

import SellerProtectedRoute from "./seller/SellerProtectedRoute";

import Auth from "./customer/component/pages/Auth/Auth";

import {
  useAppDispatch,
} from "./State/Store";

import {
  fetchUserProfile,
} from "./State/AuthSlice";

import {
  fetchSellerProfile,
} from "./State/seller/SellerAuthSlice";

import {
  fetchCategories,
} from "./State/CategorySlice";


function App() {
  const dispatch = useAppDispatch();

  /* =====================================================
     LOAD CATEGORIES
  ===================================================== */

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  /* =====================================================
     LOAD USER PROFILE
  ===================================================== */

  useEffect(() => {
    const jwt =
      localStorage.getItem("jwt");

    if (jwt) {
      dispatch(
        fetchUserProfile()
      );
    }
  }, [dispatch]);

  /* =====================================================
     LOAD SELLER PROFILE
  ===================================================== */

  useEffect(() => {
    const sellerJwt =
      localStorage.getItem(
        "seller_jwt"
      );

    if (sellerJwt) {
      dispatch(
        fetchSellerProfile()
      );
    }
  }, [dispatch]);


  return (
    <ThemeProvider
      theme={customeTheme}
    >
      {/* Navbar */}
      <Navbar />

      <main className="pt-20">
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* LOGIN / REGISTER */}
          <Route
            path="/login"
            element={<Auth />}
          />

          {/* PRODUCTS */}
          <Route
            path="/products/:categoryId"
            element={<Product />}
          />

          {/* REVIEWS */}
          <Route
            path="/reviews/:productId"
            element={<Review />}
          />

          {/* PRODUCT DETAILS */}
          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetails />}
          />

          {/* CART */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* WISHLIST */}
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          {/* CHECKOUT */}
          <Route
            path="/checkout"
            element={<CheckOut />}
          />

          {/* PAYMENT CALLBACK */}
          <Route
            path="/payment/success"
            element={<PaymentSuccess />}
          />

          {/* ACCOUNT */}
          <Route
            path="/account/*"
            element={<Account />}
          />

          {/* BECOME SELLER */}
          <Route
            path="/become-seller"
            element={<BecomeSeller />}
          />

          {/* SELLER EMAIL VERIFICATION */}
          <Route
            path="/verify-seller/:otp"
            element={<VerifySellerEmail />}
          />

          {/* SELLER */}
          <Route
            path="/seller/*"
            element={
              <SellerProtectedRoute>
                <SellerDashBoard />
              </SellerProtectedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin/*"
            element={
              <AdminDashBoard />
            }
          />

        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;