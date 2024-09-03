import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Checkout.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext'
import { useNavigate, useParams } from 'react-router-dom'


export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [onlinePayment, setOnlinePayment] = useState(false)
let {cartId} = useParams()
let {cashOnDelivery} = useContext(CartContext)
let navigate = useNavigate()


async function pay() {
  setLoading(true);
  let url =`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`
  if(onlinePayment){
     url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5174`
  }
  
let res = await cashOnDelivery(url  , formik.initialValues)
if(res.data.status == "success"){
  setLoading(false);
  if(onlinePayment){
    window.location.href = res.data.session.url
  }else{
navigate('/allorders')
  }
  
  
}else{
 
}
console.log(formik.initialValues);
}


let formik = useFormik({
  initialValues:{
    details:'',
    phone:'',
    city:'',
   
  },
  onSubmit:pay
})



















useEffect(() => {
  

  

}, [])




    return (
    <>
    
    <h1 className='text-center text-4xl font-bold my-3'>Checkout Now </h1>
   
     <form onSubmit={formik.handleSubmit}>
     <div className='w-2/3 m-auto'>

<div className="relative z-0 w-full mb-5 group">
  <input  onChange={formik.handleChange} value={formik.values.details} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
  <label htmlFor="details" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details :</label>

{formik.errors.details && formik.touched.details? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
{formik.errors.details}
</div>:null}


</div>

<div className="relative z-0 w-full mb-5 group">
  <input  onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
  <label htmlFor="phone" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone :</label>

{formik.errors.phone && formik.touched.phone? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
{formik.errors.phone}
</div>:null}


</div>

<div className="relative z-0 w-full mb-5 group">
  <input  onChange={formik.handleChange} value={formik.values.city} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
  <label htmlFor="city" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city :</label>

{formik.errors.city && formik.touched.city? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
{formik.errors.city}
</div>:null}


</div>
<input type="checkbox" id='online' onChange={()=> setOnlinePayment(!onlinePayment)} className='m-2'/>
<label htmlFor="online">Pay online</label>
<button type='submit'  className='bg-emerald-700 rounded-md text-emerald-950 p-2 m-2 w-full'>{loading? <i className='fas fa-spinner fa-spin'></i> : `${ onlinePayment ? 'Pay online' : 'COD'}`}</button>


</div>

     </form>
    
    
    
    
    
    
    
    
    </>
  )
}
