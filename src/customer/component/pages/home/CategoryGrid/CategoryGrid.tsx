import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../../State/Store";

const fallbackCategories = [
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
    categoryId: "fashion",
  },
  {
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    categoryId: "shoes",
  },
  {
    name: "Watches",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
    categoryId: "watches",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
    categoryId: "beauty",
  },
  {
    name: "Bags",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    categoryId: "bags",
  },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  const grid = useAppSelector((state: any) => state.home.home?.grid);
  const categories = grid && grid.length > 0 ? grid : fallbackCategories;

  return (
    <div className="px-6 md:px-12 lg:px-20 py-14 bg-gradient-to-b from-white to-gray-100">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gradient-brand">
          Shop by Category
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Find your favorite collections
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((item: any) => (
          <div
            key={item.categoryId}
            onClick={() => navigate("/products/" + item.categoryId)}
            className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer hover:-translate-y-3 border border-transparent hover:border-violet-200"
          >
            {/* Image */}
            <div className="h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Text */}
            <div className="p-5 text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {item.name}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Explore Collection
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
