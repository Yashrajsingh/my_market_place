import React from 'react'
import { Routes, useLocation, useNavigate , Route } from 'react-router-dom'
import Orders from './Orders'
import OrderDetails from './OrderDetails'
import UserDetails from './UserDetails'
import UserAddressCard from './UserAddressCard'
import Addresses from './Addresses'

const Account = () => {

    const menu = [
        {name: "orders", path:"/account/orders"},
        {name:"profile" ,path:"/account/profile"},
        {name:"savedCards", path:"/account/savedcards"},
        {name :"Addresses", path:"/account/addresses"},
        {name:"LogOut" , path:"/"}
    ]

    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (item:any) => navigate(item.path);

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
    </div>
  )
}

export default Account