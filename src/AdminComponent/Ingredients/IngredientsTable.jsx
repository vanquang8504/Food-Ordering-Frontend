import { Box, Button, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { CreateIngredientForm } from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientCategory, getIngredientsOfRestaurant, updateStockIngredient } from '../../component/State/Ingredients/Action';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const orders = [1, 1, 1, 1, 1]
export const IngredientsTable = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const jwt = localStorage.getItem("jwt")
    const { restaurant, ingredient } = useSelector(store => store)
    useEffect(() => {
        dispatch(getIngredientCategory({
            id: restaurant.usersRestaurant?.id,
            jwt: localStorage.getItem("jwt")
        }))
        dispatch(getIngredientsOfRestaurant({ id: restaurant.usersRestaurant.id, jwt: jwt }))
    }, [])
    const handleUpdateStoke = (id) => {
        dispatch(updateStockIngredient({id, jwt}))
    }
    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    action={
                        <IconButton onClick={handleOpen} aria-label="settings">
                            <CreateIcon />
                        </IconButton>
                    }
                    title={"Ingredients"}
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Availability</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredient.ingredients.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="center">{item.name}</TableCell>
                                    <TableCell align="center">{item.category.name}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => handleUpdateStoke(item.id)}>
                                            {item.inStoke ? "in_stoke" : "out_of_stoke"}
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateIngredientForm />
                </Box>
            </Modal>
        </Box>
    )
}
