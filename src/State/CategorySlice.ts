import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";
import { Category } from "../types/ProductTypes";
import { getErrorMessage } from "../util/getErrorMessage";

/* =====================================================
   FETCH ALL CATEGORIES (flat list, every level)
   GET /categories
===================================================== */

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories");

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        getErrorMessage(error, "Unable to fetch categories")
      );
    }
  }
);

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch categories";
      });
  },
});

export const selectCategories = (state: any) => state.category.categories;

export const selectTopLevelCategories = (state: any): Category[] =>
  state.category.categories.filter((c: Category) => c.level === 1);

export const selectChildCategories = (parentCategoryId: string) =>
  (state: any): Category[] =>
    state.category.categories.filter(
      (c: Category) => c.parentCategory?.categoryId === parentCategoryId
    );

export default categorySlice.reducer;
