import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Order, OrderStatus } from "../../types/OrderTypes";
import { SellerReport } from "../../types/SellerTypes";
import { Transaction } from "../../types/TransactionTypes";
import { getErrorMessage } from "../../util/getErrorMessage";

const sellerAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("seller_jwt")}`,
  },
});

/* ================================
   Seller performance report
   GET /sellers/report
================================ */

export const fetchSellerReport = createAsyncThunk<
  SellerReport,
  void,
  { rejectValue: string }
>(
  "seller/fetchSellerReport",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/report", sellerAuthHeader());

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Unable to fetch report"));
    }
  }
);

/* ================================
   Orders belonging to this seller
   GET /api/seller/orders
================================ */

export const fetchSellerOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>(
  "seller/fetchSellerOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/seller/orders", sellerAuthHeader());

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Unable to fetch orders"));
    }
  }
);

/* ================================
   Advance an order's fulfilment status
   PATCH /api/seller/orders/{orderId}/status/{orderStatus}
================================ */

export const updateSellerOrderStatus = createAsyncThunk<
  Order,
  { orderId: number; orderStatus: OrderStatus },
  { rejectValue: string }
>(
  "seller/updateSellerOrderStatus",
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/api/seller/orders/${orderId}/status/${orderStatus}`,
        null,
        sellerAuthHeader()
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to update order status")
      );
    }
  }
);

/* ================================
   Transactions for this seller
   GET /api/transactions/seller
================================ */

export const fetchSellerTransactions = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>(
  "seller/fetchSellerTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/api/transactions/seller",
        sellerAuthHeader()
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to fetch transactions")
      );
    }
  }
);

interface SellerState {
  report: SellerReport | null;
  orders: Order[];
  transactions: Transaction[];
  loading: boolean;
  error: any;
}

const initialState: SellerState = {
  report: null,
  orders: [],
  transactions: [],
  loading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "seller",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateSellerOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o.id === action.payload.id);

        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateSellerOrderStatus.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchSellerTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchSellerTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerSlice.reducer;
