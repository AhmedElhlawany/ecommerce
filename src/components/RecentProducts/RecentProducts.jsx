import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import LazyLoad from 'react-lazy-load'
import { WishlistContext } from '../WishlistContext/WishlistContext'










export default function RecentProducts() {
  const [loading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [loader, setLoader] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]); 
  
  const { addProductToCart, cartItemsNo, setCartItemsNo } = useContext(CartContext);
  const { addProductTowishlist, deleteWishItem,getLoggedUserwishlist,setwishlistId } = useContext(WishlistContext);

  async function addProduct(productId) {
    setCurrentProductId(productId);
    setLoading(true);
    try {
      let response = await addProductToCart(productId);
      if (response?.data.status === "success") {
        setCartItemsNo(response.data.numOfCartItems);
        toast.success(response?.data?.message, { duration: 2000, position: 'top-center' });
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Failed to add product to cart.");
    } finally {
      setLoading(false);
    }
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

  
  const handleWish = async ()=>{
    let response = await getLoggedUserwishlist();
    console.log(response);
    let wishListProductItems = response.data.data.map((product) => product._id)
    setWishlistItems(wishListProductItems)

  }

  useEffect(() => {
    
    
    handleWish()
    
  }, [])

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/products')
  });

  if (isLoading) {
    return <div className='flex justify-center items-center '>
      <i className='fas fa-spinner fa-spin text-6xl '></i>
    </div>
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  
  

  return (
    <>
      <LazyLoad>
        <h2 className='p-4 text-slate-600 text-4xl font-bold h2-cat '>Shop popular Products</h2>
      </LazyLoad>
      <div className="row">
        {data?.data.data.map((product) =>
          <div key={product.id} className="main-dev md:w-1/5 my-2">
            <div className="product bg-emerald-300 rounded-lg h-full p-4">
              <Link className='flex flex-col gap-3' to={`/productdetails/${product.id}/${product.category.name}`}>
                <div className='overflow-hidden rounded-lg'>
                  <img className='w-full rounded-lg' src={product.imageCover} alt={product.title} />
                </div>
                <span className='block font-light text-red-700'>{product.category.name}</span>
                <h3 className='text-lg font-normal text-red-900'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                </div>
              </Link>
              <div className="flex items-center justify-between">
                <button onClick={() => handleClick(product.id)} className='cursor-pointer'>
                  {wishlistItems.includes(product.id)? 
                    <i className="fa-solid fa-heart text-2xl me-2 text-red-700 mt-4"></i> : 
                    <i className="fa-regular fa-heart text-2xl me-2 text-red-700 mt-4"></i>
                  }
                </button>
                <button onClick={() => addProduct(product.id)} className='btn'>
                  {currentProductId === product.id && loading ? <i className='fas fa-spinner fa-spin'></i> : 'Add to cart'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <img src="" alt="" />
    </>
  );
}