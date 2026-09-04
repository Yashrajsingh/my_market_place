import React, {
  useState,
} from "react";

import {
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";

import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";

import {
  sendLoginSignUpOtp,
  signup,
} from "../../../../State/AuthSlice";

import {
  useAppDispatch,
} from "../../../../State/Store";


const RegisterForm: React.FC =
  () => {

    const dispatch =
      useAppDispatch();

    const navigate =
      useNavigate();

    const [otpSent, setOtpSent] =
      useState(false);

    const [snackOpen, setSnackOpen] = useState(false);

    const [message, setMessage] = useState("");

    const [severity, setSeverity] =
      useState<
        "success" | "error"
      >("success");


    const formik = useFormik({
      initialValues: {
        fullName: "",
        email: "",
        otp: "",
      },

      onSubmit: async (
        values,
        { setSubmitting }
      ) => {

        try {

          /* OTP CHECK */

          if (!otpSent) {

            setSeverity("error");

            setMessage(
              "Please send OTP first"
            );

            setSnackOpen(true);

            return;
          }


          /* SIGNUP API */

          await dispatch(
            signup({
              fullName: values.fullName,

              email: values.email,

              otp: values.otp,
            })
          ).unwrap();


          /* SUCCESS */

          setSeverity("success");

          setMessage(
            "Registration successful. Please login."
          );

          setSnackOpen(true);


          /* GO LOGIN */

          setTimeout(() => {
            navigate("/login");
          }, 1200);

        } catch (error: any) {

          console.error(
            "Signup error:",
            error
          );

          setSeverity("error");

          setMessage(
            typeof error === "string"
              ? error
              : "Registration failed"
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
            "Please enter your email first"
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
          className="space-y-4"
        >

          {/* FULL NAME */}

          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={
              formik.values.fullName
            }
            onChange={
              formik.handleChange
            }
            size="small"
            required
          />


          {/* EMAIL */}

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
              size="small"
              required
            />

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
                  "#7C3AED",
                color:
                  "#6D28D9",

                "&:hover": {
                  borderColor:
                    "#6D28D9",
                  backgroundColor:
                    "rgba(124,58,237,0.08)",
                },
              }}
            >
              {otpSent
                ? "Resend OTP"
                : "Send OTP"}
            </Button>

          </div>


          {/* OTP */}

          {otpSent && (
            <TextField
              fullWidth
              label="OTP"
              name="otp"
              value={
                formik.values.otp
              }
              onChange={
                formik.handleChange
              }
              size="small"
              inputProps={{
                maxLength: 6,
              }}
              required
            />
          )}


          {/* REGISTER */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={
              formik.isSubmitting ||
              !formik.values.fullName ||
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
                "linear-gradient(135deg,#7C3AED,#F43F5E)",

              boxShadow:
                "0 8px 20px rgba(124,58,237,0.3)",

              "&:hover": {
                background:
                  "linear-gradient(135deg,#6D28D9,#BE123C)",
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
              ? "Creating Account..."
              : "Create Account"}
          </Button>

        </form>


        {/* SNACKBAR */}

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


export default RegisterForm;
