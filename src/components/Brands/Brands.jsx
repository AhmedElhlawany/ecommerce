import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../WishlistContext/WishlistContext'

export default function Brands() {
  const [brands, setBrands] = useState([])
  const [brandProducts, setBrandProducts] = useState([]);
  const [showBrands, setShowBrands] = useState(true);
  let { addProductTowishlist,deleteWishItem } = useContext(WishlistContext);
  const [loader, setLoader] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]); 

  async function getBrands(){
  try{
    setLoad(true)
    const {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    setBrands(data.data)
    setLoad(false)
  } catch(error){
    console.log(error);
    setLoad(false)
  }

  }



  function getBrandProducts(brand){
    
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
      let allProducts = data.data;
     let relatedProducts = allProducts.filter((product)=> product.brand.name == brand )
    setBrandProducts(relatedProducts);
    setShowBrands(false);
     console.log(relatedProducts);
    })
    .catch((error)=>{
    console.log(error);
    
    })
  }
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0)

  let { addProductToCart,cartItemsNo, setCartItemsNo  } = useContext(CartContext);

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




  useEffect(() => {
    getBrands();
  
  
  }, [])
  



    return (<>
      {load ? (
          <div className="flex justify-center items-center h-screen">
            <i className="fas fa-spinner fa-spin text-9xl my-10 text-emerald-600"></i> 
          </div>
        ) : (
    <>
         {showBrands && (
     <div className="row">
      {brands.map((brand)=>

<div onClick={() => getBrandProducts(brand.name)} key={brand._id} className="main-dev md:w-1/5 px-4 cursor-pointer rounded-md">
<div className="product my-2 bg-emerald-300 rounded-lg h-full p-3">
<div className='overflow-hidden rounded-md'>
<img className='w-full' src={brand.image} alt={brand.name} />
</div>
<h3 className='text-lg font-bold text-red-900 mb-1 p-2'>{brand.name}</h3>



</div>
</div>
      )}
      
    </div>
         )}
         {!showBrands && (
        <div className="row">
          {brandProducts.map((product) => (
            <div  key={product.id} className="md:w-1/4 main-dev rounded-md">
              <div className="product bg-emerald-300 rounded-lg h-full p-5">
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

              </div>              </div>
            </div>
          ))}
        </div>
      )}
    
    
    
    
    
    
    
    </>
      )}
    
    </>
  )
}
