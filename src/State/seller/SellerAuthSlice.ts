import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Seller } from "../../types/SellerTypes";
import { getErrorMessage } from "../../util/getErrorMessage";

const sellerAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("seller_jwt")}`,
  },
});

/* ================================
   Seller Login
   POST /sellers/login
================================ */

export const sellerLogin = createAsyncThunk(
  "sellerAuth/login",
  async (
    loginRequest: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/sellers/login", loginRequest);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Login Failed"));
    }
  }
);

/* ================================
   Register a new seller
   POST /sellers
================================ */

export const registerSeller = createAsyncThunk<
  Seller,
  Partial<Seller> & { password: string },
  { rejectValue: string }
>(
  "sellerAuth/registerSeller",
  async (request, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers", request);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to register seller account")
      );
    }
  }
);

/* ================================
   Verify seller email
   PATCH /sellers/verify/{otp}
================================ */

export const verifySellerEmail = createAsyncThunk<
  Seller,
  string,
  { rejectValue: string }
>(
  "sellerAuth/verifySellerEmail",
  async (otp, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/sellers/verify/${otp}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Invalid or expired verification link")
      );
    }
  }
);

/* ================================
   Fetch Seller Profile
   GET /sellers/profile
================================ */

export const fetchSellerProfile = createAsyncThunk(
  "sellerAuth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", sellerAuthHeader());

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Unable to fetch profile"));
    }
  }
);

/* ================================
   Update Seller Profile (partial)
   PATCH /sellers/profile
================================ */

export const updateSellerProfile = createAsyncThunk<
  Seller,
  Partial<Seller>,
  { rejectValue: string }
>(
  "sellerAuth/updateSellerProfile",
  async (request, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        "/sellers/profile",
        request,
        sellerAuthHeader()
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to update profile")
      );
    }
  }
);

interface SellerAuthState {
  loading: boolean;
  error: string | null;
  jwt: string | null;
  seller: Seller | null;
  registeredSeller: Seller | null;
}

const initialState: SellerAuthState = {
  loading: false,
  error: null,
  jwt: localStorage.getItem("seller_jwt"),
  seller: null,
  registeredSeller: null,
};

const sellerAuthSlice = createSlice({
  name: "sellerAuth",

  initialState,

  reducers: {
    logoutSeller(state){

        state.jwt=null;

        state.seller=null;

        state.error=null;

        state.loading=false;

        localStorage.removeItem("seller_jwt");

        },
  },

  extraReducers: (builder) => {
    builder

      /* Login */

      .addCase(sellerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sellerLogin.fulfilled, (state, action) => {
        state.loading = false;

        state.jwt = action.payload.jwt;

        localStorage.setItem("seller_jwt", action.payload.jwt);
      })

      .addCase(sellerLogin.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })

      /* Register */

      .addCase(registerSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerSeller.fulfilled, (state, action) => {
        state.loading = false;

        state.registeredSeller = action.payload;
      })

      .addCase(registerSeller.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Registration failed";
      })

      /* Verify email */

      .addCase(verifySellerEmail.fulfilled, (state, action) => {
        state.seller = action.payload;
      })

      .addCase(verifySellerEmail.rejected, (state, action) => {
        state.error = action.payload || "Verification failed";
      })

      /* Profile */

      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.seller = action.payload;
      })

      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload as string;
      })

      /* Update profile */

      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.seller = action.payload;
      })

      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.error = action.payload || "Unable to update profile";
      });
  },
});

export const { logoutSeller } = sellerAuthSlice.actions;

export const selectSellerAuth = (state: any) => state.sellerAuth;

export default sellerAuthSlice.reducer;
