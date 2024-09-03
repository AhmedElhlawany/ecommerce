


import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'

import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import React, { Suspense, lazy, useContext, useEffect } from 'react'
import { CounterContextProvider } from './Context/CounterContext'
import { UserContextProvider } from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CategoryProducts from './components/CategoryProducts/CategoryProducts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider, { CartContext } from './Context/CartContext'
import toast, { Toaster } from 'react-hot-toast'

import Password from './components/Password/Password'

import ResetCode from './components/ResetPassword/ResetCode'
import NewPassword from './components/NewPassword/NewPassword'


let query = new QueryClient();


let Home = lazy(()=> import('./components/Home/Home'))
let Categories = lazy(()=> import('./components/Categories/Categories'))
let Brands = lazy(()=> import('./components/Brands/Brands'))
let Cart = lazy(()=> import('./components/Cart/Cart'))
let Products = lazy(()=> import('./components/Products/Products'))
let Checkout = lazy(()=> import('./components/Checkout/Checkout'))
let Orders = lazy(()=> import('./components/Orders/Orders'))
let Wishlist = lazy(()=> import('./components/Wishlist/Wishlist'))






let x = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute>
        <Suspense><Home/> </Suspense>

      </ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Suspense><Categories /></Suspense></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Suspense><Brands /></Suspense></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Suspense><Cart /></Suspense></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Suspense><Products /></Suspense></ProtectedRoute> },
      { path: 'productdetails/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'checkout/:cartId', element: <ProtectedRoute><Suspense><Checkout/></Suspense></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Suspense><Orders/></Suspense></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Suspense><Wishlist/></Suspense></ProtectedRoute> },
      { path: 'forgotPassword', element: <Password/> },
      { path: 'reset', element: <ResetCode/> },
      { path: 'newpassword', element: <NewPassword/> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> },
    ]
  }




])
function App() {

let {getLoggedUserCart , setCartItemsNo} = useContext(CartContext)

  async function getCartItem(){
    let response = await getLoggedUserCart();
    setCartItemsNo(response?.data?.numOfCartItems)
  
  }
useEffect(() => {
  getCartItem()

 
}, [])


  return (<QueryClientProvider client={query}>
    <UserContextProvider>
      <CounterContextProvider>
        
        <RouterProvider router={x}></RouterProvider>
        <ReactQueryDevtools/>
        <Toaster/>
        
      </CounterContextProvider>
    </UserContextProvider>

  </QueryClientProvider>



  )
}

export default App
