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
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1B0F33] via-[#3B0F35] to-[#7C3AED]">
      {/* Decorative glow blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-fuchsia-500/30 blur-3xl animate-floaty" />
      <div className="pointer-events-none absolute top-10 right-0 w-96 h-96 rounded-full bg-rose-500/25 blur-3xl animate-floaty" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-violet-400/20 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div className="text-center md:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-white/10 text-fuchsia-200 border border-white/15 backdrop-blur-sm mb-5">
            🔥 NEW SEASON DROP — UP TO 60% OFF
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Shop Bold.
            <br />
            <span className="bg-gradient-to-r from-fuchsia-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">
              Live Vibrant.
            </span>
          </h1>

          <p className="mt-5 text-lg text-white/70 max-w-md mx-auto md:mx-0">
            Trending fashion, electronics, home essentials & daily deals —
            all in one vivid marketplace.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button
              onClick={() => navigate("/products/electronics")}
              className="px-7 py-3 rounded-full font-bold text-white bg-gradient-to-r from-violet-500 to-rose-500 shadow-accent hover:shadow-brand hover:-translate-y-1 transition-all duration-300"
            >
              Shop Now
            </button>

            <button
              onClick={() => navigate("/become-seller")}
              className="px-7 py-3 rounded-full font-bold text-white border border-white/25 bg-white/5 hover:bg-white/15 backdrop-blur-sm transition-all duration-300"
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
                <div className="text-2xl font-extrabold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/60 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-[2.5rem] bg-white/10 border border-white/15 backdrop-blur-sm shadow-2xl overflow-hidden animate-floaty">
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900"
              alt="Featured products"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-5 right-5 px-4 py-2 rounded-2xl bg-white shadow-xl">
              <p className="text-xs text-gray-400 line-through">₹79,999</p>
              <p className="text-lg font-extrabold text-rose-500">
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
