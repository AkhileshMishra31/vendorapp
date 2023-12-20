import React, { useEffect, useState } from 'react'
import styles from '../../style/style';
import ProductCard from "../Route/ProductCard/ProductCard"
import { productData } from '../../static/data';

const SuggestedProduct = ({ data }) => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        console.log(productData)
        console.log(data)
        const d = productData.filter((i) => i.category == data.category);
        console.log(productData)
        setProducts(d);
    }, [])
    return (
        <div>
            {
                data ? (
                    <div className={`p-4 ${styles.section}`}>
                        <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
                            Related Products
                        </h2>
                        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-5 lg:gap-[25px] mb-12'>
                            {
                                products && products.map((i, index) => {
                                    return (
                                        <ProductCard data={i} key={index} />
                                    )
                                })
                            }
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default SuggestedProduct