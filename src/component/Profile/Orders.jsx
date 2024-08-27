import React, { useEffect } from 'react'
import { OrderCards } from './OrderCards'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getUserOrder } from '../State/Order/Action';

export const Orders = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  
  const {auth, cart, order} = useSelector(store => store);
  useEffect(() => {
    dispatch(getUserOrder(jwt))
  },[auth.jwt])
  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>My orders</h1>
      <div className="space-y-5 w-full lg:w-1/2">
          {order.orders.map(order => order.items.map(item => <OrderCards order={order} item={item} />))}
      </div>

    </div>
  )
}
