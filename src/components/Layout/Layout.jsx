import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'

import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'


export default function Layout() {
const [first, setfirst] = useState(0)
useEffect(() => {
  

  

}, [])




    return (
    <>
    <Navbar/>

<div className='bg-emerald-100 p-2'>
      <div className="container mx-auto my-6 mt-32 pt-16 min-h-screen">
        <Outlet></Outlet>
      </div>
      </div>
    
    <Footer/>
    </>
  )
}
