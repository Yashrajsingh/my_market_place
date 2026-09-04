import React from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Address } from "../../../../types/UserTypes";

const AddressForm = ({ onSave }: { onSave: (address: Address) => void }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pinCode: "",
      address: "",
      city: "",
      state: "",
      locality: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      mobile: Yup.string().required("Mobile is required"),
      pinCode: Yup.string().required("Pincode is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      locality: Yup.string().required("Locality is required"),
    }),

    onSubmit: (values) => {
      onSave(values);
    },
  });

  return (
    <div>
      <Box>
        <p className="text-xl font-semibold mb-4">Add Address</p>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="mobile"
                label="Mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="address"
                label="Address"
                multiline
                rows={3}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="city"
                label="City"
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="state"
                label="State"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="pinCode"
                label="Pincode"
                value={formik.values.pinCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                helperText={formik.touched.pinCode && formik.errors.pinCode}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                name="locality"
                label="Locality"
                value={formik.values.locality}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.locality && Boolean(formik.errors.locality)}
                helperText={formik.touched.locality && formik.errors.locality}
              />
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="contained">
                Save Address
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default AddressForm;