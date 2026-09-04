// import React, { useEffect, useState } from "react";
// import FilterSection from "./FilterSection";
// import ProductCard from "./ProductCard";
// import {
//   Divider,
//   FormControl,
//   IconButton,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   useTheme,
//   Pagination,
// } from "@mui/material";
// import { useMediaQuery } from "@mui/material";
// import { Box } from "@mui/system";
// import { FilterAlt } from "@mui/icons-material";
// import store, { useAppDispatch, useAppSelector } from "../../../../State/Store"
// import { useParams, useSearchParams } from "react-router-dom";
// import { fetchAllProducts } from "../../../../State/customer/ProductSlice";

// const Product: React.FC = () => {
//   const product = useAppSelector((store => store))
//   const theme = useTheme();
//   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

//   const [sort, setSort] = useState<string>("");
//   const [page, setPage] = useState<number>(1);
//   const dispatch = useAppDispatch()
//   const [searchParam, setSearchParam] = useSearchParams()
//   const {categoryId} = useParams()


//   const handleSortChange = (event: SelectChangeEvent) => {
//     setSort(event.target.value);
//   };

//   const handlePageChange = (
//     _: React.ChangeEvent<unknown>,
//     value: number
//   ) => {
//     setPage(value);
//   };

//   useEffect(() => {
//     const [minPrice, maxPrice] = searchParam.get("price")?.split("-") || []
    
//     dispatch(fetchAllProducts({categoryId}))
//   }, [])

//   return (
//     <div className="mt-10 px-4 lg:px-10 bg-gray-50 min-h-screen">
//       {/* TITLE */}
//       <h1 className="text-3xl text-center font-bold text-gray-700 pb-6 uppercase tracking-wide">
//         Market for Everyone
//       </h1>

//       <div className="lg:flex gap-6">
//         {/* FILTER (DESKTOP) */}
//         <section className="hidden lg:block w-[20%] bg-white rounded-xl shadow-sm p-4 h-fit sticky top-5">
//           <FilterSection />
//         </section>

//         {/* RIGHT SIDE */}
//         <div className="w-full lg:w-[80%] space-y-6">
//           {/* TOP BAR */}
//           <div className="flex justify-between items-center px-2 lg:px-4 py-2 bg-white rounded-xl shadow-sm">
//             {!isLarge && (
//               <IconButton>
//                 <FilterAlt />
//               </IconButton>
//             )}

//             {!isLarge && (
//               <Box className="absolute z-10 bg-white shadow-lg rounded-lg p-3 mt-12">
//                 <FilterSection />
//               </Box>
//             )}

//             {/* SORT */}
//             <FormControl size="small" sx={{ width: "200px" }}>
//               <Select value={sort} onChange={handleSortChange} displayEmpty>
//                 <MenuItem value="">Sort</MenuItem>
//                 <MenuItem value="low">Low → High</MenuItem>
//                 <MenuItem value="high">High → Low</MenuItem>
//                 <MenuItem value="other">Other Categories</MenuItem>
//               </Select>
//             </FormControl>
//           </div>

//           <Divider />

//           {/* PRODUCTS */}
//           <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 lg:px-4">
//             {product.products.map((item: Product) => <ProductCard item={item} />)}
//           </section>

//           {/* PAGINATION */}
//           <div className="flex justify-center py-8">
//             <Pagination
//               count={10}
//               page={page}
//               onChange={handlePageChange}
//               color="primary"
//               shape="rounded"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;

import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";

import {
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { FilterAlt } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchAllProducts } from "../../../../State/customer/ProductSlice";
import { Product as ProductType } from "../../../../types/ProductTypes";

const Product: React.FC = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const dispatch = useAppDispatch();

  const { products, totalPages, loading } = useAppSelector(
    (state) => state.product
  );

  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const [searchParam] = useSearchParams();
  const { categoryId } = useParams();

  const handleSortChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParam.get("price")?.split("-") || [];
    const color = searchParam.get("color")
    const minDiscount = searchParam.get("discount") ? Number(searchParam.get("discount")) : undefined

    const pageNumber = page - 1

    const newFilter = {
      category: categoryId,
      color: color || "",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minDiscount,
      sort: sort || undefined,
      pageNumber,
    }

    dispatch(
      fetchAllProducts(
        newFilter
      )
    );
  }, [dispatch, categoryId, page, sort, searchParam]);

  return (
    <div className="mt-10 px-4 lg:px-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl text-center font-extrabold text-gradient-brand pb-6 uppercase tracking-wide">
        Market for Everyone
      </h1>

      <div className="lg:flex gap-6">
        {/* Filter */}
        <section className="hidden lg:block w-[20%] bg-white rounded-xl shadow-sm p-4 h-fit sticky top-5">
          <FilterSection />
        </section>

        {/* Right */}
        <div className="w-full lg:w-[80%] space-y-6">
          <div className="flex justify-between items-center px-4 py-3 bg-white rounded-xl shadow-sm">
            {!isLarge && (
              <IconButton>
                <FilterAlt />
              </IconButton>
            )}

            {!isLarge && (
              <Box className="absolute z-10 bg-white shadow-lg rounded-lg p-3 mt-12">
                <FilterSection />
              </Box>
            )}

            <FormControl size="small" sx={{ width: 220 }}>
              <Select
                value={sort}
                onChange={handleSortChange}
                displayEmpty
              >
                <MenuItem value="">Sort</MenuItem>
                <MenuItem value="price_low">
                  Price Low → High
                </MenuItem>
                <MenuItem value="price_high">
                  Price High → Low
                </MenuItem>
                <MenuItem value="newest">
                  Newest
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <Divider />

          {loading ? (
            <div className="text-center py-10 text-violet-600 font-semibold">
              Loading Products...
            </div>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 lg:px-4">
              {products.length > 0 ? (
                products.map((item: ProductType) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                  />
                ))
              ) : (
                <div className="col-span-4 flex flex-col items-center justify-center py-16 text-gray-400">
                  <span className="text-5xl mb-3">🛒</span>
                  <p className="text-lg font-semibold text-gray-500">
                    No Products Found
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Try adjusting your filters
                  </p>
                </div>
              )}
            </section>
          )}

          <div className="flex justify-center py-8">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;