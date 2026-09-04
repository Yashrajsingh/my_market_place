import { Box, Grid, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep2 = ({ formik }: any) => {
  return (
    <Box className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-xl p-6">
      <p className="text-xl font-bold text-gray-800 mb-5">Pickup Address</p>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth name="pickupAddress.name" label="Name"
            value={formik.values.pickupAddress.name}
            onChange={formik.handleChange}/>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth name="pickupAddress.mobile" label="Mobile"
            value={formik.values.pickupAddress.mobile}
            onChange={formik.handleChange}/>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth name="pickupAddress.address" label="Address"
            value={formik.values.pickupAddress.address}
            onChange={formik.handleChange}/>
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth name="pickupAddress.city" label="City"
            value={formik.values.pickupAddress.city}
            onChange={formik.handleChange}/>
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth name="pickupAddress.state" label="State"
            value={formik.values.pickupAddress.state}
            onChange={formik.handleChange}/>
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth name="pickupAddress.pinCode" label="Pincode"
            value={formik.values.pickupAddress.pinCode}
            onChange={formik.handleChange}/>
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth name="pickupAddress.locality" label="Locality"
            value={formik.values.pickupAddress.locality}
            onChange={formik.handleChange}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BecomeSellerFormStep2;