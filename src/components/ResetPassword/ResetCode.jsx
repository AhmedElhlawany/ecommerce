import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function ResetCode() {

const [isLoading, setIsLoading] = useState(false)
let navigate = useNavigate();






async function handlereset(formValues){
try {
  setIsLoading(true);
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, formValues)
console.log(data);

if(data.status=='Success'){
  setIsLoading(false);
  navigate('/newpassword')

}

} catch (error) {
  console.log(error);
  setIsLoading(false);
}
}







let formik = useFormik({
  initialValues:{
   
    resetCode:'',
    
   
  },
  onSubmit:handlereset
})


useEffect(() => {
  

}, [])

    return (
    <>
    <form onSubmit={formik.handleSubmit}>

    <div className="relative z-0 w-full my-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="text" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "/>
      <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Code :</label>
      {formik.errors.resetCode && formik.touched.resetCode? <div className="p-4 mb-4 text-sm text-emerald-800 rounded-lg bg-emerald-50 dark:bg-gray-800 dark:text-emerald-400" role="alert">
  {formik.errors.resetCode}
</div>:null}
  
  </div>
  <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
  
  {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Next'}
  
   </button>
    </form>
    

    
    
    
    
    </>
  )
}
