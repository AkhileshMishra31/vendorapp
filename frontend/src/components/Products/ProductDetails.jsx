import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productData } from '../../static/data';
import styles from '../../style/style';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';

const ProductDetails = ({ data }) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const navigate = useNavigate();

    const incrementCount = () => {
        setCount(count + 1);
    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }
    return (
        <div className='bg-white'>
            {
                data ? (
                    <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                        <div className="w-full py-5">
                            <div className="block w-full 800px:flex">
                                <div className="w-full 800px:w-[50%]">
                                    <img
                                        src={`${data && data?.image_Url[select].url}`}
                                        alt=""
                                        // onClick={() => setSelect(0)}
                                        className="w-[80%]"
                                    />
                                    <div className='w-full flex'>
                                        <div className={` ${select === 0 ? "border" : ""} cursor-pointer`}>
                                            <img
                                                src={`${data && data?.image_Url[0].url}`}
                                                alt=""
                                                onClick={() => setSelect(0)}
                                                className="h-[200px]"
                                            />
                                        </div>
                                        <div className={` ${select === 1 ? "border" : ""} cursor-pointer`}>
                                            <img
                                                src={`${data && data?.image_Url[1].url}`}
                                                alt=""
                                                onClick={() => setSelect(1)}
                                                className="h-[200px]"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full 800px:w-[50%]'>
                                    <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                                    <p>{data.description}</p>
                                    <div className="flex pt-4">
                                        <h4 className={`${styles.productDiscountPrice}`} >
                                            {data.discount_price}$
                                        </h4>
                                        <h3 className={`${styles.price}`}>
                                            {data.price ? data.price + "$" : null}
                                        </h3>
                                    </div>
                                    <div className="flex items-center mt-12 justify-between pr-3">
                                        <div>
                                            <button
                                                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                                onClick={decrementCount}
                                            >
                                                -
                                            </button>
                                            <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                                                {count}
                                            </span>
                                            <button
                                                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                                onClick={incrementCount}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            {click ? (
                                                <AiFillHeart
                                                    size={30}
                                                    className="cursor-pointer"
                                                    onClick={() => { }}
                                                    color={click ? "red" : "#333"}
                                                    title="Remove from wishlist"
                                                />
                                            ) : (
                                                <AiOutlineHeart
                                                    size={30}
                                                    className="cursor-pointer"
                                                    onClick={() => { }}
                                                    color={click ? "red" : "#333"}
                                                    title="Add to wishlist"
                                                />
                                            )}
                                        </div>

                                    </div>
                                    <div
                                        className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                                        onClick={() => { }}
                                    >
                                        <span className="text-white flex items-center">
                                            Add to cart <AiOutlineShoppingCart className="ml-1" />
                                        </span>
                                    </div>
                                    <div className="flex items-center pt-8">
                                        <img
                                            src={`${data?.shop?.shop_avatar.url}`}
                                            alt=""
                                            className="w-[50px] h-[50px] rounded-full mr-2"
                                        />
                                        <div className='pr-8'>
                                            <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                                {data.shop.name}
                                            </h3>
                                            <h5 className='pb-3 text-[15px]'>
                                                ({data.shop.ratings}) Ratings
                                            </h5>
                                        </div>

                                        <div className={`${styles.button} bg-[#6443d1] mt-4 rounded h-11`}>
                                            <span className="text-white flex items-center">
                                                Send Message <AiOutlineMessage className="ml-1" />
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* productDetailsinfo */}
                        <ProductDetailInfo data={data} />
                        <br></br>
                        <br></br>
                    </div>
                ) : null
            }
        </div >
    )
}


