import React from "react";
import { useNavigate } from "react-router-dom";

const ElectricCategoryCard = ({ title, image, categoryId }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => categoryId && navigate("/products/" + categoryId)}
      className="group relative w-full max-w-[320px] sm:max-w-[280px] md:max-w-[300px] bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-3 border border-gray-100 hover:border-violet-200"
    >
      {/* Image */}
      <div className="h-40 sm:h-44 md:h-52 bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center overflow-hidden">
        <img
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain group-hover:scale-110 transition-transform duration-500"
          src={image}
          alt={title}
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Product Name */}
        <h2 className="text-base sm:text-lg font-bold text-gray-800">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Latest 2026 Collection
        </p>

        {/* Button */}
        <button className="mt-4 w-full bg-gradient-to-r from-violet-500 to-rose-500 text-white py-2 sm:py-2.5 rounded-xl font-semibold text-sm sm:text-base hover:shadow-brand hover:scale-105 transition-all duration-300">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ElectricCategoryCard;
