import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { sendLoginSignUpOtp } from "../../../../State/AuthSlice";
import {
  sellerLogin,
  fetchSellerProfile,
} from "../../../../State/seller/SellerAuthSlice";

const SellerLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sellerAuth = useAppSelector((state) => state.sellerAuth);

  const [showOtp, setShowOtp] = useState(false);
  const [timer, setTimer] = useState(20);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    if (sellerAuth.jwt && !sellerAuth.seller) {
      dispatch(fetchSellerProfile());
    }
  }, [sellerAuth.jwt]);

  useEffect(() => {
    if (sellerAuth.seller) {
      navigate("/seller");
    }
  }, [sellerAuth.seller]);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },

    onSubmit: async (values) => {
      try {
        const loginResponse = await dispatch(
          sellerLogin({
            email: values.email,
            otp: values.otp,
          })
        ).unwrap();

        await dispatch(fetchSellerProfile()).unwrap();

        setSeverity("success");
        setMessage(loginResponse.message || "Login Successful");
        setSnackOpen(true);
      } catch (err: any) {
        setSeverity("error");
        setMessage(err || "Login Failed");
        setSnackOpen(true);
      }
    },
  });

  const handleSendOtp = async () => {
    if (!formik.values.email) return;

    setLoading(true);

    try {
      await dispatch(
        sendLoginSignUpOtp({
          email: formik.values.email,
        })
      ).unwrap();

      setSeverity("success");
      setMessage("OTP Sent Successfully");
      setSnackOpen(true);

      setShowOtp(true);

      let second = 20;

      setTimer(second);

      const interval = setInterval(() => {
        second--;

        setTimer(second);

        if (second <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    } catch (err: any) {
      setSeverity("error");
      setMessage(err || "Unable to send OTP");
      setSnackOpen(true);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-5 w-full"
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: 700,
          color: "#0071E3",
        }}
      >
        Login As Seller
      </Typography>

      <TextField
        fullWidth
        name="email"
        label="Email"
        size="small"
        value={formik.values.email}
        onChange={formik.handleChange}
      />

      {!showOtp && (
        <Button
          fullWidth
          variant="contained"
          onClick={handleSendOtp}
          disabled={!formik.values.email || loading}
          sx={{ height: 48 }}
        >
          {loading ? (
            <>
              <CircularProgress
                size={18}
                color="inherit"
              />
              &nbsp;Sending...
            </>
          ) : (
            "Send OTP"
          )}
        </Button>
      )}

      {showOtp && (
        <>
          <Typography fontWeight={600}>
            Enter OTP sent to your Email
          </Typography>

          <TextField
            fullWidth
            size="small"
            name="otp"
            label="OTP"
            value={formik.values.otp}
            onChange={formik.handleChange}
          />

          {timer > 0 ? (
            <Typography color="text.secondary">
              Resend OTP in {timer}s
            </Typography>
          ) : (
            <Button onClick={handleSendOtp}>
              Resend OTP
            </Button>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={sellerAuth.loading}
            sx={{
              height: 48,
              bgcolor: "#0d9488",
            }}
          >
            {sellerAuth.loading ? (
              <CircularProgress
                size={20}
                color="inherit"
              />
            ) : (
              "LOGIN"
            )}
          </Button>

          <Typography align="center">
            Don't have an account?
          </Typography>

          <Button
            fullWidth
            variant="outlined"
          >
            REGISTER
          </Button>
        </>
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default SellerLoginForm;