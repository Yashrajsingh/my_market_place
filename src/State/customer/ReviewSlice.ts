import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { CreateReviewRequest, Review } from "../../types/ReviewTypes";
import { getErrorMessage } from "../../util/getErrorMessage";

/* =====================================================
   FETCH REVIEWS FOR A PRODUCT
   GET /api/products/{productId}/reviews
===================================================== */

export const fetchReviews = createAsyncThunk<
  Review[],
  number,
  { rejectValue: string }
>(
  "review/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/products/${productId}/reviews`
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to fetch reviews")
      );
    }
  }
);

/* =====================================================
   CREATE A REVIEW
   POST /api/products/{productId}/reviews
===================================================== */

export const createReview = createAsyncThunk<
  Review,
  { productId: number; request: CreateReviewRequest },
  { rejectValue: string }
>(
  "review/createReview",
  async ({ productId, request }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return rejectWithValue("User is not logged in");
      }

      const response = await api.post(
        `/api/products/${productId}/reviews`,
        request,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to submit review")
      );
    }
  }
);

/* =====================================================
   UPDATE A REVIEW
   PATCH /api/reviews/{reviewId}
===================================================== */

export const updateReview = createAsyncThunk<
  Review,
  { reviewId: number; request: CreateReviewRequest },
  { rejectValue: string }
>(
  "review/updateReview",
  async ({ reviewId, request }, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return rejectWithValue("User is not logged in");
      }

      const response = await api.patch(
        `/api/reviews/${reviewId}`,
        request,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to update review")
      );
    }
  }
);

/* =====================================================
   DELETE A REVIEW
   DELETE /api/reveiws/{reviewId}  (misspelled server-side)
===================================================== */

export const deleteReview = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  "review/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return rejectWithValue("User is not logged in");
      }

      await api.delete(`/api/reveiws/${reviewId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      return reviewId;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to delete review")
      );
    }
  }
);

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewState: (state) => {
      state.reviews = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch reviews";
      })

      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews = [action.payload, ...state.reviews];
      })
      .addCase(createReview.rejected, (state, action) => {
        state.error = action.payload || "Unable to submit review";
      })

      .addCase(updateReview.fulfilled, (state, action) => {
        if (!action.payload) return;

        const index = state.reviews.findIndex(
          (r) => r.id === action.payload.id
        );

        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (r) => r.id !== action.payload
        );
      });
  },
});

export const { clearReviewState } = reviewSlice.actions;

export const selectReviews = (state: any) => state.review.reviews;
export const selectReviewLoading = (state: any) => state.review.loading;
export const selectReviewError = (state: any) => state.review.error;

export default reviewSlice.reducer;
