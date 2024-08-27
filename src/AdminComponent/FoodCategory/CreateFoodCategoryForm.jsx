import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, getRestaurantCategory } from '../../component/State/Restaurant/Actions';

export const CreateFoodCategoryForm = () => {
  const {restaurant} = useSelector(store => store)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    categoryName: '',
    restaurantId: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: formData.categoryName,
      restaurantId: {
        id: 1
      }
    }
    dispatch(createCategoryAction({reqData: data, jwt: localStorage.getItem("jwt")}))
    console.log(data)
  };
  return (
    <div>
      <div className="p-5">
        <h1 className='text-gray-400 text-center text-xl pb-10'>Create Category</h1>
        <form className='space-y-5' onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id='categoryName'
            name='categoryName'
            label='Cusine Type'
            variant='outlined'
            onChange={handleInputChange}
            value={FormData.categoryName}
          ></TextField>

          <Button variant='contained' type='submit'>Create Category</Button>
        </form>
      </div>
    </div>
  )
}
