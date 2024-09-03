import axios, { Axios } from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props)
{
   
    const [cartId, setCartId] = useState(null)
    const [cartItemsNo, setCartItemsNo] = useState(0)
        let headers = {
            token : localStorage.getItem('userToken')
        } 
    

    function getLoggedUserCart(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers:headers
        })
        .then((response)=> response)
        .catch((error)=> error)
    }

function addProductToCart(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId:productId
    } 
    ,{
            headers
        })
        .then((response)=> response)
        .catch((error)=> error)


}

function updateCartItemCount(productId , count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count:count
    } 
    ,{
            headers
        })
        .then((response)=> response)
        .catch((error)=> error)


}

function deleteProductItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
         headers:headers
     })
     .then((response)=> response)
     .catch((error)=> error)
 }

 function clearItems(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
         headers:headers
     })
     .then((response)=> response)
     .catch((error)=> error)
 }

 function cashOnDelivery(url,shippingAddress){
    return axios.post(url,{shippingAddress}, {
         headers:headers
     })
     .then((response)=> response)
     .catch((error)=> error)
 }

 function getOrders(userId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    .then((response)=> response)
     .catch((error)=> error)
 }



return <CartContext.Provider value={ { cartItemsNo, setCartItemsNo ,cartId , getOrders, setCartId ,getLoggedUserCart,addProductToCart,updateCartItemCount,deleteProductItem,clearItems,cashOnDelivery}}>
{props.children}
</CartContext.Provider>



}