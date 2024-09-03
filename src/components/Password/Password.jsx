import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Password.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Password() {
const [first, setfirst] = useState(0)
const [isLoading, setIsLoading] = useState(false)
let navigate = useNavigate();






async function getPassword(formValues){
try {
  setIsLoading(true);
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, formValues)
console.log(data);
if(data.statusMsg=='success'){
  setIsLoading(false);
  navigate('/reset');

}
} catch (error) {
  console.log(error);
  setIsLoading(false);
}
}





let regex = Yup.object().shape({
  email:Yup.string().email('email is invalid').required('email is required'),
})

let formik = useFormik({
  initialValues:{
   
    email:'',
    
   
  },validationSchema:regex,
  onSubmit:getPassword
})


useEffect(() => {
  

}, [])

    return (
    <>
    <h1 className='text-2xl'>Forgot Password :</h1>
    <form onSubmit={formik.handleSubmit} className='w-3/4 m-auto'>

    <div className="relative z-0 w-full my-5 group m-auto">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="fogotemail" className="block py-2.5 px-0 w-3/4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="forgotemail" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email :</label>
      {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {formik.errors.email}
</div>:null}
  
  </div>
  <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
  
  {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Next'}
  
   </button>
    </form>
    

    
    
    
    
    </>
  )
}
