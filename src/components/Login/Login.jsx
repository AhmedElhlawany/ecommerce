import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext'
import { jwtDecode } from 'jwt-decode'





export default function Login() {
  let {setuserLogin,convertToken} = useContext(UserContext);

  const [apiError, setapiError] = useState('')
const [isLoading, setIsLoading] = useState(false)
  let regex = Yup.object().shape({
    email:Yup.string().email('email is invalid').required('email is required'),
    password:Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'password in not valid').required('password is required'),
  })
let navigate = useNavigate();


  async function handleLogin(formValues){
setIsLoading(true);
   await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , formValues)
  .then( (apiResponse) => {
    setIsLoading(false);
    if (apiResponse.data.message === 'success'){
      localStorage.setItem('userToken',apiResponse.data.token);
    setuserLogin(apiResponse.data.token)
    convertToken()
      navigate('/');
    };})
  .catch((apiResponse) => {
    setIsLoading(false);
    setapiError(apiResponse?.response?.data?.message)
   
  })
 
  
  

}
let formik = useFormik({
  initialValues:{
   
    email:'',
    password:'',
   
  },validationSchema:regex,
  onSubmit:handleLogin
})




    return (
    <>
    
    <div className='max-w-xl mx-auto '>
      <h2 className='text-6xl font-bold text-center my-6'>Login Now</h2>
    <form onSubmit={formik.handleSubmit}>
  

  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="logemail" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="logemail" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email :</label>
      {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {formik.errors.email}
</div>:null}
  
  </div>

 
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password :</label>
      {formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {formik.errors.password}
</div>:null}
  </div>

 


  {apiError?<div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {apiError}
</div>:null}


<div className="flex items-center">
<button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
  
  {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Login'}
  
   </button>
   <span><Link to={'/forgotPassword'} className='p-2 text-lg'>Forgot Password</Link></span>
</div>


   <p className='p-4'>didn't have account yet? <span className='font-semibold p-2'><Link to={'/register'}>Register Now</Link></span></p>

    </form>
    </div>
    </>
  )
}
