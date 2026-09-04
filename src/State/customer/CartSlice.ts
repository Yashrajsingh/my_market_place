import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Cart, CartItem } from "../../types/CartTypes";
import { api } from "../../config/Api";


// ======================================================
// STATE
// ======================================================

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

export interface AddItemRequest {
  productId: number;
  size: string;
  quantity: number;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};


// ======================================================
// API URL
// ======================================================

const API_URL = "/api/cart";


// ======================================================
// RECALCULATE CART TOTALS (client-side)
// Mirrors CartServiceImpl.recalculateCart on the backend,
// so totalItem/totalMrpPrice/totalSellingPrice/discount
// stay correct immediately after a local mutation, without
// waiting on a full re-fetch.
// ======================================================

const recalculateTotals = (cart: Cart) => {
  const totalItem = cart.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalMrpPrice = cart.cartItems.reduce(
    (sum, item) => sum + item.mrpPrice,
    0
  );

  const totalSellingPrice = cart.cartItems.reduce(
    (sum, item) => sum + item.sellingPrice,
    0
  );

  cart.totalItem = totalItem;
  cart.totalMrpPrice = totalMrpPrice;
  cart.totalSellingPrice = totalSellingPrice;

  cart.discount =
    totalMrpPrice > 0
      ? Math.round(
          ((totalMrpPrice - totalSellingPrice) / totalMrpPrice) * 100
        )
      : 0;
};


// ======================================================
// FETCH USER CART
// GET /api/cart
// ======================================================

export const fetchUserCart = createAsyncThunk<
  Cart,
  string,
  { rejectValue: string }
>(
  "cart/fetchUserCart",

  async (jwt, { rejectWithValue }) => {
    try {
      if (!jwt) {
        return rejectWithValue("User is not logged in");
      }

      const response = await api.get(API_URL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;

    } catch (error: any) {

      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch cart"
      );
    }
  }
);


// ======================================================
// ADD ITEM TO CART
// PUT /api/cart/add
// ======================================================

export const addItemToCart = createAsyncThunk<
  CartItem,
  {
    jwt: string;
    request: AddItemRequest;
  },
  { rejectValue: string }
>(
  "cart/addItemToCart",

  async ({ jwt, request }, { rejectWithValue }) => {

    try {

      if (!jwt) {
        return rejectWithValue("User is not logged in");
      }

      const response = await api.put(
        `${API_URL}/add`,
        request,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return response.data;

    } catch (error: any) {

      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to add item to cart"
      );
    }
  }
);


// ======================================================
// UPDATE CART ITEM
// PUT /api/cart/item/{cartItemId}
// ======================================================

export const updateCartItem = createAsyncThunk<
  CartItem,
  {
    jwt: string;
    cartItemId: number;
    quantity: number;
  },
  { rejectValue: string }
