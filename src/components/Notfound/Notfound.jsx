import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Notfound.module.css'
import notfound from '../../assets/error.jpg'
import { Link } from 'react-router-dom'

export default function Notfound() {
const [first, setfirst] = useState(0)
useEffect(() => {
  

  

}, [])




    return (
    <>
    <div className='relative'>
    <img src={notfound} className='w-full rounded-lg' alt="notfound" />
    <button className='bg-black text-4xl font-bold text-emerald-300 p-2 absolute bottom-4 btn-404' ><Link to='/'>Go Home</Link></button>
    </div>
    
    
    </>
  )
}
