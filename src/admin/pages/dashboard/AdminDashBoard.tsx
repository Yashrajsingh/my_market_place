import React from "react";
import AdminDrawerList from "../../components/AdminDrawerList";
import AdminRoutes from "../../../Routes/AdminRoutes";

const AdminDashBoard = () => {
  const toggleDrawer = () => {};

  return (
    <div className="flex h-[calc(100vh-96px)] bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[280px] flex-shrink-0 bg-white border-r border-violet-100 shadow-xl overflow-y-auto">
        <AdminDrawerList toggleDrawer={toggleDrawer} />
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <AdminRoutes />
      </main>
    </div>
  );
};

export default AdminDashBoard;