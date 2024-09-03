import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  let navigate = useNavigate();
let { setCartItemsNo , getLoggedUserCart , updateCartItemCount , deleteProductItem , clearItems , setCartId , cartId} = useContext(CartContext);
const [cartDetails, setCartDetails] = useState(null)
async function getCartItem(){
  let response = await getLoggedUserCart();
  setCartItemsNo(response?.data?.numOfCartItems)
setCartId(response?.data?.data._id);
setCartDetails(response?.data?.data);
}

async function updateCartCount(productId , count,flag = 'inc'){
    
  let response = await updateCartItemCount(productId , count);
console.log(response?.data?.data);
setCartDetails(response?.data?.data);
setCartItemsNo(response?.data?.numOfCartItems)

   if(flag == 'inc') {
      increase()
   }else {
    decrease()
   }

}
function decrease(){
    toast.custom(<p className='bg-red-400 rounded-md px-2 py-3'><i class="fa-solid fa-face-sad-tear text-neutral-500"></i>  Item pieces decreased successfully  <i class="fa-solid fa-face-sad-tear text-neutral-500"></i></p>,
    {
      duration: 2000,
      position: 'top-center',
    }
  )
}
function increase(){
    toast.custom(<p className='bg-emerald-400 rounded-md px-2 py-3'><i className="fa-regular fa-face-kiss-wink-heart text-red-600"></i>  Item pieces increased successfully  <i className="fa-regular fa-face-kiss-wink-heart text-red-600"></i></p>,
    {
        
      duration: 2000,
      position: 'top-center',
    }
  )
}
async function deleteItem(productId){
  let response = await deleteProductItem(productId);
  setCartItemsNo(response?.data?.numOfCartItems)
console.log(response?.data?.data);
setCartDetails(response?.data?.data);
toast.custom(<p className='bg-red-400 rounded-md px-2 py-3'><i class="fa-solid fa-face-sad-tear text-neutral-500"></i>  Item deleted successfully  <i class="fa-solid fa-face-sad-tear text-neutral-500"></i></p>,
{
      duration: 2000,
      position: 'top-center',
    }
  )
}
async function clearCart(){
  let response = await clearItems();
console.log(response?.data?.data);
setCartDetails(response?.data?.data)
setCartItemsNo(0)
}

function goToCheckout(){
if(cartId !== undefined){
  navigate(`/checkout/${cartId}`)
}else{
  toast.custom(<p className='bg-emerald-400 rounded-md px-2 py-3'>  Cart is empty, please shop some products  </p>,
  {
      
    duration: 2000,
    position: 'top-center',
  }
)} 
}





useEffect(() => {
 
  getCartItem();
 
}, [])



    return (
    <>
    

<div className="relative overflow-x-auto  sm:rounded-lg">
  <div className='flex justify-between my-3'>
  <h2 className='text-4xl font-bold text-emerald-900'>Your Cart</h2>
  <h3 className='text-4xl font-bold text-emerald-900 text-end'>Total Price: {cartDetails?.totalCartPrice} EGP</h3>

  </div>
  
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded-lg ">
        <thead className="text-xs text-gray-700 uppercase bg-emerald-400  dark:text-gray-400 rounded-lg">
            <tr>
                <th scope="col" className="px-16 py-3">
                    Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {cartDetails?.products.map((product)=>
          <tr key={product.product.id} className=" border-b bg-emerald-300  dark:border-gray-700 hover:bg-emerald-500 dark:hover:bg-gray-600 rounded-md">
          <td className="p-4 ">
              <img src={product.product.imageCover} className="w-full md:w-32 max-w-full max-h-full" alt={product.product.title}/>
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product.title}
          </td>
          <td className="px-6 py-4">
              <div className="flex items-center">
                  <button onClick={()=>{ updateCartCount(product.product.id , product.count-1,'dec')}}  className="inline-flex items-center justify-center p-1 me-3 text-md font-medium h-6 w-6 text-emerald-950 bg-emerald-200 border border-emerald-800 rounded-full focus:outline-none hover:bg-emerald-400 focus:ring-4 focus:ring-emerald-600 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                      </svg>
                  </button>
                  <div>
                                <span className='text-lg font-normal text-emerald-950'>{product.count}</span>
                                                  </div>
                  <button onClick={()=>{ updateCartCount(product.product.id , product.count+1,'inc')}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-emerald-950 bg-emerald-200 border border-emerald-800 rounded-full focus:outline-none hover:bg-emerald-400 focus:ring-4 focus:ring-emerald-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                      </svg>
                  </button>
              </div>
          </td>
          <td className="px-6 py-4 font-bold text-base text-gray-900 dark:text-white">
              <span>{product.price} EGP</span>
          </td>
          <td className="px-6 py-4">
              <span onClick={()=>deleteItem(product.product.id)}  className="cursor-pointer font-medium text-lg text-rose-900 dark:text-red-500 hover:underline">Remove</span>
          </td>
      </tr>
          
          
          )}
          
            
           
        </tbody>
    </table>
    <div className="flex justify-between">
    <button onClick={()=>clearCart()} className='bg-emerald-700 rounded-md text-emerald-950 p-2 m-2'>Clear Cart</button>
    <button onClick={goToCheckout}  className='bg-emerald-700 rounded-md text-emerald-950 p-2 m-2'>Continue to checkout</button>
    </div>
    
</div>

    
    
    </>
  )
}
