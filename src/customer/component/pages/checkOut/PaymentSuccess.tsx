import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../../../State/Store";
import { confirmPayment } from "../../../../State/customer/OrderSlice";

const PaymentSuccess = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  const [message, setMessage] = useState("Confirming your payment...");

  useEffect(() => {
    const paymentId = searchParams.get("razorpay_payment_id");
    const paymentLinkId = searchParams.get("razorpay_payment_link_id");

    if (!paymentId || !paymentLinkId) {
      setStatus("error");
      setMessage("Missing payment reference. If money was deducted, check your orders page.");
      return;
    }

    dispatch(confirmPayment({ paymentId, paymentLinkId })).then((result: any) => {
      if (result.payload?.message) {
        setStatus("success");
        setMessage("Payment confirmed! Your order has been placed.");
      } else {
        setStatus("error");
        setMessage(result.payload || "Unable to confirm payment.");
      }
    });
  }, [dispatch, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
      <div className="bg-white rounded-2xl shadow-card border border-violet-100 p-10 text-center max-w-md w-full">
        <div className="text-6xl mb-5">
          {status === "success" ? "🎉" : status === "error" ? "⚠️" : "⏳"}
        </div>

        <h1 className="text-2xl font-bold text-gradient-brand mb-3">
          {status === "success"
            ? "Order Placed!"
            : status === "error"
            ? "Payment Issue"
            : "Processing"}
        </h1>

        <p className="text-gray-500 mb-7">{message}</p>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/account/orders")}
          sx={{ px: 5, py: 1.5, fontWeight: "bold" }}
        >
          View My Orders
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
