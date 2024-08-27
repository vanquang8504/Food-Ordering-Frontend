import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card } from '@mui/material';

export const AddressCard = ({ item, showButton }) => {
    const handleSelectAddress = () => {

    }
    return (
        <Card className="flex gap-5 w-64 p-5">
            <HomeIcon />
            <div className="space-y-3 text-gray-500">
                <h1 className='font-semibold text-lg text-white'>Home</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quaerat placeat illo iste mollitia fugit doloremque totam excepturi unde repellat.
                </p>
                {showButton && (<Button variant='outlined' fullWidth onClick={() => handleSelectAddress()}>Select</Button>)}
                
            </div>
        </Card>
    )
}
