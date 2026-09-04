import React from "react";
import {
  CheckCircle,
  FiberManualRecord,
} from "@mui/icons-material";
import { Box } from "@mui/material";

const steps = [
  {
    title: "Order Placed",
    subtitle: "Order received",
    value: "PLACED",
  },
  {
    title: "Confirmed",
    subtitle: "Item packed in dispatch warehouse",
    value: "CONFIRMED",
  },
  {
    title: "Shipped",
    subtitle: "On its way to you",
    value: "SHIPPED",
  },
  {
    title: "Delivered",
    subtitle: "Order delivered",
    value: "DELIVERED",
  },
];

const canceledStep = [
  {
    title: "Order Placed",
    subtitle: "Order received",
    value: "PLACED",
  },
  {
    title: "Order Cancelled",
    subtitle: "This order was cancelled",
    value: "CANCELLED",
  },
];

const OrderStepper = ({ orderStatus }: { orderStatus: string }) => {
  const isCancelled = orderStatus === "CANCELLED";
  const statusStep = isCancelled ? canceledStep : steps;

  // PENDING sits before the first real step; anything else maps 1:1.
  const currentStep = Math.max(
    0,
    statusStep.findIndex((step) => step.value === orderStatus)
  );

  return (
    <Box className="p-5">
      {statusStep.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex gap-4 relative">
            <div className="flex flex-col items-center">
              <Box className="z-10 bg-white">
                {index <= currentStep ? (
                  <CheckCircle
                    className={`${
                      isCancelled && step.value === "CANCELLED"
                        ? "text-red-500"
                        : "text-violet-500"
                    }`}
                  />
                ) : (
                  <FiberManualRecord className="text-gray-400" />
                )}
              </Box>

              {index < statusStep.length - 1 && (
                <div
                  className={`w-[3px] h-20 ${
                    index < currentStep
                      ? "bg-violet-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>

            <div className="flex-1 pb-6">
              <div
                className={`${
                  index === currentStep
                    ? isCancelled
                      ? "bg-red-500 text-white px-4 py-3 rounded-lg shadow"
                      : "bg-gradient-to-r from-violet-600 to-rose-500 text-white px-4 py-3 rounded-lg shadow-brand"
                    : ""
                } w-full`}
              >
                <p className={"font-semibold text-lg"}>
                  {step.title}
                </p>

                <p
                  className={`${
                    index === currentStep
                      ? "text-white"
                      : "text-gray-500"
                  } text-xs`}
                >
                  {step.subtitle}
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default OrderStepper;
