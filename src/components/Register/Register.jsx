import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext'

export default function Register() {
  let {setuserLogin} = useContext(UserContext);

  const [apiError, setapiError] = useState('')
const [isLoading, setIsLoading] = useState(false)
  let regex = Yup.object().shape({
    name:Yup.string().min(3 ,'name minlength is 3').max(10,'name maxlength is 10').required('name is requiemerald'),
    email:Yup.string().email('email is invalid').required('email is requiemerald'),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'phone must be egyptian').required('phone number is requiemerald'),
    password:Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'password in not valid').required('password is requiemerald'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'password & repassword must be same').required('repassword is requiemerald')
  })
let navigate = useNavigate();


  async function handleRegister(formValues){
setIsLoading(true);
  let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , formValues)
  .then( (response) => {
    setIsLoading(false);
    if (response.data.message === 'success'){
      localStorage.setItem('userToken',response.data.token);
    setuserLogin(response.data.token)
      navigate('/');
    }
    
    }
    
    )
  .catch((apiResponse) => {
    setIsLoading(false);
    setapiError(apiResponse?.response?.data?.message)
   
  })
 

}
let formik = useFormik({
  initialValues:{
    name:'',
    phone:'',
    email:'',
    password:'',
    rePassword:''
  },validationSchema:regex,
  onSubmit:handleRegister
})


    return (
    <>
    <div className="w-full p-5">
    <div className='max-w-xl m-auto '>
      <h2 className='text-6xl font-bold text-center mb-6'>Register Now</h2>
    <form onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name :</label>
  
  {formik.errors.name && formik.touched.name? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {formik.errors.name}
</div>:null}
  
  
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email :</label>
      {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {formik.errors.email}
</div>:null}
  
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone :</label>
      {formik.errors.phone && formik.touched.phone? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {formik.errors.phone}
</div>:null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password :</label>
      {formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {formik.errors.password}
</div>:null}
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RePassword :</label>
      {formik.errors.rePassword && formik.touched.rePassword? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {formik.errors.rePassword}
</div>:null}
  </div>


  {apiError?<div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {apiError}
</div>:null}




<button disabled={formik.isValid == false || formik.dirty == false} type="submit" className="disabled:bg-slate-400 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
  
  {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Submit'}
  
   </button>

    </form>
    </div>
    </div>
    </>
  )
}
