import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellerTable from '../customer/Seller/SellerTable'
import GridTable from '../admin/pages/homepage/GridTable'
import AddNewCouponForm from '../admin/pages/coupon/AddNewCouponForm'
import Coupon from '../admin/pages/coupon/Coupon'
import ElectronicTable from '../admin/pages/homepage/ElectronicTable'
import ShopByCategory from '../admin/pages/homepage/ShopByCategory'
import Deal from '../admin/pages/homepage/Deal'

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SellerTable/>}/>
        <Route path="/coupon" element={<Coupon/>}/>
        <Route path="/add-coupon" element={<AddNewCouponForm/>}/>
        <Route path="/home-grid" element={<GridTable/>}/>
        <Route path="/electric-category" element={<ElectronicTable/>}/>
        <Route path="/shopbycategory" element={<ShopByCategory/>}/>
        <Route path="/deal" element={<Deal/>}/>
      </Routes>
    </div>
  )
}

export default AdminRoutes
