import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import LazyLoad from 'react-lazy-load';
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../WishlistContext/WishlistContext'

export default function ProductDetails() {
  const [currentProductId, setCurrentProductId] = useState(0)
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  let { id, category } = useParams();
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  var settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data)


      })
      .catch((error) => {
        console.log(error);

      })
  }


  function getRelatedProducts(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        let related = allProducts.filter((product) => product.category.name == category)
        setRelatedProducts(related)


      })
      .catch((error) => {
        console.log(error);

      })
  }



  let { addProductToCart, cartItemsNo, setCartItemsNo } = useContext(CartContext);

  async function addProduct(productId) {
    setCurrentProductId(productId)
    setLoading(true);
    let response = await addProductToCart(productId);
    if (response?.data.status === "success") {
      setLoading(false)
      let newcartItemsNo = cartItemsNo + 1;
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
    const [WishlistDetails, setWishlistDetails] = useState([])
    async function getWishlistItems(){
      try { 
      
        let response = await getLoggedUserwishlist();
        
        setwishlistId(response?.data?.data._id);
        setWishlistDetails(response?.data?.data);
        
      
      } catch (error) {
        
      
      } 
        
      }
  



  }
  let { addProductTowishlist, deleteWishItem ,setwishlistId,getLoggedUserwishlist} = useContext(WishlistContext);
  const [loader, setLoader] = useState(false);


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

    getProductDetails(id);
    getRelatedProducts(category)
    getWishlistItems()
  }, [id, category])




  return (
    <>
      <div className="row bg-emerald-500 rounded-lg mt-5">
        <div className="w-full md:w-1/4 rounded-md overflow-hidden">
          <Slider {...settings}>
            {productDetails?.images.map((src) => <img key={src} className='w-full rounded-md' src={src} alt={productDetails?.title} />)}
          </Slider>
        </div>
        <div className="md:w-3/4 p-8 ">
          <h1 className='text-lg font-normal text-gray-950'>{productDetails?.title}</h1>
          <p className='text-gray-800 font-light mt-4'>{productDetails?.description}</p>
          <div className="flex justify-between items-center mt-20">
            <span className='p-4 text-lg'>{productDetails?.price} EGP</span>
            <span className='p-4 text-lg'>{productDetails?.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>



          </div>
          <div className="flex items-center justify-between p-1">
            <button onClick={() => handleClick(productDetails?.id)} className='cursor-pointer'>
              {wishlistItems.includes(productDetails?.id) ?
                <i className="fa-solid fa-heart text-2xl me-2 text-red-700 mt-4"></i> :
                <i className="fa-regular fa-heart text-2xl me-2 text-red-700 mt-4"></i>
              }
            </button>
            <button onClick={() => addProduct(product.id)} className='btn'>{currentProductId === productDetails?.id && loading ? <i className='fas fa-spinner fa-spin'></i> : 'add to cart'}</button>

          </div>
        </div>
      </div>
      <LazyLoad>
        <h2 className='my-6 text-4xl font-bold text-center relat-h2'>Related Products</h2>
      </LazyLoad>

      <Slider {...settings2}>
        {relatedProducts.map((product) =>
          <div key={product.id} className="md:w-1/4 main-dev my-7">

            <div className="product bg-emerald-300 rounded-lg h-full p-5">
              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <div className='overflow-hidden rounded-md'>
                  <img className='w-full' src={product.imageCover} alt={product.title} />
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
                  {wishlistItems.includes(product.id) ?
                    <i className="fa-solid fa-heart text-2xl me-2 text-red-700 mt-4"></i> :
                    <i className="fa-regular fa-heart text-2xl me-2 text-red-700 mt-4"></i>
                  }
                </button>
                <button onClick={() => addProduct(product.id)} className='btn'>{currentProductId === productDetails?.id && loading ? <i className='fas fa-spinner fa-spin'></i> : 'add to cart'}</button>

              </div>
            </div>
          </div>
        )}
      </Slider>






    </>
  )
}
