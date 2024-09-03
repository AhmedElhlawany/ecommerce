import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './CategoriesSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([])


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
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


  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      
      setCategories(data.data);

    } catch (error) {
      console.log(error);
    }
  }

 


  useEffect(() => {
    getCategories()
  }, [])

  
 



  return (
    <>
      <div className="py-5">
      <LazyLoad>
      <h2 className='p-4 text-slate-600 text-2xl font-bold h2-cat'>Shop popular Categories</h2>
      </LazyLoad>
        
        <Slider {...settings}>
          {categories?.map((category) => <div className='p-2 rounded-md main-dev my-2' key={category?._id}>
            <div className="product bg-emerald-300 rounded-lg  p-5">
            <Link to={`/categories`}>
              <div className='overflow-hidden'>
              <img className='w-full md:h-40 rounded-md' src={category?.image} alt={category?.name} />
              </div>
              
              <h3 className='my-2'>{category?.name}</h3>
            </Link>
            </div>
          </div>)}

        </Slider>

      </div>

    </>
  )
}
