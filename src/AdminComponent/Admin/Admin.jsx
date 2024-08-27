import React from 'react'
import { AdminSideBar } from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import { DashBoard } from '../DashBoard/DashBoard'
import { Order } from '../Orders/Order'
import { Menu } from '../Menu/Menu'
import { Events } from '../Events/Events'
import { FoodCategory } from '../FoodCategory/FoodCategory'
import { Ingredients } from '../Ingredients/Ingredients'
import { RestaurantDetails } from './ResaurantDetails'
import { CreateMenuForm } from '../Menu/CreateMenuForm'

export const Admin = () => {
  const handleClose = () => {

  }
  return (
    <div>
      <div className="lg:flex justify-between">
        <div className="">
          <AdminSideBar handleClose={handleClose} />
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path='/' element={<DashBoard/>}></Route>
            <Route path='/orders' element={<Order/>}></Route>
            <Route path='/menu' element={<Menu/>}></Route>
            <Route path='/events' element={<Events/>}></Route>
            <Route path='/category' element={<FoodCategory/>}></Route>
            <Route path='/ingredients' element={<Ingredients/>}></Route>
            <Route path='/details' element={<RestaurantDetails/>}></Route>
            <Route path='/add-menu' element={<CreateMenuForm/>}></Route>

          </Routes>
        </div>
      </div>
    </div>
  )
}
