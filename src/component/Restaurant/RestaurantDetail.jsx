import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantCategory } from '../State/Restaurant/Actions';
import { getMenuItemByRestaurantId } from '../State/Menu/Action';


const foodTypes = [
    { Label: "All", value: "all" },
    { Label: "Vegetarian only", value: "vegetarian" },
    { Label: "Non-Vegetarian", value: "non_vegetarian" },
    { Label: "Seasonal", value: "seasonal" },
]


export const RestaurantDetail = () => {
    const [foodType, setFoodType] = useState("all")
    const [selectedCategory, setSelectedCategory] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const { auth, restaurant, menu } = useSelector(store => store)
    const { id, city } = useParams()

    const handleFilter = (e) => {
        setFoodType(e.target.value)
        console.log(e.target.value, e.target.name)
    }
    const handleFilterCategory = (e, value) => {
        setSelectedCategory(value)
        console.log(e.target.value, e.target.name)
    }

    console.log("restaurant", restaurant)
    console.log("menu", menu)
    useEffect(() => {
        dispatch(getRestaurantById({ jwt, restaurantId: id }))
        dispatch(getRestaurantCategory({ jwt, restaurantId: id }))
        
    }, [])
    useEffect(() => {
        dispatch(getMenuItemByRestaurantId({
            jwt,
            restaurantId: id,
            vegetarian: foodType === "vegetarian",
            nonveg: foodType === "non_vegetarian",
            seasonal: foodType === "seasonal",
            foodCategory: selectedCategory  
        }))
    },[selectedCategory,foodType])
    return (
        <div className='px-5 lg:px-20'>
            <section>
                <h3 className='text-gray-500 py-2 mt-10'>Home/india/india fast food/3</h3>
                <div className="">
                    <Grid container spacing={2}>
                        <Grid item sx={12} lg={12}>
                            <img className='w-full h-[40vh] object-cover' src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        </Grid>

                        <Grid item sx={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[0]} alt="" />
                        </Grid>

                        <Grid item sx={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[1]} alt="" />
                        </Grid>
                    </Grid>
                </div>
                <div className="pt-5 pb-5">
                    <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>

                    <p className='text-gray-500 mt-1'>{restaurant.restaurant?.description}</p>

                    <div className="space-y-3 mt-3">
                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnIcon />
                            <span>
                                Munbai, Maharstra
                            </span>
                        </p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarTodayIcon />
                            <span>
                                Mon - Sun : 9:00 AM - 9:00 PM (Today)
                            </span>
                        </p>
                    </div>
                </div>
            </section>
            <Divider />
            <section className='pt-[2rem] lg:flex relative'>

                <div className="space-y-10 lg:w-[20%] filter">
                    <div className="box space-y-5 lg:sticky top-28">
                        <div className="">
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Food Type
                            </Typography>

                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name='food_type' value={foodType}>
                                    {foodTypes.map((item) => (
                                        <FormControlLabel
                                            key={item.value}
                                            value={item.value}
                                            control={<Radio />}
                                            label={item.Label} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />

                        <div className="">
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Food Category
                            </Typography>

                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilterCategory} name='food_category' 
                                value={selectedCategory}
                                >
                                    {restaurant.categories.map((item) => (
                                        <FormControlLabel
                                            key={item}
                                            value={item.name}
                                            control={<Radio />}
                                            label={item.name} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>


                    </div>

                </div>
                <div className="space-y-10 lg:w-[80%] lg:pl-10">
                    {menu.menuItems.map(item => <MenuCard item={item}></MenuCard>)}
                </div>

            </section>
        </div>
    )
}
