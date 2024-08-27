import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { AddReaction } from '@mui/icons-material';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../State/Authentication/Action';



const menu = [
    {
        title: "Orders",
        icon: <ShoppingBagIcon />
    },
    {
        title: "Favorites",
        icon: <FavoriteIcon />
    },
    {
        title: "Address",
        icon: <AddReaction />
    },
    {
        title: "Payments",
        icon: <AccountBalanceWalletIcon />
    },
    {
        title: "Notification",
        icon: <NotificationsActiveIcon />
    },
    {
        title: "Events",
        icon: <EventIcon />
    },
    {
        title: "Logout",
        icon: <LogoutIcon />
    }
]

export const ProfileNavigation = ({ open, handleColose }) => {
    const isSmallCreen = useMediaQuery("(max-with: 1080)");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            dispatch(logOut());
            navigate("/");
        } else {
            navigate(`/my-profile/${item.title.toLowerCase()}`)
        }
    }
    return (
        <div>
            <Drawer
                anchor='left'
                open={open}
                onClose={handleColose}
                variant={isSmallCreen ? 'temporary' : 'permanent'}
                sx={{ zIndex: 1 }}>
                <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-16">
                    {menu.map((item, i) => <>
                        <div onClick={() => handleNavigate(item)} className="px-5 flex items-center space-x-5 cursor-pointer">
                            {item.icon}
                            <span>{item.title}</span>
                        </div>
                        {i !== menu.length - 1 && <Divider />}
                    </>)}
                </div>

            </Drawer>
        </div>
    )
}
