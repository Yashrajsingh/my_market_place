import React from "react";
import DrawerList from "../../component/DrawerList";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";

import {
  Category,
  ElectricBolt,
  IntegrationInstructions,
  LocalOffer,
} from "@mui/icons-material";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />,
    activeIcon: <DashboardIcon />,
  },
  {
    name: "Coupons",
    path: "/admin/coupon",
    icon: <IntegrationInstructions />,
    activeIcon: <IntegrationInstructions />,
  },
  {
    name: "Deals",
    path: "/admin/deal",
    icon: <LocalOffer />,
    activeIcon: <LocalOffer />,
  },
  {
    name: "Shop By Category",
    path: "/admin/shopbycategory",
    icon: <Category />,
    activeIcon: <Category />,
  },
  {
    name: "Electronics Category",
    path: "/admin/electric-category",
    icon: <ElectricBolt />,
    activeIcon: <ElectricBolt />,
  },
  {
    name: "Home Page",
    path: "/admin/home-grid",
    icon: <HomeIcon />,
    activeIcon: <HomeIcon />,
  },
  {
    name: "Add Coupon",
    path: "/admin/add-coupon",
    icon: <AddIcon />,
    activeIcon: <AddIcon />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBoxIcon />,
    activeIcon: <AccountBoxIcon />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <LogoutIcon />,
    activeIcon: <LogoutIcon />,
  },
];

const AdminDrawerList = ({ toggleDrawer }: any) => {
  return (
    <DrawerList
      menu={menu}
      menu2={menu2}
      toggleDrawer={toggleDrawer}
    />
  );
};

export default AdminDrawerList;