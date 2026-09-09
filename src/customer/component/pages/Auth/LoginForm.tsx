import React, { useState } from "react";

import {
  Alert,
  Button,
  Snackbar,
  TextField,
} from "@mui/material";

import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";

import {
  sendLoginSignUpOtp,
  signin,
  fetchUserProfile,
} from "../../../../State/AuthSlice";

import {
  useAppDispatch,
} from "../../../../State/Store";


const LoginForm: React.FC = () => {

  const dispatch =
    useAppDispatch();

  const navigate =
    useNavigate();

  const [otpSent, setOtpSent] =
    useState(false);

  const [snackOpen, setSnackOpen] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [severity, setSeverity] =
    useState<
      "success" | "error"
    >("success");


  /* =====================================================
     FORMIK
  ===================================================== */

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },

    onSubmit: async (
      values,
      { setSubmitting }
    ) => {

      try {

        /* ============================
           LOGIN
        ============================ */

        await dispatch(
          signin({
            email: values.email,
            otp: values.otp,
          })
        ).unwrap();


        /* ============================
           FETCH USER PROFILE
        ============================ */

        await dispatch(
          fetchUserProfile()
        ).unwrap();


        /* ============================
           SUCCESS
        ============================ */

        setSeverity("success");

        setMessage(
          "Login successful"
        );

        setSnackOpen(true);


        /* ============================
           REDIRECT
        ============================ */

        setTimeout(() => {
          navigate("/");
        }, 800);

      } catch (error: any) {

        console.error(
          "Login error:",
          error
        );

        setSeverity("error");

        setMessage(
          typeof error === "string"
            ? error
            : error?.message ||
              "Login failed"
        );

        setSnackOpen(true);

      } finally {

        setSubmitting(false);

      }
    },
  });


  /* =====================================================
     SEND OTP
  ===================================================== */

  const handleSendOtp =
    async () => {

      if (
        !formik.values.email
      ) {

        setSeverity("error");

        setMessage(
          "Please enter your email"
        );

        setSnackOpen(true);

        return;
      }


      try {

        await dispatch(
          sendLoginSignUpOtp({
            email:
              formik.values.email,
          })
        ).unwrap();


        setOtpSent(true);

        setSeverity("success");

        setMessage(
          "OTP sent successfully"
        );

        setSnackOpen(true);

      } catch (error: any) {

        setSeverity("error");

        setMessage(
          typeof error === "string"
            ? error
            : "Unable to send OTP"
        );

        setSnackOpen(true);
      }
    };


  return (
    <>
      <form
        onSubmit={
          formik.handleSubmit
        }
        className="space-y-5"
      >

        {/* =================================================
            EMAIL
        ================================================= */}

        <div className="flex items-start gap-3">

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={
              formik.values.email
            }
            onChange={
              formik.handleChange
            }
            onBlur={
              formik.handleBlur
            }
            placeholder="Enter your email"
            size="small"
            required
          />

          {/* SEND OTP */}

          <Button
            type="button"
            variant="outlined"
            onClick={
              handleSendOtp
            }
            disabled={
              !formik.values.email
            }
            sx={{
              minWidth: "120px",
              height: "40px",
              borderRadius: "10px",
              textTransform:
                "none",
              fontWeight: 600,
              borderColor:
                "#0071E3",
              color: "#0058B0",

              "&:hover": {
                borderColor:
                  "#0058B0",
                backgroundColor:
                  "rgba(0,113,227,0.08)",
              },
            }}
          >
            {otpSent
              ? "Resend OTP"
              : "Send OTP"}
          </Button>

        </div>


        {/* =================================================
            OTP
        ================================================= */}

        <TextField
          fullWidth
          label="OTP"
          name="otp"
          type="text"
          value={
            formik.values.otp
          }
          onChange={
            formik.handleChange
          }
          onBlur={
            formik.handleBlur
          }
          placeholder="Enter 6 digit OTP"
          size="small"
          inputProps={{
            maxLength: 6,
          }}
          required
        />


        {/* =================================================
            LOGIN BUTTON
        ================================================= */}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={
            formik.isSubmitting ||
            !formik.values.email ||
            !formik.values.otp
          }
          sx={{
            py: 1.4,
            borderRadius: "12px",
            textTransform:
              "none",
            fontSize: "1rem",
            fontWeight: 700,

            background:
              "linear-gradient(135deg,#0071E3,#FF3B30)",

            boxShadow:
              "0 8px 20px rgba(0,113,227,0.3)",

            "&:hover": {
              background:
                "linear-gradient(135deg,#0058B0,#D70015)",
            },

            "&:disabled": {
              background:
                "#d1d5db",
              color:
                "#6b7280",
            },
          }}
        >
          {formik.isSubmitting
            ? "Signing In..."
            : "Login"}
        </Button>

      </form>


      {/* =================================================
          SNACKBAR
      ================================================= */}

      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() =>
          setSnackOpen(false)
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={severity}
          variant="filled"
          onClose={() =>
            setSnackOpen(false)
          }
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};


export default LoginForm;