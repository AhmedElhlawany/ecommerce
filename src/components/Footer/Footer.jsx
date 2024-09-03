import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Footer.module.css'


export default function Footer() {
const [first, setfirst] = useState(0)
useEffect(() => {
  

  

}, [])




    return (
    <>
    <div className='bg-emerald-300 p-1'>
      <div className="container my-10">
      <h2 className='mt-5'>
        Get the FreshCart app
      </h2>
      <p>
        We will send you a link, open it on your phone to download the app
      </p>
      <div className='flex flex-wrap my-5 '>
      <div className="relative z-0 w-4/5 mb-5 group">
      <input   type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-700 focus:outline-none focus:ring-0 focus:border-emerald-700 peer" placeholder=" "/>
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emborder-emerald-700 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email :</label>
      

  
  </div>
  <button className='bg-emerald-500 px-2 rounded-md h-10 ms-10'>Share App Link</button>
      </div>




      </div>
    </div>
    
    
    
    
    
    
    </>
  )
}
