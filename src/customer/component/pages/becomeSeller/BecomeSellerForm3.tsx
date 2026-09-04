import { Box, Grid, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep3 = ({ formik }: any) => {
  return (
    <Box className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-xl p-6">
      <p className="text-xl font-bold text-gray-800 mb-5">Bank Details</p>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth name="bankDetails.AccountNumber" label="Account Number"
            value={formik.values.bankDetails.AccountNumber}
            onChange={formik.handleChange}/>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth name="bankDetails.ifscCode" label="IFSC Code"
            value={formik.values.bankDetails.ifscCode}
            onChange={formik.handleChange}/>
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth name="bankDetails.accountHolderName" label="Account Holder Name"
            value={formik.values.bankDetails.accountHolderName}
            onChange={formik.handleChange}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BecomeSellerFormStep3;