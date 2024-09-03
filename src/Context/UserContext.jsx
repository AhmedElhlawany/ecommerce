import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";



export let UserContext = createContext(0)


export function UserContextProvider(props){
const [userLogin, setuserLogin] = useState(null);
const [userId, setUserId] = useState()

function convertToken(){
    let data = jwtDecode(localStorage.getItem('userToken'))
    setUserId(data?.id)

}
useEffect(()=>{
if (localStorage.getItem('userToken') !== null){
    setuserLogin(localStorage.getItem('userToken'))
    convertToken()
    
}
},[]);
    return <UserContext.Provider value={{userLogin , setuserLogin , userId, convertToken}}>
            {props.children}
    </UserContext.Provider>
}