import React from 'react'
import styles from '../../../style/style'
import CountDown from "./CountDown.js"

const EventCard = () => {
    
    return (
        <div className='w-full block lg:flex bg-white rounded-lg p-[5px]'>
            {/* image */}
            <div className='w-full lg:w-[50%] m-auto'>
                <img src="https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg" alt="#" />
            </div>
            {/* rightsectionm */}
            <div className='w-full lg:w-[50%] m-auto flex flex-col justify-center'>
                <h2 className={`${styles.productTitle}`}>Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour</h2>
                <p >
                    Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.
                </p>
                <div className='flex py-2 justify-between'>
                    <div className='flex'>
                        <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>
                            100095$
                        </h5>
                        <h5 className='font-bold text-[18px] text-[#090909] pr-3'>
                            100000$
                        </h5>
                    </div>
                    <span className='text-[#288316] font-[400] text-[17px]'>120 sold</span>
                </div>
                <CountDown/>

            </div>
        </div>
    )
}

export default EventCard