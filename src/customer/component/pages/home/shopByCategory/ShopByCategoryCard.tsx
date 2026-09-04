import React from "react";
import { useNavigate } from "react-router-dom";

const ShopByCategoryCard = ({ title, image, categoryId }: any) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer hover:-translate-y-2 border border-gray-100 hover:border-violet-200">

      {/* Image */}
      <div className="h-44 overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-4 text-center">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>

        <p className="text-sm text-gray-500 mt-1">
          Fresh Today
        </p>

        <button
          onClick={() => categoryId && navigate("/products/" + categoryId)}
          className="mt-3 px-4 py-2 bg-gradient-to-r from-violet-500 to-rose-500 text-white rounded-full text-sm font-semibold hover:shadow-brand hover:-translate-y-0.5 transition-all duration-300"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ShopByCategoryCard;
