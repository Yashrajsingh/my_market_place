import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ElectricCategory from "./ElectricCategory/ElectricCategory";
import CategoryGrid from "./CategoryGrid/CategoryGrid";
import Deal from "./deals/Deal";
import ShopByCategory from "./shopByCategory/ShopByCategory";
import { useAppDispatch } from "../../../../State/Store";
import { fetchHome } from "../../../../State/HomeSlice";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div className="text-center md:text-left">
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-ink-soft mb-5">
            New season · Up to 60% off
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-ink leading-tight">
            Shop the season.
            <br />
            Priced right.
          </h1>

          <p className="mt-5 text-lg text-ink-soft max-w-md mx-auto md:mx-0">
            Trending fashion, electronics, home essentials & daily deals —
            all in one marketplace.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button
              onClick={() => navigate("/products/electronics")}
              className="px-7 py-3 rounded-full font-semibold text-white bg-brand-500 hover:bg-brand-600 transition-colors duration-200"
            >
              Shop Now
            </button>

            <button
              onClick={() => navigate("/become-seller")}
              className="px-7 py-3 rounded-full font-semibold text-ink border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              Start Selling
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto md:mx-0">
            {[
              { value: "10K+", label: "Sellers" },
              { value: "2M+", label: "Products" },
              { value: "4.8★", label: "Avg Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="text-2xl font-semibold text-ink">
                  {stat.value}
                </div>
                <div className="text-xs text-ink-soft mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-[2.5rem] bg-gray-50 border border-gray-200 shadow-card overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900"
              alt="Featured products"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-5 right-5 px-4 py-2 rounded-2xl bg-white shadow-card">
              <p className="text-xs text-gray-400 line-through">₹79,999</p>
              <p className="text-lg font-semibold text-ink">
                ₹49,999
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <ElectricCategory />
      <CategoryGrid />
      <Deal />
      <ShopByCategory />
    </div>
  );
};

export default Home;
