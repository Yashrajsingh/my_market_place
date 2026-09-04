import { Box, Grid, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep4 = ({ formik }: any) => {
  return (
    <Box className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-xl p-6">
      <p className="text-xl font-bold text-gray-800 mb-5">Supplier Details</p>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth name="sellerName" label="Seller Name"
            value={formik.values.sellerName}
            onChange={formik.handleChange}/>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth name="email" label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}/>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth name="businessDetails.businessName" label="Business Name"
            value={formik.values.businessDetails.businessName}
            onChange={formik.handleChange}/>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth name="businessDetails.businessEmail" label="Business Email"
            value={formik.values.businessDetails.businessEmail}
            onChange={formik.handleChange}/>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth name="password" label="Password" type="password"
            value={formik.values.password}
            onChange={formik.handleChange}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BecomeSellerFormStep4;