>(
  "cart/updateCartItem",

  async (
    {
      jwt,
      cartItemId,
      quantity,
    },
    { rejectWithValue }
  ) => {

    try {

      if (!jwt) {
        return rejectWithValue("User is not logged in");
      }

      if (quantity <= 0) {
        return rejectWithValue(
          "Quantity must be greater than zero"
        );
      }

      const response = await api.put(
        `${API_URL}/item/${cartItemId}`,
        {
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return response.data;

    } catch (error: any) {

      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update cart item"
      );
    }
  }
);


// ======================================================
// DELETE CART ITEM
// DELETE /api/cart/item/{cartItemId}
// ======================================================

export const deleteCartItem = createAsyncThunk<
  number,
  {
    jwt: string;
    cartItemId: number;
  },
  { rejectValue: string }
>(
  "cart/deleteCartItem",

  async (
    {
      jwt,
      cartItemId,
    },
    { rejectWithValue }
  ) => {

    try {

      if (!jwt) {
        return rejectWithValue(
          "User is not logged in"
        );
      }

      await api.delete(
        `${API_URL}/item/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // Return ID so reducer can remove it
      return cartItemId;

    } catch (error: any) {

      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete cart item"
      );
    }
  }
);


// ======================================================
// CLEAR CART
// ======================================================

export const clearCart = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  "cart/clearCart",

  async (_, { rejectWithValue }) => {

    try {

      // If you don't have a backend clear-cart endpoint,
      // this only clears Redux state.

      return;

    } catch (error: any) {

      return rejectWithValue(
        "Failed to clear cart"
      );
    }
  }
);


// ======================================================
// SLICE
// ======================================================

const cartSlice = createSlice({

  name: "cart",

  initialState,

  reducers: {

    clearCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },

  },

  extraReducers: (builder) => {

    // ==================================================
    // FETCH CART
    // ==================================================

    builder

      .addCase(
        fetchUserCart.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchUserCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {

          state.loading = false;

          state.cart = {
            ...action.payload,
            cartItems: action.payload.cartItems || [],
          };

          state.error = null;
        }
      )

      .addCase(
        fetchUserCart.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch cart";
        }
      );


    // ==================================================
    // ADD ITEM
    // ==================================================

    builder

      .addCase(
        addItemToCart.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        addItemToCart.fulfilled,
        (state, action) => {

          state.loading = false;

          if (!state.cart) {
            return;
          }

          if (!state.cart.cartItems) {
            state.cart.cartItems = [];
          }

          const newItem = action.payload;

          const existingItem =
            state.cart.cartItems.find(
              (item) =>
                item.id === newItem.id
            );

          if (!existingItem) {

            state.cart.cartItems.push(
              newItem
            );

          } else {

            existingItem.quantity =
              newItem.quantity;

            existingItem.mrpPrice =
              newItem.mrpPrice;

            existingItem.sellingPrice =
              newItem.sellingPrice;
          }

          recalculateTotals(state.cart);

          state.error = null;
        }
      )

      .addCase(
        addItemToCart.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to add item";
        }
      );


    // ==================================================
    // UPDATE ITEM
    // ==================================================

    builder

      .addCase(
        updateCartItem.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        updateCartItem.fulfilled,
        (state, action) => {

          state.loading = false;

          if (!state.cart) {
            return;
          }

          if (!state.cart.cartItems) {
            state.cart.cartItems = [];
          }

          const updatedItem =
            action.payload;

          const index =
            state.cart.cartItems.findIndex(
              (item) =>
                item.id === updatedItem.id
            );

          if (index !== -1) {

            state.cart.cartItems[index] =
              updatedItem;
          }

          recalculateTotals(state.cart);

          state.error = null;
        }
      )

      .addCase(
        updateCartItem.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to update cart item";
        }
      );


    // ==================================================
    // DELETE ITEM
    // ==================================================

    builder

      .addCase(
        deleteCartItem.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        deleteCartItem.fulfilled,
        (state, action) => {

          state.loading = false;

          if (!state.cart) {
            return;
          }

          state.cart.cartItems = (
            state.cart.cartItems || []
          ).filter(
            (item) =>
              item.id !== action.payload
          );

          recalculateTotals(state.cart);

          state.error = null;
        }
      )

      .addCase(
        deleteCartItem.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to delete cart item";
        }
      );


    // ==================================================
    // CLEAR CART
    // ==================================================

    builder

      .addCase(
        clearCart.fulfilled,
        (state) => {

          state.cart = null;
          state.loading = false;
          state.error = null;
        }
      )

      .addCase(
        clearCart.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to clear cart";
        }
      );
  },
});


// ======================================================
// ACTIONS
// ======================================================

export const {
  clearCartState,
} = cartSlice.actions;


// ======================================================
// SELECTORS
// ======================================================

export const selectCart = (state: any) =>
  state.cart.cart;

export const selectCartLoading = (state: any) =>
  state.cart.loading;

export const selectCartError = (state: any) =>
  state.cart.error;


// ======================================================
// REDUCER
// ======================================================

export default cartSlice.reducer;
