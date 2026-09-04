import React from "react";
import { ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../State/Store";
import { logout } from "../State/AuthSlice";

interface MenuItem {
  name: string;
  path: string;
  icon: any;
  activeIcon: any;
}

interface DrawerListProps {
  menu: MenuItem[];
  menu2: MenuItem[];
  toggleDrawer: () => void;
}

const DrawerList = ({
  menu,
  menu2,
  toggleDrawer,
}: DrawerListProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logout(navigate));
  };

  return (
    <div className="w-full md:w-[260px] lg:w-[280px] p-4 bg-white h-full shadow-xl border-r border-gray-100">

      <div>
        {menu.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(item.path);
              toggleDrawer();
            }}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
              location.pathname === item.path
                ? "bg-violet-100 text-violet-700"
                : "hover:bg-gray-100"
            }`}
          >
            <ListItemIcon>
              {location.pathname === item.path
                ? item.activeIcon
                : item.icon}
            </ListItemIcon>

            <ListItemText primary={item.name} />
          </div>
        ))}
      </div>

      <hr className="my-3" />

      <div>
        {menu2.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              toggleDrawer();

              if (item.name === "Logout") {
                handleLogout();
              } else {
                navigate(item.path);
              }
            }}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
              location.pathname === item.path
                ? "bg-violet-100 text-violet-700"
                : "hover:bg-gray-100"
            }`}
          >
            <ListItemIcon>
              {location.pathname === item.path
                ? item.activeIcon
                : item.icon}
            </ListItemIcon>

            <ListItemText primary={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawerList;