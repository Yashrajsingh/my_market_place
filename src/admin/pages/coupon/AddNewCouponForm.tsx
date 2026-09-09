import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../State/Store";
import { createCoupon } from "../../../State/customer/CouponSlice";

interface CouponFormValues {
  code: string;
  discountPercentage: number;
  validityStartDate: string;
  validityEndDate: string;
  minimumOrderValue: number;
}

const AddNewCouponForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik<CouponFormValues>({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: "",
      validityEndDate: "",
      minimumOrderValue: 0,
    },

    onSubmit: async (values) => {
      const result = await dispatch(
        createCoupon({ ...values, isActive: true })
      );

      if (createCoupon.fulfilled.match(result)) {
        navigate("/admin/coupon");
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F8F7FC",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 5,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 700,
          borderRadius: 3,
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          Add New Coupon
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Create a new coupon for your customers.
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Coupon Code"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Discount Percentage"
                name="discountPercentage"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                error={formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                helperText={formik.touched.discountPercentage && formik.errors.discountPercentage}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                name="validityStartDate"
                value={formik.values.validityStartDate}
                onChange={formik.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                name="validityEndDate"
                value={formik.values.validityEndDate}
                onChange={formik.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Minimum Order Value (₹)"
                name="minimumOrderValue"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.6,
                  fontSize: 16,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  background:
                    "linear-gradient(90deg,#0071E3,#FF3B30)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg,#0058B0,#D70015)",
                  },
                }}
              >
                Create Coupon
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddNewCouponForm;