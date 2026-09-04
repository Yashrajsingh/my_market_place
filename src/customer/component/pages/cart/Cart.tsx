import React, {
  useEffect,
  useState,
} from "react";

import CartItem from "./CartItem";

import PricingCard from "./PricingCard";

import {
  Favorite,
} from "@mui/icons-material";

import {
  Button,
  TextField,
} from "@mui/material";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../State/Store";

import {
  fetchUserCart,
} from "../../../../State/customer/CartSlice";


const Cart = () => {

  const [couponCode, setCouponCode] =
    useState("");

  const [couponApplied, setCouponApplied] =
    useState(false);


  const navigate = useNavigate();

  const dispatch = useAppDispatch();


  // ============================================
  // GET CART FROM REDUX
  // ============================================

  const { cart, loading, error } =
    useAppSelector(
      (state) => state.cart
    );


  // ============================================
  // FETCH CART
  // ============================================

  useEffect(() => {

    const jwt =
      localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    dispatch(
      fetchUserCart(jwt)
    );

  }, [dispatch]);


  // ============================================
  // COUPON INPUT
  // ============================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    if (!couponApplied) {

      setCouponCode(
        e.target.value
      );
    }
  };


  // ============================================
  // COUPON
  // ============================================

  const handleCoupon = () => {

    if (
      !couponApplied &&
      couponCode.trim() !== ""
    ) {

      setCouponApplied(true);

    } else {

      setCouponApplied(false);

      setCouponCode("");
    }
  };


  // ============================================
  // NOT LOGGED IN
  // ============================================

  if (!localStorage.getItem("jwt")) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="bg-white rounded-2xl shadow-card p-10 text-center border border-violet-100">

          <div className="text-6xl mb-5">
            🔒
          </div>

          <h1 className="text-3xl font-bold text-gradient-brand">
            Login to view your cart
          </h1>

          <p className="text-gray-500 mt-3">
            Sign in to see items you've added and continue checkout.
          </p>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
            sx={{
              marginTop: 3,
              padding: "12px 30px",
            }}
          >
            Login
          </Button>

        </div>

      </div>
    );
  }


  // ============================================
  // LOADING
  // ============================================

  if (loading && !cart) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-xl font-semibold">

          Loading Cart...

        </h2>

      </div>
    );
  }


  // ============================================
  // ERROR
  // ============================================

  if (error && !cart) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-xl font-semibold text-red-600">

            {error}

          </h2>

        </div>

      </div>
    );
  }


  // ============================================
  // EMPTY CART
  // ============================================

  if (
    !cart ||
    !cart.cartItems ||
    cart.cartItems.length === 0
  ) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="bg-white rounded-2xl shadow-card p-10 text-center border border-violet-100">

          <div className="text-6xl mb-5">
            🛒
          </div>

          <h1 className="text-3xl font-bold text-gradient-brand">

            Your Cart is Empty

          </h1>

          <p className="text-gray-500 mt-3">

            Looks like you haven't added anything
            to your cart yet.

          </p>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
            sx={{
              marginTop: 3,
              padding: "12px 30px",
              fontWeight: "bold",
            }}
          >
            Continue Shopping
          </Button>

        </div>

      </div>
    );
  }


  // ============================================
  // CART UI
  // ============================================

  return (

    <div className="pt-10 px-5 sm:px-10 lg:px-20 min-h-screen bg-gray-50">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">


        {/* ======================================
            LEFT
        ======================================= */}

        <div className="lg:col-span-2 space-y-5">

          <h1 className="text-2xl font-bold text-gradient-brand">

            My Cart ({cart.totalItem})

          </h1>


          {cart.cartItems.map(
            (item) => (

              <CartItem
                key={item.id}
                item={item}
              />

            )
          )}

        </div>


        {/* ======================================
            RIGHT
        ======================================= */}

        <div className="col-span-1 sticky top-5 h-fit space-y-4">


          {/* COUPON */}

          <div className="space-y-4 p-5 bg-white rounded-2xl shadow-card border border-violet-100">

            <h2 className="font-semibold text-base">

              Apply Coupon

            </h2>


            <div className="flex gap-2">

              <TextField
                value={couponCode}
                onChange={handleChange}
                size="small"
                placeholder="Enter coupon code"
                fullWidth
                disabled={couponApplied}
              />


              <Button
                variant="contained"
                color={
                  couponApplied
                    ? "error"
                    : "primary"
                }
                onClick={handleCoupon}
              >

                {couponApplied
                  ? "Remove"
                  : "Apply"}

              </Button>

            </div>


            {couponApplied && (

              <p className="text-green-600 text-sm">

                Coupon Applied Successfully ✓

              </p>

            )}

          </div>


          {/* OFFER */}

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 px-3 py-2 rounded-md font-medium">

            🎉 Local Offer: Extra 10% OFF
            on orders above ₹5000

          </div>


          {/* ===================================
              PRICING
          ==================================== */}

          <PricingCard

            subtotal={
              cart.totalMrpPrice
            }

            discount={
              cart.totalMrpPrice -
              cart.totalSellingPrice
            }

            shipping={69}

            platformFees={49}

            couponDiscount={0}

          />


          {/* ===================================
              BUTTONS
          ==================================== */}

          <div className="bg-white p-5 rounded-2xl shadow-card border border-violet-100 space-y-4">

            <Button
              onClick={() =>
                navigate("/checkout")
              }
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                fontWeight: "bold",
              }}
            >

              BUY NOW

            </Button>


            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => navigate("/wishlist")}
              startIcon={
                <Favorite
                  sx={{
                    color: "#F43F5E",
                  }}
                />
              }
              sx={{
                py: 1.5,
                fontWeight: "bold",
              }}
            >

              VIEW WISHLIST

            </Button>

          </div>

        </div>

      </div>

    </div>
  );
};


export default Cart;
