import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Address } from "../../types/UserTypes";
import { Order, PaymentLinkResponse, PaymentMethod } from "../../types/OrderTypes";
import { getErrorMessage } from "../../util/getErrorMessage";

const authHeader = () => {
  const jwt = localStorage.getItem("jwt");
  return { headers: { Authorization: `Bearer ${jwt}` } };
};

/* =====================================================
   CHECKOUT — create orders + payment link
   POST /api/orders?paymentMethod=...
===================================================== */

export const createOrder = createAsyncThunk<
  PaymentLinkResponse,
  { paymentMethod: PaymentMethod; address: Address },
  { rejectValue: string }
>(
  "order/createOrder",
  async ({ paymentMethod, address }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return rejectWithValue("User is not logged in");
      }

      const response = await api.post(
        "/api/orders",
        address,
        {
          params: { paymentMethod },
          ...authHeader(),
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to place order")
      );
    }
  }
);

/* =====================================================
   ORDER HISTORY
   GET /api/orders/user
===================================================== */

export const fetchOrderHistory = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>(
  "order/fetchOrderHistory",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return rejectWithValue("User is not logged in");
      }

      const response = await api.get("/api/orders/user", authHeader());

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to fetch orders")
      );
    }
  }
);

/* =====================================================
   GET A SINGLE ORDER
   GET /api/orders/{orderId}
===================================================== */

export const fetchOrderById = createAsyncThunk<
  Order,
  number,
  { rejectValue: string }
>(
  "order/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/orders/${orderId}`,
        authHeader()
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to fetch order")
      );
    }
  }
);

/* =====================================================
   CANCEL AN ORDER
   PUT /api/orders/{orderId}/cancel
===================================================== */

export const cancelOrder = createAsyncThunk<
  Order,
  number,
  { rejectValue: string }
>(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/api/orders/${orderId}/cancel`,
        null,
        authHeader()
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to cancel order")
      );
    }
  }
);

/* =====================================================
   CONFIRM PAYMENT (Razorpay redirect callback)
   GET /api/payment/api/payment/{paymentId}?paymentLinkId=...
===================================================== */

export const confirmPayment = createAsyncThunk<
  { message: string },
  { paymentId: string; paymentLinkId: string },
  { rejectValue: string }
>(
  "order/confirmPayment",
  async ({ paymentId, paymentLinkId }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/payment/api/payment/${paymentId}`,
        {
          params: { paymentLinkId },
          ...authHeader(),
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to confirm payment")
      );
    }
  }
);

interface OrderState {
  orders: Order[];
  order: Order | null;
  paymentLink: PaymentLinkResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  order: null,
  paymentLink: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearPaymentLink: (state) => {
      state.paymentLink = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentLink = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to place order";
      })

      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch orders";
      })

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch order";
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.order = action.payload;

        const index = state.orders.findIndex(
          (o) => o.id === action.payload.id
        );

        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.error = action.payload || "Unable to cancel order";
      });
  },
});

export const { clearPaymentLink } = orderSlice.actions;

export const selectOrders = (state: any) => state.order.orders;
export const selectOrder = (state: any) => state.order.order;
export const selectOrderLoading = (state: any) => state.order.loading;
export const selectOrderError = (state: any) => state.order.error;

export default orderSlice.reducer;
