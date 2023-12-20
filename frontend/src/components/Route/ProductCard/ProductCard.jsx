import React, { useState } from 'react';
import {
    AiFillHeart,
    AiFillStar,
    AiOutlineEye,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from '../../../style/style';
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";

const ProductCard = ({ data, isEvent }) => {
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);


    const removeFromWishlistHandler = (data) => {
        setClick(!click);
        // dispatch(removeFromWishlist(data));
    };

    const addToWishlistHandler = (data) => {
        setClick(!click);
        // dispatch(addToWishlist(data));
    };

    const addToCartHandler = (id) => {
        // const isItemExists = cart && cart.find((i) => i._id === id);
        // if (isItemExists) {
        //   toast.error("Item already in cart!");
        // } else {
        //   if (data.stock < 1) {
        //     toast.error("Product stock limited!");
        //   } else {
        //     const cartData = { ...data, qty: 1 };
        //     dispatch(addTocart(cartData));
        //     toast.success("Item added to cart successfully!");
        //   }
        // }
    };
    return (
        <div className='relative w-full rounded-lg shadow-sm p-3 cursor-pointer h-[370px] bg-white'>
            <div className='flex justify-end'> </div>
            <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
                <img
                    src={data.image_Url[0].url}
                    alt=""
                    className="w-full h-[170px] object-contain"
                />
            </Link>
            <Link to={`/shop/preview/${data?.shop._id}`}>
                <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
            </Link>
            <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
                <h4 className="pb-3 font-[500]">
                    {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
                </h4>
            </Link>
            <div className='flex'>
                <AiFillStar className='mr-2 cursor-pointer' color="#f6ba00" />
                <AiFillStar className='mr-2 cursor-pointer' color="#f6ba00" />
                <AiFillStar className='mr-2 cursor-pointer' color="#f6ba00" />
                <AiFillStar className='mr-2 cursor-pointer' color="#f6ba00" />
                <AiFillStar className='mr-2 cursor-pointer' color="#f6ba00" />
            </div>
            <div className='py-2 flex items-center justify-between'>
                <div className="flex">
                    <h5 className={`${styles.productDiscountPrice}`}>
                        {data.price === 0
                            ? data.price
                            : data.discount_price}
                        $
                    </h5>
                    <h4 className={`${styles.price}`}>
                        {data.price ? data.price + " $" : null}
                    </h4>
                </div>
                <span className="font-[400] text-[17px] text-[#68d284]">
                    {data?.total_sell} sold
                </span>
            </div>
            <div>
                {click ? (
                    <AiFillHeart
                        size={22}
                        className="cursor-pointer absolute right-2 top-5"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                    />
                ) : (
                    <AiOutlineHeart
                        size={22}
                        className="cursor-pointer absolute right-2 top-5"
                        onClick={() => addToWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                    />
                )}
                <AiOutlineEye
                    size={22}
                    className="cursor-pointer absolute right-2 top-14"
                    onClick={() => setOpen(!open)}
                    color="#333"
                    title="Quick view"
                />
                <AiOutlineShoppingCart
                    size={25}
                    className="cursor-pointer absolute right-2 top-24"
                    onClick={() => addToCartHandler(data._id)}
                    color="#444"
                    title="Add to cart"
                />

                {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
            </div>
        </div>
    )
}

export default ProductCard