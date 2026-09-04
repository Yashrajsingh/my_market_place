import { Alert, Button, Snackbar } from "@mui/material";
import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useFormik } from "formik";

import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormPart2";
import BecomeSellerFormStep3 from "./BecomeSellerForm3";
import BecomeSellerFormStep4 from "./BecomeSellerForm4";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { registerSeller } from "../../../../State/seller/SellerAuthSlice";

const steps = [
  "Tax Details & Mobile",
  "PickUp Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const dispatch = useAppDispatch();
  const { loading, registeredSeller, error } = useAppSelector(
    (state: any) => state.sellerAuth
  );

  const [activeStep, setActiveStep] = useState(0);
  const [snackOpen, setSnackOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      mobile: "",
      gstin: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pinCode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: {
        AccountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: "",
    },

    onSubmit: async (values) => {
      const result = await dispatch(
        registerSeller({
          email: values.email,
          password: values.password,
          mobile: values.mobile,
          GSTIN: values.gstin,
          sellerName: values.sellerName,
          bankDetails: values.bankDetails,
          businessDetails: values.businessDetails,
          pickupAddress: values.pickupAddress,
        })
      );

      setSnackOpen(true);

      if (registerSeller.fulfilled.match(result)) {
        // Keep the confirmation panel visible; nothing further to do.
      }
    },
  });

  const handleStep = (value: number) => () => {
    if (value === 1 && activeStep === steps.length - 1) {
      handleCreateAccount();
      return;
    }

    setActiveStep((prev) => prev + value);
  };

  const handleCreateAccount = () => {
    formik.handleSubmit();
  };

  if (registeredSeller) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/30 bg-white/20 p-10 text-center shadow-2xl backdrop-blur-xl">
        <div className="text-5xl">📧</div>
        <h2 className="text-2xl font-bold text-slate-900">Check your email</h2>
        <p className="text-slate-600">
          We've sent a verification link to <b>{registeredSeller.email}</b>.
          Verify your email, then log in to access your seller dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="flex max-h-[78vh] flex-col overflow-hidden rounded-3xl border border-white/30 bg-white/20 p-6 shadow-2xl backdrop-blur-xl">
      {/* Stepper */}
      <div className="mb-6">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Form Section */}
      <section className="overflow-y-auto px-2 pb-4">
        {activeStep === 0 && <BecomeSellerFormStep1 formik={formik} />}
        {activeStep === 1 && <BecomeSellerFormStep2 formik={formik} />}
        {activeStep === 2 && <BecomeSellerFormStep3 formik={formik} />}
        {activeStep === 3 && <BecomeSellerFormStep4 formik={formik} />}
      </section>

      {/* Buttons */}
      <div className="mt-3 flex flex-col gap-2 border-t border-white/30 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={handleStep(-1)}
          variant="contained"
          disabled={activeStep === 0}
          fullWidth
          sx={{ maxWidth: { sm: "160px" }, minHeight: 44 }}
        >
          Back
        </Button>

        <Button
          onClick={handleStep(1)}
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ maxWidth: { sm: "220px" }, minHeight: 44 }}
        >
          {activeStep === steps.length - 1
            ? loading
              ? "Creating Account..."
              : "Create Account"
            : "Continue"}
        </Button>
      </div>

      <Snackbar
        open={snackOpen && Boolean(error)}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert severity="error" onClose={() => setSnackOpen(false)}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SellerAccountForm;
