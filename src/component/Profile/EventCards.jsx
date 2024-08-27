import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCards = () => {
  return (
    <div>
        <Card sx={{width : 345}}>

            <CardMedia sx={{height : 345}} image='https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=600'></CardMedia>
            <CardContent>
                <Typography variant='h5'>
                    Indian Fast Food
                </Typography>
                <Typography variant='body2'>
                    50% off on your first order
                </Typography>
                <div className="py-2 space-y-2">
                    <p>{"mumbai"}</p>
                    <p className='text-sm text-blue-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    <p className='text-sm text-red-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
            </CardContent>
            {false && <CardActions>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>}
        </Card>
    </div>
  )
}
