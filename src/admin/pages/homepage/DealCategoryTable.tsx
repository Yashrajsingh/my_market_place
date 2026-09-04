import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  MenuItem,
  TextField,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createDeal, fetchHomeCategories } from "../../../State/HomeSlice";

const DealCategoryTable = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state: any) => state.home.categories);

  useEffect(() => {
    dispatch(fetchHomeCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      categoryId: "",
      discount: 0,
    },

    onSubmit: (values, { resetForm }) => {
      if (!values.categoryId) return;

      dispatch(
        createDeal({
          discount: Number(values.discount),
          categoryId: Number(values.categoryId),
        })
      );

      resetForm();
    },
  });

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 4,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        className="text-gradient-brand"
      >
        Create Deal
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={3}
      >
        Attach a discount to an existing home category.
      </Typography>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          fullWidth
          select
          name="categoryId"
          label="Category"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
        >
          {categories.map((cat: any) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name} ({cat.Section})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          type="number"
          name="discount"
          label="Discount (%)"
          value={formik.values.discount}
          onChange={formik.handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!formik.values.categoryId}
          sx={{
            mt: 1,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          Create Deal
        </Button>
      </Box>
    </Paper>
  );
};

export default DealCategoryTable;
