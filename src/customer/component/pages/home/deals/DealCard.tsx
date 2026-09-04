import React from "react";
import { useNavigate } from "react-router-dom";

const DealCard = ({ title, image, discount, categoryId }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => categoryId && navigate("/products/" + categoryId)}
      className="relative w-64 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1 border border-transparent hover:border-violet-200"
    >
      {/* Discount Badge */}
      <div className="absolute z-10 bg-gradient-to-r from-rose-500 to-amber-400 text-white text-xs px-3 py-1 rounded-br-lg font-bold shadow-accent">
        {discount}% OFF
      </div>

      {/* Product Image */}
      <div className="h-44 bg-gray-100 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* Details */}
      <div className="p-4">
        <h2 className="font-semibold text-gray-800">{title}</h2>

        <p className="text-sm text-rose-600 font-bold mt-2">
          Up to {discount}% off
        </p>
      </div>
    </div>
  );
};

export default DealCard;
