import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import { Payment } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import {
  cancelOrder,
  fetchOrderById,
  selectOrder,
  selectOrderLoading,
} from "../../../../State/customer/OrderSlice";

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderId, orderItemId } = useParams();

  const order = useAppSelector(selectOrder);
  const loading = useAppSelector(selectOrderLoading);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(Number(orderId)));
    }
  }, [orderId, dispatch]);

  if (loading || !order) {
    return (
      <Box className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <p className="text-violet-600 font-semibold">Loading order...</p>
      </Box>
    );
  }

  const item =
    order.orderItems.find((i) => i.id === Number(orderItemId)) ||
    order.orderItems[0];

  const orderStatus = order.orderStatus;
  const canCancel = ["PENDING", "PLACED", "CONFIRMED", "SHIPPED"].includes(orderStatus);

  const savedAmount = item ? item.mrpPrice - item.sellingPrice : 0;

  const handleCancelOrder = () => {
    setCancelDialogOpen(true);
  };

  const handleConfirmCancelOrder = () => {
    setCancelDialogOpen(false);
    dispatch(cancelOrder(order.id));
  };

  return (
    <Box className="min-h-screen bg-gray-100 p-6 space-y-6">
      {/* Product Section */}
      <section className="bg-white rounded-2xl shadow-card border border-violet-100 p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          className="w-48 h-48 object-contain rounded-lg border bg-gray-50 p-3"
          src={item?.product?.images?.[0]}
          alt={item?.product?.title}
        />

        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-bold text-gray-800">
            {item?.product?.title}
          </h1>

          <p className="text-gray-500">
            {item?.product?.description}
          </p>

          <p className="text-xl font-semibold text-rose-600">₹{item?.sellingPrice}</p>

          <p className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
            Order Status: {orderStatus}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/account/orders")}
          >
            Back to Orders
          </Button>

          {canCancel && (
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </Button>
          )}
        </div>
      </section>

      {/* Order Tracking */}
      <section className="bg-white rounded-2xl shadow-card border border-violet-100 p-6">
        <h1 className="text-xl font-bold mb-6 text-gradient-brand">Order Tracking</h1>
        <OrderStepper orderStatus={orderStatus} />
      </section>

      {/* Delivery Address */}
      <div className="bg-white rounded-2xl shadow-card border border-violet-100 p-6">
        <h1 className="text-xl font-bold mb-4">Delivery Address</h1>

        <div className="space-y-3">
          <div>
            <p className="font-semibold text-lg">{order.shippingAddress?.name}</p>
            <Divider className="my-2" />
            <p className="text-gray-600">{order.shippingAddress?.mobile}</p>
          </div>

          <p className="text-gray-700">
            {order.shippingAddress?.locality}, {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pinCode}
          </p>
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white rounded-2xl shadow-card border border-violet-100 p-6 space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-lg">Total Item Price</p>
            {savedAmount > 0 && (
              <p className="text-sm text-green-600">
                You Saved <span>₹{savedAmount}</span>
              </p>
            )}
          </div>

          <p className="text-xl font-bold text-rose-600">₹{order.totalSellingPrice}</p>
        </div>

        <div className="flex items-center gap-3">
          <Payment className={order.paymentStatus === "COMPLETED" ? "text-green-600" : "text-amber-500"} />
          <p className="font-medium">Payment: {order.paymentStatus}</p>
        </div>

        <Divider />

        {item?.product?.seller?.businessDetails?.businessName && (
          <div>
            <p>
              <strong>Sold By:</strong> {item.product.seller.businessDetails.businessName}
            </p>
          </div>
        )}

        {canCancel && (
          <Button
            disabled={false}
            variant="outlined"
            fullWidth
            color="error"
            sx={{ py: "0.7rem" }}
            onClick={handleCancelOrder}
          >
            Cancel Order
          </Button>
        )}
      </div>

      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Cancel this order?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this order? This can't be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setCancelDialogOpen(false)}>
            Keep Order
          </Button>

          <Button
            variant="contained"
            onClick={handleConfirmCancelOrder}
            sx={{
              backgroundColor: "#FF3B30",
              "&:hover": { backgroundColor: "#D70015" },
            }}
          >
            Cancel Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetails;
