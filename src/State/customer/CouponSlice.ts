import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { Cart } from "../../types/CartTypes";
import { Coupon, CouponState } from "../../types/CouponTypes";
import { api } from "../../config/Api";
import { getErrorMessage } from "../../util/getErrorMessage";


const API_URL = "/api";


const adminAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});


/* =====================================================
   ADMIN: CREATE COUPON
   POST /api/admin/create
===================================================== */

export const createCoupon = createAsyncThunk<
  Coupon,
  Omit<Coupon, "id">,
  { rejectValue: string }
>(
  "coupon/createCoupon",

  async (request, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}/admin/create`,
        request,
        adminAuthHeader()
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Unable to create coupon"));
    }
  }
);


/* =====================================================
   ADMIN: DELETE COUPON
   DELETE /api/admin/delete/{id}
===================================================== */

export const deleteCoupon = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  "coupon/deleteCoupon",

  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/admin/delete/${id}`, adminAuthHeader());

      return id;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Unable to delete coupon"));
    }
  }
);


/* =====================================================
   ADMIN: LIST ALL COUPONS
   GET /api/admin/all
===================================================== */

export const fetchAllCoupons = createAsyncThunk<
  Coupon[],
  void,
  { rejectValue: string }
>(
  "coupon/fetchAllCoupons",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/admin/all`, adminAuthHeader());

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Unable to fetch coupons"));
    }
  }
);


/* =====================================================
   APPLY COUPON
===================================================== */

export const applyCoupon = createAsyncThunk<
  Cart,
  {
    apply: string;
    code: string;
    orderValue: number;
    jwt: string;
  },
  {
    rejectValue: string;
  }
>(
  "coupon/applyCoupon",

  async (
    {
      apply,
      code,
      orderValue,
      jwt,
    },
    { rejectWithValue }
  ) => {

    try {

      if (!jwt) {
        return rejectWithValue(
          "User is not logged in"
        );
      }

      const response =
        await api.post<Cart>(
          `${API_URL}/apply`,
          null,
          {
            params: {
              apply,
              code,
              orderValue,
            },

            headers: {
              Authorization:
                `Bearer ${jwt}`,
            },
          }
        );

      console.log(
        "Apply coupon response:",
        response.data
      );

      return response.data;

    } catch (error: any) {

      console.error(
        "Apply coupon error:",
        error?.response?.data ||
          error?.message
      );

      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.response?.data ||
          error?.message ||
          "Failed to apply coupon"
      );
    }
  }
);


/* =====================================================
   INITIAL STATE
===================================================== */

const initialState: CouponState = {

  coupons: [],

  cart: null,

  loading: false,

  error: null,

  couponCreated: false,

  couponApplied: false,

};


/* =====================================================
   SLICE
===================================================== */

const couponSlice = createSlice({

  name: "coupon",

  initialState,

  reducers: {

    clearCouponError: (state) => {
      state.error = null;
    },

    removeAppliedCoupon: (state) => {
      state.couponApplied = false;
      state.cart = null;
      state.error = null;
    },

  },

  extraReducers: (builder) => {

    builder

      .addCase(
        applyCoupon.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        applyCoupon.fulfilled,
        (state, action) => {

          state.loading = false;

          state.error = null;

          state.couponApplied =
            action.meta.arg.apply === "true";

          state.cart =
            action.payload;

        }
      )

      .addCase(
        applyCoupon.rejected,
        (state, action) => {

          state.loading = false;

          state.couponApplied = false;

          state.error =
            action.payload ||
            action.error.message ||
            "Failed to apply coupon";

        }
      )

      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })

      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch coupons";
      })

      .addCase(createCoupon.fulfilled, (state, action) => {
        state.coupons.push(action.payload);
        state.couponCreated = true;
      })

      .addCase(createCoupon.rejected, (state, action) => {
        state.error = action.payload || "Unable to create coupon";
      })

      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter((c) => c.id !== action.payload);
      })

      .addCase(deleteCoupon.rejected, (state, action) => {
        state.error = action.payload || "Unable to delete coupon";
      });

  },

});


export const {
  clearCouponError,
  removeAppliedCoupon,
} =
  couponSlice.actions;


export const selectCoupon =
  (state: any) =>
    state.coupon;


export const selectCouponLoading =
  (state: any) =>
    state.coupon.loading;


export const selectCouponError =
  (state: any) =>
    state.coupon.error;


export const selectCouponApplied =
  (state: any) =>
    state.coupon.couponApplied;


export default couponSlice.reducer;