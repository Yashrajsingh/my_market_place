import React from "react";
import {
  AccountBalanceWallet,
  AccountBox,
  Add,
  Dashboard,
  Inventory,
  Logout,
  Receipt,
  ShoppingBag,
} from "@mui/icons-material";

import DrawerList from "../../../component/DrawerList"; // change to components if your folder is components

const menu = [
  {
    name: "Dashboard",
    path: "/seller",
    icon: <Dashboard />,
    activeIcon: <Dashboard />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBag />,
    activeIcon: <ShoppingBag />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <Inventory />,
    activeIcon: <Inventory />,
  },
  {
    name: "Add Products",
    path: "/seller/add-product",
    icon: <Add />,
    activeIcon: <Add />,
  },
  {
    name: "Payments",
    path: "/seller/payment",
    icon: <AccountBalanceWallet />,
    activeIcon: <AccountBalanceWallet />,
  },
  {
    name: "Transaction",
    path: "/seller/transaction",
    icon: <Receipt />,
    activeIcon: <Receipt />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox />,
    activeIcon: <AccountBox />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout />,
    activeIcon: <Logout />,
  },
];

const SellerDrawerList = ({ toggleDrawer }: { toggleDrawer: any }) => {
  return (
    <div>
      <DrawerList
        menu={menu}
        menu2={menu2}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
};

export default SellerDrawerList;