const ProductDetailInfo = ({ data }) => {
    const [selectedHeading, setSelectedHeading] = useState(1);

    const handleHeadingClick = (headingIndex) => {
        setSelectedHeading(headingIndex);
    }

    return (
        <div className='bg-gray-100 p-5  rounded-md'>
            <div className='w-full flex justify-between items-center border-b pb-2'>
                <div className='relative'>
                    <h5
                        onClick={() => handleHeadingClick(1)}
                        className={`text-[#333] text-[18px] px-1 cursor-pointer transition-all ${selectedHeading === 1 ? 'border-b-4 border-blue-600 duration-2000' : ''
                            }`}
                    >
                        Product Details
                    </h5>
                </div>
                <div className='relative'>
                    <h5
                        onClick={() => handleHeadingClick(2)}
                        className={`text-[#333] text-[18px] px-1 cursor-pointer transition-all ${selectedHeading === 2 ? 'border-b-4 border-blue-600 duration-2000' : ''
                            }`}
                    >
                        Product Reviews
                    </h5>
                </div>
                <div className='relative'>
                    <h5
                        onClick={() => handleHeadingClick(3)}
                        className={`text-[#333] text-[18px] px-1 cursor-pointer transition-all ${selectedHeading === 3 ? 'border-b-4 border-blue-600 duration-2000' : ''
                            }`}
                    >
                        Seller information
                    </h5>
                </div>
            </div>
            <div className='text-[#001] text-[20px] px-8 py-8 '>
                {
                    selectedHeading == 1 ? (
                        <>
                            <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>
                                Product details are Explore our innovative product, crafted with precision and designed for optimal performance. With cutting-edge features and a sleek design, this versatile solution meets the highest standards. Elevate your experience with a product that seamlessly combines style and functionality, setting new benchmarks in the world of technology.
                            </p>
                            <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>
                                Product details are Explore our innovative product, crafted with precision and designed for optimal performance. With cutting-edge features and a sleek design, this versatile solution meets the highest standards. Elevate your experience with a product that seamlessly combines style and functionality, setting new benchmarks in the world of technology.
                            </p>
                            <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>
                                Product details are Explore our innovative product, crafted with precision and designed for optimal performance. With cutting-edge features and a sleek design, this versatile solution meets the highest standards. Elevate your experience with a product that seamlessly combines style and functionality, setting new benchmarks in the world of technology.
                            </p>
                        </>
                    ) : null
                }
                {
                    selectedHeading == 2 ? (
                        <p>
                            Product details are Explore our innovative product, crafted with precision and designed for optimal performance. With cutting-edge features and a sleek design, this versatile solution meets the highest standards. Elevate your experience with a product that seamlessly combines style and functionality, setting new benchmarks in the world of technology.
                        </p>
                    ) : null
                }
                {
                    selectedHeading == 3 ? (
                        <>
                            <div className='w-full block 800px:flex p-5'>
                                <div className='w-full 800px:w-[50%]'>
                                    <div className='flex items-center'>
                                        <img src="https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png" alt="src" className='h-[40px] w-[40px] rounded-[50%] ' />
                                        <div className='flex flex-col justify-between'>
                                            <h5 className='text-[blue] text-[15px] px-1'>Amazon ltd</h5>
                                            <h5 className='text-[15px] px-1'>(4.2) Ratings</h5>
                                        </div>
                                    </div>
                                    <p className='pt-2 text-[18px] leading-6 whitespace-pre-line'>
                                        Product details are Explore our innovative product, crafted with precision and designed for optimal performance. With cutting-edge features and a sleek design, this versatile solution meets the highest standards. Elevate your experience with a product that seamlessly combines style and functionality, setting new benchmarks in the world of technology.
                                    </p>
                                </div>

                                <div className='w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end'>
                                    <div className='text-left'>
                                        <h5 className='font-[600]'>Joined on:-<span className='font-[500]'>14 march,2023</span></h5>
                                        <h5 className='mt-5 font-[600]'>Total products:-<span className='font-[500]'>1,022</span></h5>
                                        <h5 className='mt-5 font-[600]'>Total reviews:-<span className='font-[500]'>131</span></h5>
                                        <div
                                            className={`${styles.button} !rounded !h-11 flex items-center`}
                                            onClick={() => { }}
                                        >
                                            <span className="text-white flex items-center">
                                                Visit shop
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null
                }
            </div>
        </div>
    );

}
export default ProductDetails