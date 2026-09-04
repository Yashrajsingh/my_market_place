import React from "react";
import ShopByCategoryCard from "./ShopByCategoryCard";
import { useAppSelector } from "../../../../../State/Store";

const fallbackCategories = [
  {
    name: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200",
    categoryId: "vegetables",
  },
  {
    name: "Fruits",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200",
    categoryId: "fruits",
  },
  {
    name: "Dairy",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200",
    categoryId: "dairy",
  },
  {
    name: "Bakery",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200",
    categoryId: "bakery",
  },
  {
    name: "Snacks",
    image:
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=1200",
    categoryId: "snacks",
  },
  {
    name: "Beverages",
    image:
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=1200",
    categoryId: "beverages",
  },
  {
    name: "Rice",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200",
    categoryId: "rice",
  },
  {
    name: "Spices",
    image:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1200",
    categoryId: "spices",
  },
  {
    name: "Frozen Food",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1200",
    categoryId: "frozen-food",
  },
  {
    name: "Cleaning",
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=1200",
    categoryId: "cleaning",
  },
];

const ShopByCategory = () => {
  const shopByCategories = useAppSelector(
    (state: any) => state.home.home?.shopByCategories
  );

  const categories =
    shopByCategories && shopByCategories.length > 0
      ? shopByCategories
      : fallbackCategories;

  return (
    <div className="px-4 md:px-10 lg:px-16 py-12 bg-white">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-gradient-brand">
          Shop Groceries
        </h1>
        <p className="text-gray-500 mt-3">
          Fresh products delivered daily
        </p>
      </div>

      {/* MAIN BANNER (like screenshot) */}
      <div className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-xl min-h-[280px] md:min-h-[400px] mb-14">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-violet-400 to-rose-300 rounded-tl-[100px]" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center h-full">
          <div className="px-6 md:px-14 py-10">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
              Fresh Groceries
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              Healthy food, happy life.
            </p>

            <button className="mt-6 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-violet-500 to-rose-500 shadow-brand hover:-translate-y-1 transition-all duration-300">
              Order Now
            </button>
          </div>

          <div className="flex justify-center md:justify-end p-6">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
              alt="banner"
              className="w-[320px] md:w-[480px] rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((item: any) => (
          <ShopByCategoryCard
            key={item.categoryId}
            title={item.name}
            image={item.image}
            categoryId={item.categoryId}
          />
        ))}
      </div>

      {/* End Banner */}
      <div className="mt-16 relative rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600"
          alt="Fresh Groceries"
          className="w-full h-[250px] md:h-[350px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-white text-2xl md:text-5xl font-bold bg-gradient-to-r from-fuchsia-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            Freshness Delivered Daily
          </h2>

          <p className="text-gray-200 mt-4 text-sm md:text-lg">
            “Good food is the foundation of genuine happiness.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;