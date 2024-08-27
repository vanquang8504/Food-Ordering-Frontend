import { Avatar, Box, Card, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getAllMenuItemByRestaurantId, getMenuItemByRestaurantId } from '../../component/State/Menu/Action';

const orders = [1, 1, 1, 1, 1]
export const MenuTable = () => {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const { restaurant, ingredient, menu } = useSelector(store => store)
    const navigate = useNavigate()

    const handleDeleteFood = (foodId) => {
        dispatch(deleteFoodAction({
            foodId, jwt
        }))
    }

    useEffect(() => {
        dispatch(getAllMenuItemByRestaurantId({
            restaurantId: restaurant.usersRestaurant.id,
            jwt: jwt
        }))
    },[])
    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    action={
                        <IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label="settings">
                            <CreateIcon />
                        </IconButton>
                    }
                    title={"Menu"}
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Ingredients</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Availability</TableCell>
                                <TableCell align="center">Dlete</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menu.menuItems.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="center"><Avatar src={item.images[0]} /></TableCell>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="center">{item.ingredients.map(ingredient => <Chip label={ingredient.name} />)}</TableCell>
                                    <TableCell align="center">${item.price}</TableCell>
                                    <TableCell align="center">{item.available ? "in_stock" : "out_of_stock"}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color='primary' onClick={() => handleDeleteFood(item.id)}>
                                            <Delete></Delete>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

        </Box>
    )
}
