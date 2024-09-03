import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './CategoryProducts.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'






export default function CategoryProducts() {
    // let {id} = useParams();
    // const [categoryProducts, setCategoryProducts] = useState([]);
    // function getCategoryProducts(id){
    //     axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    //     .then(({data})=>{
    //       let allCategories = data;
    //      let relatedCategories = allCategories.filter((category)=> category.data._id == id );
    //     setCategoryProducts(relatedCategories);
       
    //      console.log(data);
    //     })
    //     .catch((error)=>{
    //     console.log(error);
        
    //     })
    //   }

    //   useEffect(() => {
  
        
    //     getCategoryProducts(id)
        
    //     }, [ id])
        





    return (
        <>
        {/* <div className="row">
            {categoryProducts.map((product) => (
                <div key={product.id} className="w-1/5 main-dev">
                    <div className="product py-4 px-4">
                        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                            <img className="w-full" src={product.imageCover} alt={product.title} />
                            <span className="block font-light text-red-700">{product.category.name}</span>
                            <h3 className="text-lg font-normal text-red-900 mb-4">
                                {product.title.split(' ').splice(0, 2).join(' ')}
                            </h3>
                            <div className="flex justify-between items-center">
                                <span>{product.price} EGP</span>
                                <span>
                                    {product.ratingsAverage} <i className="fas fa-star text-yellow-300"></i>
                                </span>
                            </div>
                            <button className="btn">Add to Cart</button>
                        </Link>
                    </div>
                </div>
            ))}
            </div> */}
        </>
    );
}