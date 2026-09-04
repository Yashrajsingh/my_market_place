import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import SellerDashBoard from '../seller/pages/sellerDashBoard/SellerDashBoard'
import Products from '../seller/pages/products/Products'
import AddProducts from '../seller/pages/products/AddProducts'
import Orders from '../seller/pages/orders/Orders'
import Profile from '../seller/pages/Account/Profile'
// import { Payment } from '@mui/icons-material'
import Payment from '../seller/pages/payment/Payment'
import Transaction from '../seller/pages/payment/Transaction'
import DashBoard from '../seller/pages/sellerDashBoard/DashBoard'

const SellerRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<DashBoard/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/add-product' element={<AddProducts/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/inventory' element={<Profile/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/transaction' element={<Transaction/>}/>
      </Routes>
    </div>
  )
}

export default SellerRoutes
