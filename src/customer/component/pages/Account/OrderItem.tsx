import { ElectricBolt } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'
import { Order, OrderItem as OrderItemType } from '../../../../types/OrderTypes'

const statusColors: Record<string, string> = {
  PENDING: "text-yellow-600",
  PLACED: "text-blue-600",
  CONFIRMED: "text-violet-600",
  SHIPPED: "text-violet-600",
  DELIVERED: "text-green-600",
  CANCELLED: "text-red-600",
}

interface OrderItemProps {
  order: Order;
  item: OrderItemType;
}

const OrderItem = ({ order, item }: OrderItemProps) => {
  return (
    <div className='bg-white border rounded-xl shadow-sm p-5'>

      {/* Order Status */}
      <div className='flex items-center gap-4 mb-5'>
        <div>
          <Avatar sx={{ bgcolor: "#0071E3" }}>
            <ElectricBolt />
          </Avatar>
        </div>

        <div>
          <h1 className={`font-bold ${statusColors[order.orderStatus] || "text-gray-600"}`}>
            {order.orderStatus}
          </h1>
          <p className='text-sm text-gray-500'>
            Arriving By {new Date(order.deliverDate).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className='flex items-center gap-5'>
        <div className='w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center'>
          <img
            className='w-full h-full object-contain rounded-lg'
            src={item.product?.images?.[0]}
            alt={item.product?.title}
          />
        </div>

        <div className='space-y-2'>
          <h1 className='text-lg font-semibold'>{item.product?.title}</h1>
          <p className='text-gray-500'>Qty: {item.quantity} · ₹{item.sellingPrice}</p>
          <p>
            <strong>size :</strong> {item.size || "FREE"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
