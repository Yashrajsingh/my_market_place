import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerTransactions } from "../../../State/seller/SellerSlice";

const TransactionTable = () => {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector((state: any) => state.seller.transactions);
  const loading = useAppSelector((state: any) => state.seller.loading);

  useEffect(() => {
    dispatch(fetchSellerTransactions());
  }, [dispatch]);

  return (
    <div className="bg-white shadow-card rounded-2xl border border-violet-100 p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-gradient-brand">Transactions</h2>

      {loading ? (
        <p className="text-center py-8 text-violet-600 font-semibold">Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center py-8 text-gray-400">No transactions yet</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-violet-50 to-rose-50 text-left">
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item: any) => (
              <tr key={item.id} className="border-b hover:bg-violet-50/50 transition-colors">
                <td className="p-3">TXN{item.id}</td>
                <td className="p-3">{new Date(item.date).toLocaleDateString("en-IN")}</td>
                <td className="p-3">#{item.order?.id}</td>
                <td className="p-3">{item.Customer?.fullName || "—"}</td>
                <td className="p-3 font-medium text-green-600">
                  ₹{item.order?.totalSellingPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionTable;
