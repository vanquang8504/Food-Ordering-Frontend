import { Button, Card } from '@mui/material'
import React from 'react'

export const OrderCards = ({item, order}) => {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className="flex items-center space-x-5">
            <img className='h-16 w-16' src={item.food.images[0]} alt="" />
            <div className="">
            <p>{item.food.name}</p>
            <p>${item.totalPrice}</p>
        </div>
        </div>
        <div className="">
            <Button className='cursor-not-allowed'>{order.orderStatus}</Button>
        </div>

    </Card>
  )
}
