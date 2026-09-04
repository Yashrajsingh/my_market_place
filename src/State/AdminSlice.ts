import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";
import { AccountStatus, Seller } from "../types/SellerTypes";
import { getErrorMessage } from "../util/getErrorMessage";

const adminAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});

/* =====================================================
   LIST SELLERS (optionally by status)
   GET /sellers?status=
===================================================== */

export const fetchAllSellers = createAsyncThunk<
  Seller[],
  AccountStatus | undefined,
  { rejectValue: string }
>(
  "admin/fetchAllSellers",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers", {
        params: status ? { status } : {},
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Unable to fetch sellers"));
    }
  }
);

/* =====================================================
   CHANGE SELLER ACCOUNT STATUS
   PATCH /api/admin/seller/{id}/status/{status}
===================================================== */

export const updateSellerAccountStatus = createAsyncThunk<
  Seller,
  { sellerId: number; status: AccountStatus },
  { rejectValue: string }
>(
  "admin/updateSellerAccountStatus",
  async ({ sellerId, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/api/admin/seller/${sellerId}/status/${status}`,
        null,
        adminAuthHeader()
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to update seller status")
      );
    }
  }
);

interface AdminState {
  sellers: Seller[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  sellers: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch sellers";
      })

      .addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
        const index = state.sellers.findIndex((s) => s.id === action.payload.id);

        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
      })
      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.error = action.payload || "Unable to update seller status";
      });
  },
});

export default adminSlice.reducer;
