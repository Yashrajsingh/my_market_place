import React from "react";
import {
  Inventory,
  ShoppingBag,
  AccountBalanceWallet,
  TrendingUp,
} from "@mui/icons-material";

const stats = [
  {
    label: "Total Sales",
    value: "₹1,24,500",
    icon: <TrendingUp />,
    gradient: "from-violet-600 to-fuchsia-500",
  },
  {
    label: "Orders",
    value: "342",
    icon: <ShoppingBag />,
    gradient: "from-rose-500 to-orange-400",
  },
  {
    label: "Products",
    value: "58",
    icon: <Inventory />,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    label: "Earnings",
    value: "₹11,164",
    icon: <AccountBalanceWallet />,
    gradient: "from-emerald-500 to-teal-500",
  },
];

const DashBoard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-2xl bg-gradient-to-br from-[#1B0F33] via-[#2B163F] to-[#3B0F35] text-white p-6 md:p-8 shadow-card relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-fuchsia-500/20 blur-2xl" />
        <h1 className="text-2xl md:text-3xl font-extrabold relative z-10">
          Welcome back, Seller 👋
        </h1>
        <p className="text-white/70 mt-2 relative z-10">
          Here's how your store is performing today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 p-5 border border-violet-100"
          >
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${stat.gradient} shadow-brand`}
            >
              {stat.icon}
            </div>

            <p className="text-2xl font-extrabold text-gray-800 mt-4">
              {stat.value}
            </p>

            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Placeholder content area */}
      <div className="bg-white rounded-2xl shadow-card border border-violet-100 p-6 min-h-[240px] flex items-center justify-center text-gray-400">
        📊 Sales analytics will appear here
      </div>
    </div>
  );
};

export default DashBoard;
