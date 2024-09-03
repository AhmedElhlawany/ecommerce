import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import './Home.module.css'


export default function Home() {
const [first, setfirst] = useState(0)
useEffect(() => {
  

  

}, [])




    return (
    <>
    <div className='welcome m-auto text-center  py-10 text-emerald-700 overflow-hidden'>
    
    <h2 className='text-7xl md:text-9xl font-semibold mb-3'>Welcome</h2>
    <p className='text-2xl font-bold'>to your favorite shop</p>
    </div>
    
    <MainSlider/>
    <CategoriesSlider/>
    <RecentProducts/>
    </>
  )
}
