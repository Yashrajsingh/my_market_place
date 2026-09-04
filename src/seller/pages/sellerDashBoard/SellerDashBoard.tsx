import React from "react";
import SellerDrawerList from "../../components/sellerDrawerList/SellerDrawerList";
import SellerRoutes from "../../../Routes/SellerRoutes";

const SellerDashBoard = () => {
  const toggleDrawer = () => {};

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <section className="w-[220px] lg:w-[240px] shrink-0 bg-white shadow-xl h-full overflow-y-auto border-r border-violet-100">
          <SellerDrawerList toggleDrawer={toggleDrawer} />
        </section>

        {/* Main Content */}
        <section className="flex-1 min-w-0 p-4 lg:p-6 overflow-auto">
          <SellerRoutes />
        </section>
      </div>
    </div>
  );
};

export default SellerDashBoard;