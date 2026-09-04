import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { WishList } from "../../types/WishlistTypes";
import { getErrorMessage } from "../../util/getErrorMessage";

const API_URL = "/api/wishlist";

/* =====================================================
   FETCH WISHLIST
   GET /api/wishlist
===================================================== */

export const fetchWishlist = createAsyncThunk<
  WishList,
  void,
  { rejectValue: string }
>(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return rejectWithValue("User is not logged in");
      }

      const response = await api.get(API_URL, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to fetch wishlist")
      );
    }
  }
);

/* =====================================================
   TOGGLE PRODUCT IN WISHLIST
   POST /api/wishlist/add-product/{productId}
===================================================== */

export const toggleWishlistProduct = createAsyncThunk<
  WishList,
  number,
  { rejectValue: string }
>(
  "wishlist/toggleWishlistProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return rejectWithValue("User is not logged in");
      }

      const response = await api.post(
        `${API_URL}/add-product/${productId}`,
        null,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to update wishlist")
      );
    }
  }
);

interface WishlistState {
  wishlist: WishList | null;
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlistState: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch wishlist";
      })

      .addCase(toggleWishlistProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleWishlistProduct.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(toggleWishlistProduct.rejected, (state, action) => {
        state.error = action.payload || "Unable to update wishlist";
      });
  },
});

export const { clearWishlistState } = wishlistSlice.actions;

export const selectWishlist = (state: any) => state.wishlist.wishlist;

export const selectIsInWishlist = (productId: number) => (state: any) =>
  !!state.wishlist.wishlist?.products?.some((p: any) => p.id === productId);

export default wishlistSlice.reducer;
