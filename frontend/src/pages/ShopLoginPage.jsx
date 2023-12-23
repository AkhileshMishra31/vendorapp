import React, { useEffect } from 'react'
import ShopLogin from '../components/Shop/ShopLogin.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const ShopLoginPage = () => {
    const {isSeller}=useSelector((state)=>state.shop)
    const navigate=useNavigate();
    useEffect(()=>{
         console.log(isSeller)
         if(isSeller){
            navigate("/shop/2")
         }
    },[])
    return (
        <div>
            <ShopLogin />
        </div>
    )
}

export default ShopLoginPage