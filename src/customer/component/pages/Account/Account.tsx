import React, { useState } from 'react'
import { Routes, useLocation, useNavigate , Route } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import Orders from './Orders'
import OrderDetails from './OrderDetails'
import UserDetails from './UserDetails'
import UserAddressCard from './UserAddressCard'
import Addresses from './Addresses'
import { useAppDispatch } from '../../../../State/Store'
import { logout } from '../../../../State/AuthSlice'

const Account = () => {

    const menu = [
        {name: "orders", path:"/account/orders"},
        {name:"profile" ,path:"/account/profile"},
        {name:"savedCards", path:"/account/savedcards"},
        {name :"Addresses", path:"/account/addresses"},
        {name:"LogOut" , path:"/", isLogout: true}
    ]

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const handleClick = (item:any) => {
      if (item.isLogout) {
        setLogoutDialogOpen(true);
        return;
      }

      navigate(item.path);
    }

    const handleConfirmLogout = async () => {
      setLogoutDialogOpen(false);

      await dispatch(logout(undefined));

      navigate("/");
      window.location.reload();
    }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='bg-white rounded-2xl shadow-card border border-violet-100 overflow-hidden'>
        <h1 className='text-2xl font-bold px-6 py-4 text-gradient-brand'>My Account</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mt-5'>
        <section className='md:col-span-1 bg-white rounded-2xl shadow-card border border-violet-100 p-4'>
            {
                menu.map((item) => (
                    <div
                      onClick={() => handleClick(item)}
                      key={item.name}
                      className={`${
                        item.path === location.pathname
                          ? "bg-gradient-to-r from-violet-600 to-rose-500 text-white shadow-brand"
                          : "hover:bg-violet-50 hover:text-violet-700"
                      } py-3 px-4 cursor-pointer rounded-xl transition-all duration-200 font-medium capitalize`}
                    >
                        <span className='block w-full'>
                          {item.name}
                        </span>
                    </div>
                ))
            }
        </section>

        <section className='md:col-span-3 bg-white rounded-2xl shadow-card border border-violet-100 p-6 min-h-[500px]'>
          <Routes>
            <Route path = '/'  element = {<UserDetails/>}/>
            <Route path = '/profile'  element = {<UserDetails/>}/>
            <Route path = '/orders'  element = {<Orders/>}/>
            <Route path = '/order/:orderId/:orderItemId'  element = {<OrderDetails/>}/>
            <Route path = '/addresses'  element = {<Addresses/>}/>
          </Routes>
        </section>
      </div>

      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Log out?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out of your account?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setLogoutDialogOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleConfirmLogout}
            sx={{
              backgroundColor: "#FF3B30",
              "&:hover": { backgroundColor: "#D70015" },
            }}
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Account