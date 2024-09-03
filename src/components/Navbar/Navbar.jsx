import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext'
import logo from '../../assets/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'



export default function Navbar() {


  let { cartItemsNo } = useContext(CartContext)
  let { userLogin, setuserLogin } = useContext(UserContext)
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem('userToken');
    setuserLogin(null);
    navigate('/login')
  }




  return (
    <>


      <nav className=" border-gray-200 dark:bg-gray-900 w-full  border rounded-b-lg bg-emerald-300 fixed z-50">
        <div className="w-11/12  flex   md:flex-row items-center px-2  mx-auto p-4">
          <Link to='' className="flex items-center">
            <img src={logo} className="" alt="Logo" />
          </Link>
          <div className="w-full flex flex-col md:flex-row justify-between items-center  md:border-0 border border-red-950 rounded-lg md" id="navbar-default">
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
          </div>
          <button data-collapse-toggle="navbar-default" type="button" className="mb-auto ms-auto inline-flex items-center  p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="true">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </nav>








    </>
  )
}
