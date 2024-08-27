import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fectRestaurantOrder, updateOrderStatus } from '../../component/State/RestaurantOrder/Action'

const orderStatus = [
  {label : "Pending", value: "PENDING"},
  {label : "Completed", value: "COMPLETED"},
  {label : "Out For Delivery", value: "OUT_FOR_DELIVERY"},
  {label : "Delivered", value: "DELIVERED"},
]

export const OrderTable = () => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const { restaurant, ingredient, restaurantOrder, menu } = useSelector(store => store)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrderId, setSelectedOrderId] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };
  const handleUpdateOrder = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({orderId, orderStatus, jwt}))
    handleClose()
  }

  useEffect(() => {
    dispatch(fectRestaurantOrder({
      restaurantId: restaurant.usersRestaurant?.id,
      jwt
    }))
  }, [jwt])
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          title={"All Orders"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">image</TableCell>
                <TableCell align="center">Customer</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Ingredients</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="center">
                    <AvatarGroup>
                      {item.items.map(orderItem => <Avatar src={orderItem.food.images[0]} />)}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center">{item.customer?.fullName}</TableCell>
                  <TableCell align="center">{item.totalAmount}</TableCell>
                  <TableCell align="center">{item.items.map(
                    orderItem => <p>{orderItem.food?.name}</p>
                  )}</TableCell>
                  <TableCell align="center">
                    {item.items.map(orderItem => <div>
                      {orderItem.ingredients.map(ingredient => <Chip label={ingredient} />)}
                    </div>)}
                  </TableCell>
                  <TableCell align="center">{item.orderStatus}</TableCell>
                  <TableCell align='center'>
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(event) => handleClick(event, item.id)}
                    >
                      Update
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open && selectedOrderId === item.id}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      {orderStatus.map(status => <MenuItem onClick={() => handleUpdateOrder(item.id, status.value )}>{status.label}</MenuItem>)}
                    </Menu>
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
