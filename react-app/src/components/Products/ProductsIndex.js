import { useSelector, useDispatch } from "react-redux";

import ProductIndexItem from "./ProductIndexItem";
import { useEffect } from "react";
import { fetchProducts } from "../../store/product";


function ProductsIndex() {
    // console.log("TRIGGERED PRODUCTS INDEX COMPONENT")
    const dispatch = useDispatch()

    const productState = useSelector(state => state.products.allProducts)

    const products = Object.values(productState)
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    // console.log("PRODUCTS", products)

    // takes in object, returns array of objects



    if (!products.length) {
        return <>{console.log("WHAT?")}</>
    }

    // console.log("!!!!!!!", Object.values(products[0]))
    return (
        <div className="products-index">
            <div className="productIndex">
                {Object.values(products[0]).map(product => (
                    <>
                    {console.log("++++++++++++++++++", product)}
                    <ProductIndexItem title={product.name} product={product} key={product.id} />
                    </>
                ))}
            </div>
        </div>
    )
}

export default ProductsIndex;