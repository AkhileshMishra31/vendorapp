import React, { useEffect } from 'react'
import ShopCreate from '../components/Shop/ShopCreate.jsx'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ShopCreatePage = () => {
    const {isSeller}=useSelector((state)=>state.shop)
    const navigate=useNavigate();
    useEffect(()=>{
         console.log(isSeller)
         if(isSeller){
            navigate("/shop/2")
         }
    },[])
    return (
        <div className=''>
            <ShopCreate />
        </div>
    )
}

export default ShopCreatePage
