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
import { fetchHome, updateDeal } from "../../../State/HomeSlice";

const CreateTableForm = () => {
  const dispatch = useAppDispatch();

  const home = useAppSelector((state: any) => state.home.home);
  const deals = home?.deals || [];

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      dealId: "",
      discount: 0,
    },

    onSubmit: (values) => {
      const deal = deals.find((d: any) => d.id === Number(values.dealId));

      if (!deal) return;

      dispatch(
        updateDeal({
          id: deal.id,
          discount: Number(values.discount),
          categoryId: deal.category.id,
        })
      );
    },
  });

  const handleSelectDeal = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);

    const deal = deals.find((d: any) => d.id === Number(e.target.value));

    if (deal) {
      formik.setFieldValue("discount", deal.discount);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 700,
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
        Edit Deal
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        mb={3}
      >
        Change the discount on an existing deal.
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
          name="dealId"
          label="Deal"
          value={formik.values.dealId}
          onChange={handleSelectDeal}
        >
          {deals.map((deal: any) => (
            <MenuItem key={deal.id} value={deal.id}>
              #{deal.id} — {deal.category?.name} ({deal.discount}%)
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          type="number"
          name="discount"
          label="New Discount (%)"
          value={formik.values.discount}
          onChange={formik.handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!formik.values.dealId}
          sx={{
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateTableForm;
