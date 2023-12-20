import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from '../../style/style';
import { HiOutlineMinus, HiPlus } from "react-icons/hi";


const Cart = ({ setOpenCart }) => {
    const cart = [
        {
            name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
            description: "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying"
            ,
            price: 2000,
        },
        {
            name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
            description: "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying"
            ,
            price: 2000,
        },
        {
            name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
            description: "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying"
            ,
            price: 2000,
        }
    ]
    return (
        <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
            <div className="fixed top-0 right-0 h-full w-[25%] bg-white flex flex-col overflow-y-scroll shadow-sm">
                <div className="flex w-full justify-end pt-5 pr-5">
                    <RxCross1
                        size={25}
                        className="cursor-pointer"
                        onClick={() => setOpenCart(false)}
                    />
                </div>
                <div className={`${styles.noramlFlex} p-4`}>
                    <IoBagHandleOutline size={25} />
                    <h5 className="pl-2 text-[20px] font-[500]">
                        {/* {cart && cart.length} items */}
                        0
                    </h5>
                </div>
                <br />
                <div className="w-full border-t">
                    {cart &&
                        cart.map((i, index) => (
                            <CartSingle
                                key={index}
                                data={i}
                                quantityChangeHandler={() => { }}
                                removeFromCartHandler={() => { }}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}

const CartSingle = ({ data }) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.price * value;

    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                <div>
                    <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
                        onClick={() => { setValue(value + 1) }}
                    >
                        <HiPlus size={18} color="#fff" />
                    </div>
                    <span className="pl-[10px]">{value}</span>
                    <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
                        onClick={() => { setValue(value - 1) }}
                    >
                        <HiOutlineMinus size={18} color="#fff" />
                    </div>
                </div>
                <img
                    src={`https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg`}
                    alt=""
                    className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
                />
                <div className="pl-[5px]">
                    <h1>{data.name}</h1>
                    <h4 className="font-[400] text-[15px] text-[#00000082]">
                        ${data.price} * {value}
                    </h4>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
                        US${totalPrice}
                    </h4>
                </div>
                <RxCross1
                    className="cursor-pointer"
                    onClick={() => { }}
                />
            </div>
        </div>
    )
}

export default Cart