import React, { useEffect, useState } from 'react'
import Footer from '../components/Route/Footer/Footer'
import ProductDetails from "../components/Products/ProductDetails.jsx"
import Header from '../components/Layout/Header.jsx'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data.js'
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx"

const ProductPageDetails = () => {
    const { name } = useParams();
    const [data, setdata] = useState(null);
    const productName = name.replace(/-/g, "");

    useEffect(() => {
        const data = productData.find((i) => i.name === productName)
        setdata(data);
    }, [])
    return (
        <div>
            <Header />
            <ProductDetails data={data} />
            {
                data && (
                    <SuggestedProduct data={data}/>
                )
            }
            <Footer />
        </div>
    )
}

export default ProductPageDetails