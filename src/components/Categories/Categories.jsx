import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../WishlistContext/WishlistContext'

export default function Categories() {
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0)
  const [categories, setCategories] = useState([])
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [showCategories, setShowCategories] = useState(true);
  let { addProductTowishlist ,deleteWishItem,getLoggedUserwishlist} = useContext(WishlistContext);
  const [loader, setLoader] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]); 

  async function getCategories(){
   try{
   
    setLoad(true);
    
    const {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    
   
    
  setCategories(data.data);
  setLoad(false);
 
  }catch(error){
console.log(error);
setLoad(false);
  }
  }


  function getCategoryProducts(category){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
      let allProducts = data.data;
     let relatedProducts = allProducts.filter((product)=> product.category.name == category )
    setCategoryProducts(relatedProducts);
    setShowCategories(false);
     
    })
    .catch((error)=>{
    console.log(error);
    
    })
  }
  
  

  let { addProductToCart,cartItemsNo, setCartItemsNo } = useContext(CartContext);

  async function addProduct(productId) {
    setCurrentProductId(productId)
    setLoading(true);
    let response = await addProductToCart(productId);
    if (response?.data.status === "success") {
      setLoading(false);
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
    console.log(response);


  }
  async function addWish(productId) {
    setCurrentProductId(productId);
   
    try {
      setLoader(true);
      let response = await addProductTowishlist(productId);
      if (response?.data.status === "success") {
        setWishlistItems([...wishlistItems, productId]); // Add to wishlist
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
      setWishlistItems(wishlistItems.filter(id => id !== productId)); // Remove from wishlist
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
    getCategories();

    handleWish()
  }, [])
  




    return (
    <>
    {load ? (
        <div className="flex justify-center items-center h-screen">
          <i className="fas fa-spinner fa-spin text-9xl my-10 text-emerald-600"></i> 
        </div>
      ) : (
        <>
          {showCategories && (
            <div className="row">
              {categories.map((category) => (
                <div key={category._id} onClick={() => getCategoryProducts(category.name)} className="main-dev md:w-1/5 px-4 cursor-pointer rounded-md mt-4">
                  <div className="product bg-emerald-300 rounded-lg h-full p-3">
                    <div className='overflow-hidden rounded-md'>
                      <img className="w-full h-48 rounded-md" src={category.image} alt={category.name} />
                    </div>
                    <h3 className="text-lg font-bold text-red-900 p-2">{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!showCategories && (
            <div className="row">
              {categoryProducts.map((product) => (
                <div key={product.id} className="md:w-1/5 main-dev mt-4">
                  <div className="product bg-emerald-300 rounded-lg h-full p-4">
                    <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                      <div className='overflow-hidden rounded-md'>
                        <img className="w-full rounded-lg" src={product.imageCover} alt={product.title} />
                      </div>
                      <span className="block font-light text-red-700">{product.category.name}</span>
                      <h3 className="text-lg font-normal text-red-900">
                        {product.title.split(' ').splice(0, 2).join(' ')}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span>{product.price} EGP</span>
                        <span>{product.ratingsAverage} <i className="fas fa-star text-yellow-300"></i></span>
                      </div>
                    </Link>
                    <div className="flex items-center justify-between">
                    <button onClick={() => handleClick(product.id)} className='cursor-pointer'>
                  {wishlistItems.includes(product.id)? 
                    <i className="fa-solid fa-heart text-2xl me-2 text-red-700 mt-4"></i> : 
                    <i className="fa-regular fa-heart text-2xl me-2 text-red-700 mt-4"></i>
                  }
                </button>              <button onClick={() => addProduct(product.id)} className='btn'>{currentProductId === product.id && loading ? <i className='fas fa-spinner fa-spin'></i> : 'add to cart'}</button>

              </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>

  
  )
}
