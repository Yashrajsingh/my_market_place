import { Box, TextField } from "@mui/material";
import React from "react";

const BecomeSellerFormStep1 = ({ formik }: any) => {
  return (
    <Box className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-xl p-6">
      <p className="text-xl font-bold text-gray-800 mb-5">Contact Details</p>

      <div className="space-y-4">
        <TextField
          fullWidth
          name="mobile"
          label="Mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
        />

        <TextField
          fullWidth
          name="gstin"
          label="GSTIN"
          value={formik.values.gstin}
          onChange={formik.handleChange}
        />
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep1;