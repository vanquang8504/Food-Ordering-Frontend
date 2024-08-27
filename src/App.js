import logo from './logo.svg';
import './App.css';
import { Navbar } from './component/navbar/Navbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import { Home } from './component/Home/Home';
import { RestaurantDetail } from './component/Restaurant/RestaurantDetail';
import Cart from './component/Cart/Cart';
import Profile from './component/Profile/Profile';
import { CustomerRouter } from './Routers/CustomerRouter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentication/Action';
import { findCart } from './component/State/Cart/Action';
import { Routers } from './Routers/Routers';
import { getRestaurantByUserId } from './component/State/Restaurant/Actions';

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector(store => store)

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt))
    dispatch(findCart(jwt))
  }, [auth.jwt]);
  useEffect(() => {
     dispatch(getRestaurantByUserId(auth.jwt || jwt))
  },[auth.user])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
    
      <Routers />

    </ThemeProvider>
  );
}

export default App;
