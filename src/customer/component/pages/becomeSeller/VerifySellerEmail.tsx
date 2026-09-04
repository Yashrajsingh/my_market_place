import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../../../State/Store";
import { verifySellerEmail } from "../../../../State/seller/SellerAuthSlice";

const VerifySellerEmail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { otp } = useParams();

  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (!otp) return;

    dispatch(verifySellerEmail(otp)).then((result: any) => {
      if (result.payload?.id) {
        setStatus("success");
        setMessage("Your email has been verified. You can now log in.");
      } else {
        setStatus("error");
        setMessage(result.payload || "Verification link is invalid or expired.");
      }
    });
  }, [dispatch, otp]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
      <div className="bg-white rounded-2xl shadow-card border border-violet-100 p-10 text-center max-w-md w-full">
        <div className="text-6xl mb-5">
          {status === "success" ? "✅" : status === "error" ? "⚠️" : "⏳"}
        </div>

        <h1 className="text-2xl font-bold text-gradient-brand mb-3">
          {status === "success"
            ? "Email Verified"
            : status === "error"
            ? "Verification Failed"
            : "Verifying"}
        </h1>

        <p className="text-gray-500 mb-7">{message}</p>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/become-seller")}
          sx={{ px: 5, py: 1.5, fontWeight: "bold" }}
        >
          Go to Seller Login
        </Button>
      </div>
    </div>
  );
};

export default VerifySellerEmail;
