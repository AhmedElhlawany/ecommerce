import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { WishlistContext } from '../WishlistContext/WishlistContext'
import { CartContext } from '../../Context/CartContext'

export default function Wishlist() {
  const [currentProductId, setCurrentProductId] = useState(0)
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [load, setLoad] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]); 


  let { setCartItemsNo ,addProductToCart,cartItemsNo} = useContext(CartContext);

let { addProductTowishlist,  getLoggedUserwishlist  , deleteWishItem  , setwishlistId } = useContext(WishlistContext);
const [WishlistDetails, setWishlistDetails] = useState([])
async function getWishlistItems(){
try { 
  setLoad(true)
  let response = await getLoggedUserwishlist();
  
  setwishlistId(response?.data?.data._id);
  setWishlistDetails(response?.data?.data);
  setLoad(false)

} catch (error) {
  setLoad(false)

} 
  
}

const handleWish = async ()=>{
  let response = await getLoggedUserwishlist();
  
  let wishListProductItems = response.data.data.map((product) => product._id)
  setWishlistItems(wishListProductItems)
  
}

async function addWish(productId) {
  setCurrentProductId(productId);
 
  try {
    setLoader(true);
    let response = await addProductTowishlist(productId);
    if (response?.data.status === "success") {
      setWishlistItems([...wishlistItems, productId]); 
      toast.success(response?.data.message, { duration: 2000, position: 'top-center' });
    } else {
      toast.error(response?.data.message);
    }
  } catch (error) {
    toast.error("Failed to add product to wishlist.");
  } finally {
    setLoader(false);
  }
}

async function deleteItem(productId) {
  setLoader(true);
  try {
    let response = await deleteWishItem(productId);
    setWishlistItems(wishlistItems.filter(id => id !== productId)); 
    toast.custom(<p className='bg-red-400 rounded-md px-2 py-3'>Item deleted successfully</p>, { duration: 2000, position: 'top-center' });
  } catch (error) {
    toast.error("Failed to delete item from wishlist.");
  } finally {
    setLoader(false);
  }
}

const handleClick = (productId) => {
  if (wishlistItems.includes(productId)) {
    deleteItem(productId);
  } else {
    addWish(productId);
  }
}


async function addProduct(productId) {
  setCurrentProductId(productId)
  setLoading(true);
  let response = await addProductToCart(productId);
  if (response?.data.status === "success") {
let newcartItemsNo = cartItemsNo +1;
setCartItemsNo(newcartItemsNo)

    setLoading(false)
    toast.success(response?.data?.message,
      {
        duration: 2000,
        position: 'top-center',
      }
    )
  } else {
    toast.error(response?.data?.message,

    )
  }
  


}

useEffect(() => {
  handleWish()

  
}, [])


useEffect(() => {
  getWishlistItems();
  

 
}, [])



    return (
    <>
    
{load?(
        <div className="flex justify-center items-center h-screen">
          <i className="fas fa-spinner fa-spin text-9xl my-10 text-emerald-600"></i> 
        </div>
      ) : (
        <>
        <div className="flex flex-wrap">
 
  
    
        {WishlistDetails?.map((product)=>
        
        <div key={product.id} className="main-dev md:w-1/4 my-3">
        <div className="product bg-emerald-300 rounded-lg h-full p-5">
          <Link className='flex flex-col gap-3' to={`/productdetails/${product.id}/${product?.category?.name}`}>
            <div className='overflow-hidden'>
              <img className='w-full rounded-lg' src={product.imageCover} alt={product.title} />
            </div>
            <span className='block font-light text-red-700'>{product?.category?.name}</span>
            <h3 className='text-lg font-normal text-red-900 '>{product?.title.split(' ').splice(0, 2).join(' ')}</h3>
            <div className="flex justify-between items-center">
              <span>{product.price} EGP</span>
              <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
            </div>
          </Link>
          <div className="flex  items-center justify-between">
          <button onClick={() => handleClick(product.id)} className='cursor-pointer'>
                {wishlistItems.includes(product.id)? 
                  <i className="fa-solid fa-heart text-2xl me-2 text-red-700 mt-4"></i> : 
                  <i className="fa-regular fa-heart text-2xl me-2 text-red-700 mt-4"></i>
                }
              </button>    
                      <button onClick={() => addProduct(product.id)} className='btn'>{currentProductId === product.id && loading ? <i className='fas fa-spinner fa-spin'></i> : 'add to Cart'}</button>

          </div>



        </div>
      </div>
        
        )}
        
          
         
     
  
</div>



    
    </>
    )}
    </>
  )
}
