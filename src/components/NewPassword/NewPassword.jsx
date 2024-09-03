import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'






export default function NewPassword() {
 

 
const [isLoading, setIsLoading] = useState(false)
  let regex = Yup.object().shape({
    email:Yup.string().email('email is invalid').required('email is required'),
    newPassword:Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'password in not valid').required('password is required'),
  })
let navigate = useNavigate();


  async function handNewPassord(formValues){

  try {setIsLoading(true);
  let {data} =  await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , formValues)
    console.log(data);
    setIsLoading(false);
    if(data.token){
      navigate('/login')
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);

  }
 
  
  

}
let formik = useFormik({
  initialValues:{
   
    email:'',
    newPassword:'',
   
  },validationSchema:regex,
  onSubmit:handNewPassord
})




    return (
    <>
    
    <div className='max-w-xl mx-auto '>
      <h2 className='text-2xl font-bold my-6'>Enter your new password</h2>
    <form onSubmit={formik.handleSubmit}>
  

  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="logemail" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="logemail" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email :</label>
      {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {formik.errors.email}
</div>:null}
  
  </div>

 
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your newPassword :</label>
      {formik.errors.newPassword && formik.touched.newPassword? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {formik.errors.newPassword}
</div>:null}
  </div>

 


 


<div className="flex items-center">
<button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
  
  {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Submit'}
  
   </button>
  
</div>



    </form>
    </div>
    </>
  )
}
