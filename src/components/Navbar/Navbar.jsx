import  { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext'
import logo from '../../assets/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { Flowbite } from 'flowbite-react'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@emotion/react'



export default function Navbar(props) {
  const drawerWidth = 240;
  const navItems = ['Home', 'About', 'Contact'];

  let { cartItemsNo } = useContext(CartContext)
  let { userLogin, setuserLogin } = useContext(UserContext)
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem('userToken');
    setuserLogin(null);
    navigate('/login')
  }


  
  
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };
  
   
    const container = window !== undefined ? () => window().document.body : undefined;
 

  return (
    <>







    <Box sx={{ display: 'flex'  }} >
      <CssBaseline />
      <AppBar component="nav" sx={{ background:'#46c7a4' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display:'block'}}
          >
           <Link to='' className="flex items-center">
            <img src={logo} className="" alt="Logo" />
          </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            
              <Button  sx={{ color: '#fff'}}>
              {userLogin !== null ? <>
                 <ul className="font-medium flex flex-col rounded-lg ms-10 p-4 pb-0 md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              
              <li>
                <Link to='' className="block py-1 px-1 text-gray-900  rounded-xl hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent " aria-current="page">Home</Link>
              </li>
              <li>
                <Link to='cart' className="block py-1 px-1 text-gray-900 rounded-xl hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">Cart</Link>
              </li>
              <li>
                <Link to='products' className="block py-1 px-1 text-gray-900 rounded-xl hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">Products</Link>
              </li>
              <li>
                <Link to='brands' className="block py-1 px-1 text-gray-900 rounded-xl hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">Brands</Link>
              </li>
              <li>
                <Link to='categories' className="block py-1 px-1 text-gray-900 rounded-xl hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">Category</Link>
              </li>
              <li>
              <Link to='wishlist' className="block py-1 px-1 text-gray-900 rounded-xl hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">Wishlist</Link>

              </li>
              <li className='text-2xl text-emerald-700 relative '>
              <i className="fa-solid fa-cart-shopping"></i>
                <div className="absolute bottom-4 left-5 rounded-full w-8 h-8 text-center">{cartItemsNo}</div>
            </li>
              </ul>
              </> : null}
              <ul className="md:ms-auto font-medium flex flex-col rounded-lg justify-center items-center  p-4 md:p-0 pt-0  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className=' flex md:flex-row items-center text-center py-1'>
                <div className='w-8 h-8 rounded-full mx-1 hover:bg-emerald-600 cursor-pointer'><i className=" translate-y-1/3 fab mx-2 fa-facebook"></i></div>
                <div className='w-8 h-8 rounded-full mx-1 hover:bg-emerald-600 cursor-pointer'><i className=' translate-y-1/3 fab mx-2 fa-twitter'></i></div>
                <div className='w-8 h-8 rounded-full mx-1 hover:bg-emerald-600 cursor-pointer'><i className=' translate-y-1/3 fab mx-2 fa-instagram'></i></div>
                <div className='w-8 h-8 rounded-full mx-1 hover:bg-emerald-600 cursor-pointer'><i className=' translate-y-1/3 fab mx-2 fa-youtube'></i></div>
                <div className='w-8 h-8 rounded-full mx-1 hover:bg-emerald-600 cursor-pointer'><i className=' translate-y-1/3 fab mx-2 fa-tiktok'></i></div>
                
            
              </li>
              



              {userLogin === null ? <>
                <li >
                  <Link className='block py-2 px-3   text-gray-900 rounded hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent   ' to='login'>Login</Link>
                </li>
                <li >
                  <Link className='block py-2 px-3   text-gray-900 rounded hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ' to='register'>Register</Link>
                </li>

              </> : <li onClick={logOut}>
                <span className='block py-2 px-3  cursor-pointer text-gray-900 rounded hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent '>Logout</span>
              </li>}




            </ul>
              </Button>
            
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
      
          onClose={handleDrawerToggle}
          
          ModalProps={{
            keepMounted: true, 
            
            
          }}
         
          sx={{
            
            width: drawerWidth,
           
            display:'flex',
            flexDirection:'column',
            marginRight:'auto',
            background:'#46c7a4',
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
            
          }}
        >
          
<Box  sx={{
            display:'flex',flexDirection:'column', background:'#46c7a4'
            }}>
              
<Typography
            variant="h6"
            component="div"
            sx={{  display: 'block'  }}
          >
           <Link to='' className="flex items-center">
            <img src={logo}  alt="Logo" />
          </Link>
          </Typography>
          <Box sx={{ display: 'flex'  ,flexDirection:'column' }}>
            
              <Button  sx={{ color: '#fff', display:'flex' ,flexDirection:'column', background:'#46c7a4' , textAlign:'start'}}>
               
              {userLogin !== null ? <>
                 <ul className="font-medium flex flex-col rounded-lg me-auto  py-4  mt-4   rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              
              <li>
                <Link to='' className="block text-lg font-bold py-1 px-1 my-1 text-gray-900  rounded-xl hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent " aria-current="page">Home</Link>
              </li>
              <li>
                <Link to='cart' className="block text-lg font-bold py-1 px-1  my-1 text-gray-900 rounded-xl hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">Cart</Link>
              </li>
              <li>
                <Link to='products' className="block text-lg font-bold py-1 px-1  my-1 text-gray-900 rounded-xl hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">Products</Link>
              </li>
              <li>
                <Link to='brands' className="block text-lg font-bold py-1 px-1  my-1 text-gray-900 rounded-xl hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">Brands</Link>
              </li>
              <li>
                <Link to='categories' className="block text-lg font-bold py-1 px-1  my-1 text-gray-900 rounded-xl hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">Category</Link>
              </li>
              <li>
              <Link to='wishlist' className="block text-lg font-bold py-1 px-1  my-1 text-gray-900 rounded-xl hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">Wishlist</Link>

              </li>
              <li className='text-2xl text-emerald-700 relative  my-1'>
              <i className="fa-solid fa-cart-shopping"></i>
                <div className="absolute bottom-4 left-5 rounded-full w-8 h-8 text-center">{cartItemsNo}</div>
            </li>
              </ul>
              </> : null}
              <ul className="me-auto font-bold text-xl mt-2 flex flex-col rounded-lg justify-center items-center  p-2  md:flex-row md:space-x-8 rtl:space-x-reverse   dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className=' flex  items-center text-center py-1 mb-2'>
                <div className='w-8 h-8 rounded-full mx-1 hover:bg-emerald-600 cursor-pointer'><i className=" translate-y-1/3 fab mx-2 fa-facebook"></i></div>
                <div className='w-8 h-8 rounded-full mx-1 hover:bg-emerald-600 cursor-pointer'><i className=' translate-y-1/3 fab mx-2 fa-twitter'></i></div>
                <div className='w-8 h-8 rounded-full mx-1 hover:bg-emerald-600 cursor-pointer'><i className=' translate-y-1/3 fab mx-2 fa-instagram'></i></div>
                <div className='w-8 h-8 rounded-full mx-1 hover:bg-emerald-600 cursor-pointer'><i className=' translate-y-1/3 fab mx-2 fa-youtube'></i></div>
                <div className='w-8 h-8 rounded-full mx-1 hover:bg-emerald-600 cursor-pointer'><i className=' translate-y-1/3 fab mx-2 fa-tiktok'></i></div>
                
            
              </li>
              



              {userLogin === null ? <>
                <li >
                  <Link className='block py-2 px-3 mt-2  text-gray-900 rounded hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent   ' to='login'>Login</Link>
                </li>
                <li >
                  <Link className='block py-2 px-3  mt-2 text-gray-900 rounded hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ' to='register'>Register</Link>
                </li>

              </> : <li onClick={logOut}>
                <span className=' py-2 px-3 mt-2 cursor-pointer text-gray-900 rounded hover:bg-emerald-700 md:hover:bg-emerald-700 md:border-0 md:hover:text-white  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent '>Logout</span>
              </li>}




            </ul>
              </Button>
              </Box>
          </Box>
          
        </Drawer>
      </nav>
      
    </Box>
  







    








    </>
  )
}
