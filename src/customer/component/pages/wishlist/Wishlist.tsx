import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import {
  fetchWishlist,
  selectWishlist,
} from "../../../../State/customer/WishlistSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../State/Store";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const wishlist = useAppSelector(selectWishlist);
  const loading = useAppSelector(
    (state: any) => state.wishlist.loading
  );

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const products = wishlist?.products || [];

  return (
    <div className="mt-10 px-4 lg:px-10 bg-gray-50 min-h-screen pb-16">
      <h1 className="text-3xl text-center font-extrabold text-gradient-brand pb-8 uppercase tracking-wide">
        My Wishlist
      </h1>

      {loading ? (
        <div className="text-center py-10 text-violet-600 font-semibold">
          Loading Wishlist...
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <span className="text-5xl mb-3">💜</span>
          <p className="text-lg font-semibold text-gray-500">
            Your wishlist is empty
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-violet-500 to-rose-500 shadow-brand hover:-translate-y-1 transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
