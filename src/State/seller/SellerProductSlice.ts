// State/seller/SellerProductSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductTypes";

interface CreateProductRequest {
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  quantity: number;
  color: string;
  category: string;
  category2: string;
  category3: string;
  size: string;
  images: string[];
}

interface SellerProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: SellerProductState = {
  products: [],
  loading: false,
  error: null,
};

/* ===========================
   Fetch Seller Products
=========================== */

export const fetchSellerProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>(
  "sellerProduct/fetchSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/sellers/products");

      console.log("Seller Products :", response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to fetch seller products"
      );
    }
  }
);

/* ===========================
   Create Product
=========================== */

export const createProduct = createAsyncThunk<
  Product,
  CreateProductRequest,
  { rejectValue: string }
>(
  "sellerProduct/createProduct",
  async (request, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/api/sellers/products",
        request
      );

      console.log("Created Product :", response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to create product"
      );
    }
  }
);

/* ===========================
   Delete Product
=========================== */

export const deleteProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  "sellerProduct/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await api.delete(`/api/sellers/products/${productId}`);

      return productId;
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to delete product"
      );
    }
  }
);

/* ===========================
   Slice
=========================== */

const sellerProductSlice = createSlice({
  name: "sellerProduct",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* Fetch */

      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          action.error.message ||
          "Something went wrong";
      })

      /* Create */

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          action.error.message ||
          "Something went wrong";
      })

      /* Delete */

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.error =
          action.payload ||
          action.error.message ||
          "Something went wrong";
      });
  },
});

export default sellerProductSlice.reducer;