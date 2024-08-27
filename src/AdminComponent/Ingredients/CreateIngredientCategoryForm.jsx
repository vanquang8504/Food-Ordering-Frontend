import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientCategory } from '../../component/State/Ingredients/Action';

export const CreateIngredientCategoryForm = () => {
  const dispatch = useDispatch()
  const {restaurant} = useSelector(store => store)

  const [formData, setFormData] = useState({
    name: ''
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
      name: formData.name,
      restaurantId: restaurant.usersRestaurant.id
    }
    console.log(formData)
    dispatch(createIngredientCategory({data, jwt: localStorage.getItem("jwt")}))
  };
  return (
    <div>
      <div className="p-5">
        <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient Category</h1>
        <form className='space-y-5' onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id='name'
            name='name'
            label='Category'
            variant='outlined'
            onChange={handleInputChange}
            value={formData.name}
          ></TextField>

          <Button variant='contained' type='submit'>Create Category</Button>
        </form>
      </div>
    </div>
  )
}
