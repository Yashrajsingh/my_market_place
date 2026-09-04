import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";
import { User } from "../types/UserTypes";

/* =====================================================
   SEND LOGIN / SIGNUP OTP
===================================================== */

export const sendLoginSignUpOtp = createAsyncThunk<
  any,
  { email: string },
  { rejectValue: string }
>(
  "auth/sendLoginSignupOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      console.log("Sending OTP to:", email);

      const response = await api.post("/auth/sent-otp", {
        email,
      });

      console.log("OTP API response:", response.data);

      return response.data;
    } catch (error: any) {
      console.error(
        "OTP API error:",
        error.response?.data
      );

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Unable to send OTP"
      );
    }
  }
);

/* =====================================================
   SIGN IN
===================================================== */

export interface LoginRequest {
  email: string;
  otp: string;
}

export const signin = createAsyncThunk<
  any,
  LoginRequest,
  { rejectValue: string }
>(
  "auth/signin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      console.log("Login request:", loginRequest);

      const response = await api.post(
        "/auth/signing",
        loginRequest
      );

      console.log(
        "Login API response:",
        response.data
      );

      if (response.data?.jwt) {
        localStorage.setItem(
          "jwt",
          response.data.jwt
        );
      }

      return response.data;
    } catch (error: any) {
      console.error(
        "Login API error:",
        error.response?.data
      );

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Login Failed"
      );
    }
  }
);

/* =====================================================
   SIGN UP
===================================================== */

export interface SignupRequest {
  fullName: string;
  email: string;
  otp: string;
}

export const signup = createAsyncThunk<
  any,
  SignupRequest,
  { rejectValue: string }
>(
  "auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      console.log(
        "Signup request:",
        signupRequest
      );

      const response = await api.post(
        "/auth/signup",
        signupRequest
      );

      console.log(
        "Signup API response:",
        response.data
      );

      return response.data;
    } catch (error: any) {
      console.error(
        "Signup API error:",
        error.response?.data
      );

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Registration Failed"
      );
    }
  }
);

/* =====================================================
   FETCH USER PROFILE
===================================================== */

export const fetchUserProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      console.log(
        "Fetching user profile. JWT:",
        jwt
      );

      if (!jwt) {
        return rejectWithValue(
          "User is not logged in"
        );
      }

      /*
       * IMPORTANT:
       * Backend endpoint:
       *
       * GET /user/profile
       *
       * JWT is sent in Authorization header.
       */

      const response = await api.get(
        "/user/profile",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(
        "User profile response:",
        response.data
      );

      return response.data;
    } catch (error: any) {
      console.error(
        "User profile API error:",
        error.response?.data
      );

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Unable to fetch user profile"
      );
    }
  }
);

/* =====================================================
   LOGOUT
===================================================== */

export const logout = createAsyncThunk<
  void,
  any
>(
  "auth/logout",
  async (navigate) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("seller_jwt");
    localStorage.removeItem("user");
    localStorage.removeItem("seller");

    /*
     * Redirect to home page after logout
     */
    if (navigate) {
      navigate("/");
    }
  }
);

/* =====================================================
   AUTH STATE
===================================================== */

interface AuthState {
  loading: boolean;
  error: string | null;

  user: User | null;

  otpResponse: any;

  isLoggedIn: boolean;

  authResponse: any;

  signupResponse: any;

  jwt: string | null;
}

const initialState: AuthState = {
  loading: false,

  error: null,

  user: null,

  otpResponse: null,

  isLoggedIn: !!localStorage.getItem("jwt"),

  authResponse: null,

  signupResponse: null,

  jwt: localStorage.getItem("jwt"),
};

/* =====================================================
   SLICE
===================================================== */

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* =================================================
         SEND OTP
      ================================================= */

      .addCase(
        sendLoginSignUpOtp.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        sendLoginSignUpOtp.fulfilled,
        (state, action) => {
          state.loading = false;

          state.otpResponse =
            action.payload;

          state.error = null;
        }
      )

      .addCase(
        sendLoginSignUpOtp.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            action.error.message ||
            "Failed to send OTP";
        }
      )

      /* =================================================
         SIGN IN
      ================================================= */

      .addCase(
        signin.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        signin.fulfilled,
        (state, action) => {
          state.loading = false;

          state.authResponse =
            action.payload;

          state.jwt =
            action.payload?.jwt ||
            null;

          state.isLoggedIn =
            !!action.payload?.jwt;

          state.error = null;
        }
      )

      .addCase(
        signin.rejected,
        (state, action) => {
          state.loading = false;

          state.isLoggedIn = false;

          state.error =
            action.payload ||
            action.error.message ||
            "Login Failed";
        }
      )

      /* =================================================
         SIGN UP
      ================================================= */

      .addCase(
        signup.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        signup.fulfilled,
        (state, action) => {
          state.loading = false;

          state.signupResponse =
            action.payload;

          state.error = null;
        }
      )

      .addCase(
        signup.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            action.error.message ||
            "Registration Failed";
        }
      )

      /* =================================================
         FETCH USER PROFILE
      ================================================= */

      .addCase(
        fetchUserProfile.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchUserProfile.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user = action.payload;

          state.isLoggedIn = true;

          state.error = null;
        }
      )

      .addCase(
        fetchUserProfile.rejected,
        (state, action) => {
          state.loading = false;

          state.user = null;

          state.isLoggedIn = false;

          state.error =
            action.payload ||
            action.error.message ||
            "Unable to fetch user profile";
        }
      )

      /* =================================================
         LOGOUT
      ================================================= */

      .addCase(
        logout.fulfilled,
        (state) => {
          state.loading = false;

          state.jwt = null;

          state.user = null;

          state.isLoggedIn = false;

          state.authResponse = null;

          state.otpResponse = null;

          state.signupResponse = null;

          state.error = null;
        }
      );
  },
});

export default authSlice.reducer;

/* =====================================================
   SELECTOR
===================================================== */

export const selectAuth = (state: any) =>
  state.auth;