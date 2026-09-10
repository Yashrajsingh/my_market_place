import { Card, Divider } from "@mui/material";
import React, { useEffect } from "react";
import TransactionTable from "./Transaction";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchSellerCommission,
  fetchSellerCommissionOrders,
  fetchSellerReport,
} from "../../../State/seller/SellerSlice";

const Payment = () => {
  const dispatch = useAppDispatch();

  const report = useAppSelector((state: any) => state.seller.report);
  const commission = useAppSelector((state: any) => state.seller.commission);
  const commissionOrders = useAppSelector(
    (state: any) => state.seller.commissionOrders
  );
  const loading = useAppSelector((state: any) => state.seller.loading);

  useEffect(() => {
    dispatch(fetchSellerReport());
    dispatch(fetchSellerCommission());
    dispatch(fetchSellerCommissionOrders());
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

      {/* Commission / Net Earnings Card */}
      <Card className="p-5 shadow-card rounded-2xl border border-violet-100">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-700">Your Earnings</h1>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-200">
            Platform commission: {commission?.commissionRatePercent ?? 0}%
          </span>
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent my-3">
          {loading ? "…" : `₹${commission?.netEarnings ?? 0}`}
        </h1>
        <p className="text-sm text-gray-500 -mt-2 mb-3">
          Net amount you earn after platform commission
        </p>

        <Divider />

        <div className="mt-3 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-gray-800">
              ₹{commission?.grossEarnings ?? 0}
            </p>
            <p className="text-sm text-gray-500">Gross Sales</p>
          </div>
          <div>
            <p className="text-xl font-bold text-rose-600">
              ₹{commission?.platformCommission ?? 0}
            </p>
            <p className="text-sm text-gray-500">Platform Commission</p>
          </div>
        </div>
      </Card>

      {/* Per-order Commission Breakdown */}
      <Card className="p-5 shadow-card rounded-2xl border border-violet-100">
        <h1 className="text-lg font-semibold text-gray-700 mb-4">
          Earnings By Order
        </h1>

        {commissionOrders.length === 0 ? (
          <p className="text-sm text-gray-500">No paid orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2 pr-4">Order</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Gross</th>
                  <th className="py-2 pr-4">Commission</th>
                  <th className="py-2 pr-4">Net Earning</th>
                </tr>
              </thead>
              <tbody>
                {commissionOrders.map((o: any) => (
                  <tr key={o.orderId} className="border-b last:border-0">
                    <td className="py-2 pr-4 font-medium text-gray-800">
                      #{o.orderId}
                    </td>
                    <td className="py-2 pr-4 text-gray-500">
                      {new Date(o.orderDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-2 pr-4">₹{o.grossAmount}</td>
                    <td className="py-2 pr-4 text-rose-600">
                      -₹{o.commissionAmount}
                    </td>
                    <td className="py-2 pr-4 font-semibold text-emerald-600">
                      ₹{o.netAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Transaction Section */}
      <div>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Payment;
