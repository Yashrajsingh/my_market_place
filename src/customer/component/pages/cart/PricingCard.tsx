import { Divider } from "@mui/material";
// import { Favorite } from "@mui/icons-material";
import React from "react";

interface PricingCardProps {
  subtotal: number;
  discount: number;
  shipping: number;
  platformFees: number;
  couponDiscount: number;
}

const PricingCard = ({
  subtotal,
  discount,
  shipping,
  platformFees,
  couponDiscount,
}: PricingCardProps) => {
  const total =
    subtotal - discount - couponDiscount + shipping + platformFees;

  return (
    <div className="space-y-4 p-5 bg-white rounded-2xl shadow-card border border-violet-100">
      <h2 className="text-lg font-bold text-gradient-brand">Price Details</h2>

      <div className="flex justify-between items-center">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Discount</span>
        <span className="text-green-600">- ₹{discount}</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Coupon Discount</span>
        <span className="text-green-600">
          {couponDiscount > 0 ? `- ₹${couponDiscount}` : "₹0"}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span>Shipping</span>
        <span>₹{shipping}</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Platform Fees</span>
        <span>₹{platformFees}</span>
      </div>

      <Divider />

      <div className="flex justify-between items-center font-bold text-lg px-3 py-2 -mx-3 rounded-xl bg-gradient-to-r from-violet-50 to-rose-50">
        <span className="text-gray-800">Total</span>
        <span className="text-rose-600">₹{total}</span>
      </div>
    </div>
  );
};

export default PricingCard;