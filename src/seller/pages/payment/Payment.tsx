import { Card, Divider } from "@mui/material";
import React, { useEffect } from "react";
import TransactionTable from "./Transaction";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerReport } from "../../../State/seller/SellerSlice";

const Payment = () => {
  const dispatch = useAppDispatch();

  const report = useAppSelector((state: any) => state.seller.report);
  const loading = useAppSelector((state: any) => state.seller.loading);

  useEffect(() => {
    dispatch(fetchSellerReport());
  }, [dispatch]);

  return (
    <div className="p-5 space-y-6">
      {/* Earnings Card */}
      <Card className="p-5 shadow-card rounded-2xl border border-violet-100">
        <h1 className="text-lg font-semibold text-gray-700">Total Earnings</h1>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-rose-500 bg-clip-text text-transparent my-3">
          {loading ? "…" : `₹${report?.totalEarnings ?? 0}`}
        </h1>

        <Divider />

        <div className="mt-3 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-gray-800">{report?.totalOrders ?? 0}</p>
            <p className="text-sm text-gray-500">Total Orders</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">{report?.totalSales ?? 0}</p>
            <p className="text-sm text-gray-500">Items Sold</p>
          </div>
          <div>
            <p className="text-xl font-bold text-rose-600">₹{report?.totalRefunds ?? 0}</p>
            <p className="text-sm text-gray-500">Refunds</p>
          </div>
        </div>
      </Card>

      {/* Transaction Section */}
      <div>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Payment;
