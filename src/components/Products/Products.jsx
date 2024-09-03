import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../WishlistContext/WishlistContext'



export default function RecentProducts() {
  const [loading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0)

  let { addProductToCart,cartItemsNo, setCartItemsNo  } = useContext(CartContext);
  let { addProductTowishlist,deleteWishItem ,getLoggedUserwishlist} = useContext(WishlistContext);
  const [loader, setLoader] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]); 


  async function addProduct(productId) {
    setCurrentProductId(productId)
    setLoading(true);
    let response = await addProductToCart(productId);
    if (response?.data.status === "success") {
      setLoading(false)
      let newcartItemsNo = cartItemsNo +1;
setCartItemsNo(newcartItemsNo)
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



  const handleWish = async ()=>{
    let response = await getLoggedUserwishlist();
    console.log(response);
    let wishListProductItems = response.data.data.map((product) => product._id)
    setWishlistItems(wishListProductItems)

  }
  const handleClick = (productId) => {
    if (wishlistItems.includes(productId)) {
      deleteItem(productId);
    } else {
      addWish(productId);
    }
  }

  useEffect(() => {
    
    
    handleWish()
    
  }, [])

  function getRecentProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getRecentProducts
  })

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





  if (isLoading) {
    return <div className='flex justify-center items-center min-h-screen'>
      <i className='fas fa-spinner fa-spin text-9xl mt-10 text-emerald-600'></i>
      </div>
  };
  if (isError) {
    return <div>{error}</div>
  };

  return (
    <>
      <div className="row">
        {data?.data.data.map((product) =>

          <div key={product.id} className="main-dev md:w-1/4 mt-4">
            <div className="product bg-emerald-300 rounded-lg h-full p-5">
              <Link className='flex flex-col gap-3' to={`/productdetails/${product.id}/${product.category.name}`}>
                <div className='overflow-hidden'>
                  <img className='w-full rounded-lg' src={product.imageCover} alt={product.title} />
                </div>
                <span className='block font-light text-red-700'>{product.category.name}</span>
                <h3 className='text-lg font-normal text-red-900 mb-4'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                </div>
              </Link>
              <div className="flex items-center justify-between p-1">
              <button onClick={() => handleClick(product.id)} className='cursor-pointer'>
                  {wishlistItems.includes(product.id)? 
                    <i className="fa-solid fa-heart text-2xl me-2 text-red-700 mt-4"></i> : 
                    <i className="fa-regular fa-heart text-2xl me-2 text-red-700 mt-4"></i>
                  }
                </button>           
                   <button onClick={() => addProduct(product.id)} className='btn'>{currentProductId === product.id && loading ? <i className='fas fa-spinner fa-spin'></i> : 'add to cart'}</button>

              </div>


            </div>
          </div>
        )}

      </div>
    </>
  )
}
