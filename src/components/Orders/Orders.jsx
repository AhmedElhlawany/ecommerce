import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Orders.module.css'
import { CartContext } from '../../Context/CartContext'
import { UserContext } from '../../Context/UserContext'
import { Accordion } from "flowbite-react";

export default function Orders() {
const [orders, setOrders] = useState([])
let {getOrders} = useContext(CartContext)
let {userId} = useContext(UserContext)



async function getAllOrders(){
let {data} = await getOrders(userId)
setOrders(data)
console.log('x===>>',data);

}




useEffect(() => {
  if (userId)getAllOrders()
 }, [userId])




    return (
    <>
    
    <Accordion className='border-0 bg-emerald-500 p-4'>
      {orders.map(order=> <Accordion.Panel key={order.id} className='rounded-lg hover:bg-emerald-600'>
        <Accordion.Title className= 'bg-emerald-600 rounded-lg my-2 text-emerald-900' >Payment method: {order.paymentMethodType}</Accordion.Title>
        <Accordion.Content>
          <div className="mb-2 px-2 flex flex-wrap text-gray-500 dark:text-gray-400">
            {order.cartItems.map(item=><span key={item?.product.id} className='p-3 bg-emerald-500 m-1 rounded-md'>{item?.product.title}</span>)}
          </div>
          <p className='text-lg'>Totoal price: {order.totalOrderPrice}</p>
        </Accordion.Content>
      </Accordion.Panel>
      )}
      
    
    </Accordion>
    
    
    
    </>
  )
}
