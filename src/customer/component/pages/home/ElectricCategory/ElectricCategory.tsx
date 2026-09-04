import React from "react";
import ElectricCategoryCard from "./ElectricCategoryCard";
import { useAppSelector } from "../../../../../State/Store";

const fallbackCategories = [
  {
    name: "Laptop",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    categoryId: "laptop",
  },
  {
    name: "Smartphone",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    categoryId: "smartphone",
  },
  {
    name: "Camera",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
    categoryId: "camera",
  },
  {
    name: "Smart TV",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800",
    categoryId: "smart-tv",
  },
  {
    name: "Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    categoryId: "headphones",
  },
  {
    name: "Smart Watch",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
    categoryId: "smart-watch",
  },
  {
    name: "Gaming Console",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800",
    categoryId: "gaming-console",
  },
  {
    name: "Tablet",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
    categoryId: "tablet",
  },
];

const ElectricCategory = () => {
  const electric = useAppSelector(
    (state: any) => state.home.home?.electricCategories
  );

  const categories = electric && electric.length > 0 ? electric : fallbackCategories;

  return (
    <div className="px-3 sm:px-6 md:px-12 lg:px-20 py-8 md:py-14 bg-gradient-to-b from-gray-50 to-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gradient-brand">
          Electronics Categories
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base md:text-lg">
          Discover premium gadgets & latest technology
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 justify-items-center">
        {categories.map((item: any) => (
          <ElectricCategoryCard
            key={item.categoryId}
            title={item.name}
            image={item.image}
            categoryId={item.categoryId}
          />
        ))}
      </div>
    </div>
  );
};

export default ElectricCategory;
