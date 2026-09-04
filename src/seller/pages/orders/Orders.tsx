import React from 'react'
import OrderTable from './OrderTable'

const Orders = () => {
  return (
    <div className="w-full space-y-6">
      <div className="bg-white shadow-card rounded-2xl px-6 py-4 border border-violet-100">
        <h1 className="text-2xl md:text-3xl font-bold text-gradient-brand">
          All Orders
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Manage and track all customer orders
        </p>
      </div>

      <div className="bg-white shadow-card rounded-2xl p-4 md:p-6 border border-violet-100">
        <OrderTable />
      </div>
    </div>
  )
}

export default Orders