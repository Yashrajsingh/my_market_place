import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductTypes";
import { JSX } from "react/jsx-runtime";

const API_URL = "/products"
export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);
      console.log("Product details data: " , response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch product"
      );
    }
  }
);

export const searchProduct = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string }
>(
  "products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/search`, {
        params: {
          query,
        },
      });

      console.log("Search results: ", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Search failed"
      );
    }
  }
);

export const fetchAllProducts = createAsyncThunk<
  {
    content: Product[];
    totalPages: number;
  },
  any,
  { rejectValue: string }
>(
  "products/fetchAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/products", {
        params: {
          ...params,
          pageNumber: params.pageNumber ?? 0,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch products"
      );
    }
  }
);

interface ProductState {
  product: Product | null;
  products: Product[];
  searchProducts: Product[];
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  products: [],
  searchProducts: [],
  totalPages: 0,
  loading: false,
  error: null,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Fetch Product By Id

    builder.addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
    })

    builder.addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
    })

    builder.addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Something went wrong";
    });

    // Search Product
    builder.addCase(searchProduct.pending, (state) => {
        state.loading = true;
    })

    builder.addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProducts = action.payload;
    })

    builder.addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
        action.payload || action.error.message || "Something went wrong";
    });

    // Fetch All Products

    builder.addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content;
        state.totalPages = action.payload.totalPages;
    })
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
        action.payload || action.error.message || "Something went wrong";
    });
  },
});

export default productSlice.reducer;