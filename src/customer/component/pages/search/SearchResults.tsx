import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { searchProduct } from "../../../../State/customer/ProductSlice";
import { Product as ProductType } from "../../../../types/ProductTypes";

const SearchResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { searchProducts, loading, error } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (query.trim()) {
      dispatch(searchProduct(query));
    }
  }, [dispatch, query]);

  return (
    <div className="mt-10 px-4 lg:px-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-ink pb-1">
        Search results for “{query}”
      </h1>

      <p className="text-ink-soft pb-6">
        {loading
          ? "Searching..."
          : error
          ? "Search failed"
          : `${searchProducts.length} result${searchProducts.length === 1 ? "" : "s"} found`}
      </p>

      {loading ? (
        <div className="text-center py-10 text-ink-soft font-semibold">
          Searching products...
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <span className="text-5xl mb-3">⚠️</span>
          <p className="text-lg font-semibold text-gray-500">
            Something went wrong
          </p>
          <p className="text-sm text-gray-400 mt-1">{error}</p>
        </div>
      ) : searchProducts.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
          {searchProducts.map((item: ProductType) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <span className="text-5xl mb-3">🔍</span>
          <p className="text-lg font-semibold text-gray-500">
            No products found
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Try a different search term
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
