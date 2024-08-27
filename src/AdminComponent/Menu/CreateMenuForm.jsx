import { AddPhotoAlternate } from '@mui/icons-material';
import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from '../Admin/util/UploadToCloudaniry';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem } from '../../component/State/Menu/Action';
import { getIngredientCategory, getIngredientsOfRestaurant } from '../../component/State/Ingredients/Action';

// const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         width: 250,
//       },
//     },
//   };

const initialValues = {
    name: "",
    description: "",
    price: "",
    category: "",
    restaurantId: "",
    vegetarian: true,
    seasonal: false,
    ingredients: [],
    images: []
}
export const CreateMenuForm = () => {
    const dispatch = useDispatch()
    const { restaurant, ingredient } = useSelector(store => store)
    const jwt = localStorage.getItem("jwt")
    const [uploadImage, setUploadImage] = useState(false);
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            values.restaurantId = restaurant.usersRestaurant.id
            dispatch(createMenuItem({menu: values, jwt}))
            console.log("data ---", values)
        }
    });
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setUploadImage(true);
        const image = await uploadImageToCloudinary(file);
        formik.setFieldValue('images', [...formik.values.images, image]);
        setUploadImage(false);
    }
    const handleRemoveImage = (index) => {
        const updatedImages = [...formik.values.images]
        updatedImages.splice(index, 1);
        formik.setFieldValue('images', updatedImages);
    }
    
    useEffect(() => {
        dispatch(getIngredientCategory({
            id: restaurant.usersRestaurant?.id,
            jwt
        }))
        dispatch(getIngredientsOfRestaurant({ id: restaurant.usersRestaurant.id, jwt}))
    }, [])
    return (
        <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
            <div className="lg:max-w-4xl">
                <h1 className='font-bold text-2xl text-center py-2'>Add New Menu</h1>
                <form onSubmit={formik.handleSubmit} className='space-y-4'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className='flex flex-wrap gap-5'>
                            <input
                                type="file"
                                accept='image/*'
                                id='fileInput'
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <label htmlFor="fileInput" className='relative'>
                                <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                                    <AddPhotoAlternate className='text-white'></AddPhotoAlternate>
                                </span>
                                {
                                    uploadImage && <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                                        <CircularProgress />
                                    </div>
                                }
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {formik.values.images.map((image, index) => <div className='relative'>
                                    <img src={image} alt="" className='w-24 h-24 object-cover' key={index} />
                                    <IconButton size='small' sx={{ position: 'absolute', top: 0, right: 0, outline: 'none' }} onClick={() => handleRemoveImage(index)}>
                                        <CloseIcon sx={{ fontSize: "1rem" }} />
                                    </IconButton>
                                </div>)}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='name'
                                name='name'
                                label='Name'
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='description'
                                name='description'
                                label='Description'
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id='price'
                                name='price'
                                label='Price'
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.price}
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formik.values.category}
                                    label="Category"
                                    onChange={formik.handleChange}
                                    name='category'
                                >
                                    {ingredient.category?.map(item => <MenuItem value={item}>{item.name}</MenuItem>)}
                                    
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    name='ingredients'
                                    multiple
                                    value={formik.values.ingredients}
                                    onChange={formik.handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value.id} label={value.name} />
                                            ))}
                                        </Box>
                                    )}
                                // MenuProps={MenuProps}
                                >
                                    {ingredient.ingredients?.map((item, index) => (
                                        <MenuItem
                                            key={item.id}
                                            value={item}

                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Is Vegetarian</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="vegetarian"
                                    value={formik.values.vegetarian}
                                    label="Is Vegetarian"
                                    onChange={formik.handleChange}
                                    name='vegetarian'
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Is Seasonal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formik.values.seasonal}
                                    label="Is Seasonal"
                                    onChange={formik.handleChange}
                                    name='seasonal'
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button variant='contained' color='primary' type='submit'>Create Menu</Button>
                </form>
            </div>

        </div>
    )
}

