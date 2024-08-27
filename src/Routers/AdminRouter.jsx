import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreateRestaurantForm } from '../AdminComponent/CreateRstaurantForm/CreateRestaurantForm'
import { Admin } from '../AdminComponent/Admin/Admin'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantByUserId } from '../component/State/Restaurant/Actions'

export const AdminRouter = () => {
  const {restaurant} = useSelector(store => store)
  
  return (
    <div>
        <Routes>
            <Route path='/*' element={!restaurant.usersRestaurant ? <CreateRestaurantForm/> : <Admin/>}>

            </Route>
        </Routes>
    </div>
  )
}
