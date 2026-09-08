import React, { useEffect, useState } from "react";
import { Button, Modal, Box, Typography, Alert } from "@mui/material";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../cart/PricingCard";
import { RadioGroup, Radio } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { selectAuth } from "../../../../State/AuthSlice";
import { fetchUserCart } from "../../../../State/customer/CartSlice";
import {
  createOrder,
  selectOrderError,
  selectOrderLoading,
} from "../../../../State/customer/OrderSlice";
import { Address } from "../../../../types/UserTypes";
import { PaymentMethod } from "../../../../types/OrderTypes";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const CheckOut = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectAuth);
  const cart = useAppSelector((state: any) => state.cart.cart);
  const orderLoading = useAppSelector(selectOrderLoading);
  const orderError = useAppSelector(selectOrderError);

  const [open, setOpen] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState<PaymentMethod>("RAZORPAY");

  const [addresses, setAddresses] = useState<Address[]>(user?.addresses || []);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      dispatch(fetchUserCart(jwt));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user?.addresses?.length) {
      setAddresses(user.addresses);
    }
  }, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentGateway(event.target.value as PaymentMethod);
  };

  const handleSaveAddress = (address: Address) => {
    setAddresses((prev) => {
      const updated = [...prev, address];
      setSelectedIndex(updated.length - 1);
      return updated;
    });

    setOpen(false);
  };

  const handleCheckout = () => {
    const selectedAddress = addresses[selectedIndex];

    if (!selectedAddress) return;

    dispatch(
      createOrder({
        paymentMethod: paymentGateway,
        address: selectedAddress,
      })
    ).then((result: any) => {
      const paymentLinkUrl = result.payload?.payment_link_url;

      if (paymentLinkUrl) {
        window.location.href = paymentLinkUrl;
      }
    });
  };

  const subtotal = cart?.totalMrpPrice || 0;
  const discount = cart ? cart.totalMrpPrice - cart.totalSellingPrice : 0;

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-20 lg:px-32 min-h-screen bg-gray-100">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-5 lg:gap-9">

          {/* Left Section - 60% */}
          <div className="col-span-3 space-y-5">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-card border border-violet-100">
              <h1 className="font-semibold text-xl text-gradient-brand">Select Address</h1>

              <Button variant="contained" onClick={handleOpen}>
                Add New Address
              </Button>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-card border border-violet-100">
              <p className="font-semibold text-lg mb-4">Saved Addresses</p>

              {addresses.length > 0 ? (
                <div className="space-y-4">
                  {addresses.map((address, index) => (
                    <AddressCard
                      key={index}
                      address={address}
                      selected={selectedIndex === index}
                      onSelect={() => setSelectedIndex(index)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-6">
                  No saved addresses — add one to continue.
                </p>
              )}
            </div>
          </div>

          {/* Right Section - 40% */}
          <div className="col-span-2">
            <div className="sticky top-5 space-y-4">

              {/* Payment Gateway */}
              <section className="bg-white p-4 rounded-2xl shadow-card border border-violet-100">
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                  Payment Gateway
                </Typography>

                <RadioGroup
                  row
                  value={paymentGateway}
                  onChange={handlePaymentChange}
                  name="payment-method"
                  className="flex gap-3"
                >
                  {/* Razorpay */}
                  <label
                    className={`flex items-center gap-2 border-2 rounded-xl px-3 py-2 cursor-pointer w-[160px] transition-all duration-300 ${
                      paymentGateway === "RAZORPAY"
                        ? "border-violet-500 bg-violet-50 shadow-brand"
                        : "border-gray-200"
                    }`}
                  >
                    <Radio value="RAZORPAY" size="small" />
                    <span className="text-xl font-bold text-[#3395FF]">
                      Razorpay
                    </span>
                  </label>
                </RadioGroup>
              </section>

              <PricingCard
                subtotal={subtotal}
                discount={discount}
                shipping={cart?.totalItem ? 0 : 0}
                platformFees={cart?.totalItem ? 49 : 0}
                couponDiscount={0}
              />

              {orderError && (
                <Alert severity="error">{orderError}</Alert>
              )}

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ py: 1.5 }}
                disabled={
                  orderLoading ||
                  addresses.length === 0 ||
                  !cart?.cartItems?.length
                }
                onClick={handleCheckout}
              >
                {orderLoading ? "Placing Order..." : "Check Out"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Add New Address</Typography>

          <div className="mt-5">
            <AddressForm onSave={handleSaveAddress} />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CheckOut;
