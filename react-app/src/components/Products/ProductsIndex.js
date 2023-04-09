import { useSelector, useDispatch } from "react-redux";

import ProductIndexItem from "./ProductIndexItem";
import { useEffect } from "react";
import { fetchProducts } from "../../store/product";


function ProductsIndex() {
    console.log("TRIGGERED PRODUCTS INDEX COMPONENT")
    const dispatch = useDispatch()

    const productState = useSelector(state => state.products.allProducts)

    const products = Object.values(productState)
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (

        <div className="products-index">
            <div className="productIndex">
                {products.map(product => (
                    <ProductIndexItem title={product.name} product={product} key={product.id} />
                ))}
            </div>
        </div>
    )
}

export default ProductsIndex;


