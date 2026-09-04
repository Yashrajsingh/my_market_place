import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderItem from './OrderItem'
import { useAppDispatch, useAppSelector } from '../../../../State/Store'
import {
  fetchOrderHistory,
  selectOrderLoading,
  selectOrders,
} from '../../../../State/customer/OrderSlice'

const Orders = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const orders = useAppSelector(selectOrders)
  const loading = useAppSelector(selectOrderLoading)

  useEffect(() => {
    dispatch(fetchOrderHistory())
  }, [dispatch])

  return (
    <div className='space-y-6'>

      {/* Header */}
      <div className='border-b pb-4'>
        <h1 className='text-2xl font-bold text-gradient-brand'>
          All Orders
        </h1>
        <p className='text-gray-500 mt-1'>
          From Anytime
        </p>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className='text-center py-10 text-violet-600 font-semibold'>
          Loading Orders...
        </div>
      ) : orders.length > 0 ? (
        <div className='space-y-4 max-h-[650px] overflow-y-auto pr-2'>
          {orders.flatMap((order) =>
            order.orderItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/account/order/${order.id}/${item.id}`)}
                className='bg-gray-50 border border-transparent rounded-xl p-4 hover:shadow-card hover:border-violet-200 transition-all duration-300 cursor-pointer'
              >
                <OrderItem order={order} item={item} />
              </div>
            ))
          )}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-16 text-gray-400'>
          <span className='text-5xl mb-3'>📦</span>
          <p className='text-lg font-semibold text-gray-500'>
            You haven't placed any orders yet
          </p>
        </div>
      )}
    </div>
  )
}

export default Orders
