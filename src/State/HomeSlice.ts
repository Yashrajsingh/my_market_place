import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";
import { Deal, Home, HomeCategory } from "../types/HomeTypes";
import { getErrorMessage } from "../util/getErrorMessage";

/* =====================================================
   FETCH HOME AGGREGATE (customer-facing)
   POST /home/categories — acts as get-or-seed: if
   HomeCategory rows already exist, the body is ignored
   and the existing grouped Home structure is returned.
===================================================== */

export const fetchHome = createAsyncThunk<Home, void, { rejectValue: string }>(
  "home/fetchHome",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/categories", []);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Unable to fetch home data"));
    }
  }
);

/* =====================================================
   LIST ALL HOME CATEGORIES (admin, flat list)
   GET /admin.home-category
===================================================== */

export const fetchHomeCategories = createAsyncThunk<
  HomeCategory[],
  void,
  { rejectValue: string }
>(
  "home/fetchHomeCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin.home-category");

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to fetch categories")
      );
    }
  }
);

/* =====================================================
   UPDATE A HOME CATEGORY (image / categoryId only)
   PATCH /admin/home-category/{id}
===================================================== */

export const updateHomeCategory = createAsyncThunk<
  HomeCategory,
  { id: number; image?: string; categoryId?: string },
  { rejectValue: string }
>(
  "home/updateHomeCategory",
  async ({ id, ...request }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/home-category/${id}`, request);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to update category")
      );
    }
  }
);

/* =====================================================
   CREATE / UPDATE / DELETE A DEAL
   /admin/deals
===================================================== */

export const createDeal = createAsyncThunk<
  Deal,
  { discount: number; categoryId: number },
  { rejectValue: string }
>(
  "home/createDeal",
  async ({ discount, categoryId }, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/deals", {
        discount,
        category: { id: categoryId },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Unable to create deal"));
    }
  }
);

export const updateDeal = createAsyncThunk<
  Deal,
  { id: number; discount: number; categoryId: number },
  { rejectValue: string }
>(
  "home/updateDeal",
  async ({ id, discount, categoryId }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/deals/${id}`, {
        discount,
        category: { id: categoryId },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Unable to update deal"));
    }
  }
);

export const deleteDeal = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  "home/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/deals/${id}`);

      return id;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error, "Unable to delete deal"));
    }
  }
);

interface HomeState {
  home: Home | null;
  categories: HomeCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  home: null,
  categories: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHome.fulfilled, (state, action) => {
        state.loading = false;
        state.home = action.payload;
      })
      .addCase(fetchHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch home data";
      })

      .addCase(fetchHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch categories";
      })

      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((c) => c.id === action.payload.id);

        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateHomeCategory.rejected, (state, action) => {
        state.error = action.payload || "Unable to update category";
      });
  },
});

export default homeSlice.reducer;
