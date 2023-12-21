import React, { useState } from 'react'
import styles from "../../style/style"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDown from "./DropDown.js";
import Nav from './Nav.js';
import { categoriesData, productData } from "../../static/data";
import {
    AiOutlineHeart,
    AiOutlineSearch,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';


import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Cart from '../Cart/Cart.jsx';
import WishList from '../WishList/WishList.jsx';
import { RxCross1 } from 'react-icons/rx';


const Header = ({ activeHeading }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [isSeller, setisSeller] = useState(false)
    const [active, setActive] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [opencart, setOpenCart] = useState(false);
    const [openWishlist, setOpenWishlist] = useState(false)
    const [openSidebar, setopenSidebar] = useState(false);
    // const [activeHeading, setActiveHeading] = useState(1);


    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        console.log(term);

        if (productData) {
            const filteredProducts =
                term === ''
                    ? productData // Show all products if the search term is empty
                    : productData.filter((product) =>
                        product.name.toLowerCase().includes(term.toLowerCase())
                    );
            console.log(filteredProducts)
            setSearchData(filteredProducts);
        } else {
            // Handle the case where productData is undefined or not an array
            setSearchData([]);
        }
    };


    window.addEventListener("scroll", () => {
        if (window.scrollY > 70) {
            setActive(true);
        } else {
            setActive(false);
        }
    });
    return (
        <>
            {/* first  */}
            <div className={`${styles.section}`}>
                <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
                    <img
                        src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                        alt=""
                    />
                    {/* search icons */}
                    <div className='w-[50%] relative'>
                        <input
                            type="text"
                            placeholder="Search Product..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                        />
                        <AiOutlineSearch
                            size={30}
                            className="absolute right-2 top-1.5 cursor-pointer"
                        />
                        {searchTerm && searchData.length !== 0 ? (
                            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                                {searchData &&
                                    searchData.map((i, index) => {
                                        return (
                                            <Link to={`/product/${i._id}`}>
                                                <div className="w-full flex items-start-py-3">
                                                    <img
                                                        src={i?.images?.[0]?.url || 'fallback-image-url'} // Use a fallback image URL if 'url' is undefined
                                                        alt=""
                                                        className="w-[40px] h-[40px] mr-[10px]"
                                                    />
                                                    <h1>{i.name}</h1>
                                                </div>
                                            // </Link>
                                        );
                                    })}
                            </div>
                        ) : null}
                    </div>
                    <div className={`${styles.button}`}>
                        <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                            <h1 className="text-[#fff] flex items-center">
                                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                                <IoIosArrowForward className="ml-1" />
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
            {/* navbar */}
            <div
                className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
                    } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
            >
                <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
                    {/* categories */}
                    <div>
                        <div className="relative h-[60px] mt-[10px]  w-[270px] hidden 1000px:block">
                            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                            <button
                                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                            >
                                All Categories
                            </button>
                            <IoIosArrowDown
                                size={20}
                                className="absolute right-2 top-4 cursor-pointer"
                                onClick={() => setDropDown(!dropDown)}
                            />
                            {dropDown ? (
                                <DropDown
                                    categoriesData={categoriesData}
                                    setDropDown={setDropDown}
                                />
                            ) : null}
                        </div>
                    </div>
                    {/* navbar */}
                    <div className={`${styles.noramlFlex}`}>
                        <Nav active={activeHeading} />
                    </div>
                    {/* nav whishlist ection */}
                    <div className='flex'>
                        {/* wishlist */}
                        <div className={`${styles.noramlFlex}`}>
                            <div
                                className="relative cursor-pointer mr-[15px]"
                                onClick={() => { setOpenWishlist(true) }}
                            >
                                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                    {/* {wishlist && wishlist.length} */}
                                    0
                                </span>
                            </div>
                        </div>
                        {/* cart */}
                        <div className={`${styles.noramlFlex}`}>
                            <div
                                className="relative cursor-pointer mr-[15px]"
                                onClick={() => { setOpenCart(true) }}
                            >
                                <AiOutlineShoppingCart
                                    size={30}
                                    color="rgb(255 255 255 / 83%)"
                                />
                                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                    {/* {cart && cart.length} */}0
                                </span>
                            </div>
                        </div>
                        {/* login section */}
                        <div className={`${styles.noramlFlex}`}>
                            <div className="relative cursor-pointer mr-[15px]">
                                {isAuthenticated ? (
                                    <Link to="/profile">
                                        <img
                                            src={`${user?.avatar?.url}`}
                                            className="w-[35px] h-[35px] rounded-full"
                                            alt=""
                                        />
                                    </Link>
                                ) : (
                                    <Link to="/login">
                                        <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                                    </Link>
                                )}
                            </div>
                        </div>
                        {
                            opencart ? (
                                <>
                                    <Cart setOpenCart={setOpenCart} />
                                </>
                            ) : (
                                <>

                                </>
                            )
                        }
                        {openWishlist ? <WishList setOpenWishlist={setOpenWishlist} /> : null}
                    </div>

                </div>
            </div>
            <div className='w-full fixed top-0 left-0 h-[50px] bg-[#fff] shadow-sm 800px:hidden z-50'>
                {/* hamburger menu */}
                <div className='w-full h-full flex justify-between items-center p-5'>
                    <div className='flex items-center'>
                        <FaBars size={30} onClick={() => setopenSidebar(true)} />
                    </div>
                    <div className='flex items-center pr-3'>
                        <img
                            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                            alt=""
                            className='h-[30px]'
                        />
                    </div>
                    <div
                        onClick={() => { setOpenCart(true) }}
                        className='relative'
                    >
                        <AiOutlineShoppingCart size={30} color="#000" />
                        <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                            {/* {cart && cart.length} */}0
                        </span>
                    </div>
                </div>
                {
                    openSidebar ? (
                        <div className='w-[100vw] h-[100vh] bg-[#0000005f] z-20 fixed top-0 left-0'>
                            <div className='fixed w-[60%] bg-white h-full z-[10] top-0 left-0 overflow-y-auto'>
                                <div className='flex justify-between items-center'>
                                    {/* cart */}
                                    <div>
                                        <div className='relative mr-[15px]'>
                                            <AiOutlineHeart size={30} className='mt-5 ml-3' />
                                            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                                {/* {cart && cart.length} */}0
                                            </span>
                                        </div>
                                    </div>
                                    <RxCross1 size={30} className='ml-4 mt-5' onClick={() => setopenSidebar(false)} />
                                </div>
                                <div className='relative my-8 h-[40px] w-[90%] mx-auto mt-[25px]'>
                                    <input
                                        type='text'
                                        placeholder='Search products..'
                                        className=' w-full p-[5px] border-[3px] border-[#4646b5] rounded'
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    {
                                        searchTerm && searchData.length !== 0 ? (
                                            <div className='absolute bg-[#fff] w-full left-0 p-3 z-[10]'>
                                                {searchData && searchData.map((i, index) => {
                                                    return (
                                                        <Link to={`/product/${i._id}`}>

                                                            <div className='flex justify-between items-center p-[10px]'>
                                                                <img
                                                                    src={`https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg` || 'fallback-image-url'} // Use a fallback image URL if 'url' is undefined
                                                                    alt=""
                                                                    className="w-[30px] h-[30px] mr-[10px]"
                                                                />
                                                                <h1 className='text-[10px]'>{i.name}</h1>
                                                            </div>
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        ) : null
                                    }

                                </div>
                                <Nav active={activeHeading} />
                                <div className='p-[10px]'>
                                    <div className={`${styles.button}`}>
                                        <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                                            <h1 className="text-[#fff] flex items-center">
                                                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                                                <IoIosArrowForward className="ml-1" />
                                            </h1>
                                        </Link>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center p-[10px]'>

                                    {isAuthenticated ? (
                                        <Link to="/profile">
                                            <img
                                                src={`${user?.avatar?.url}`}
                                                className="w-[35px] h-[35px] rounded-full border-[6px] border"
                                                alt=""
                                            />
                                        </Link>
                                    ) : (
                                        <Link to="/login">
                                            <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                                        </Link>
                                    )}


                                </div>


                            </div>
                        </div>
                    ) : null
                }
            </div>

        </>
    )
}

export default Header