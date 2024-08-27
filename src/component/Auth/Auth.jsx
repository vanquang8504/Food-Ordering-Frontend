import { Box, Modal } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { style } from '../Cart/Cart';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';

export const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleOnClose = function(){
        navigate("/")
    }
    return (
        <div>
            <div className="">
                <Modal open={location.pathname === "/account/register" || location.pathname === "/account/login"} onClose={handleOnClose}>
                <Box sx={style}>
                    {location.pathname === "/account/register" ? <RegisterForm /> : <LoginForm />}
                </Box>

                </Modal>
            </div>
        </div>
    )
}
