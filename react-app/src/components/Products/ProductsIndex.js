import { useSelector, useDispatch } from "react-redux";

import ProductIndexItem from "./ProductIndexItem";
import { useEffect } from "react";
import { fetchProducts } from "../../store/product";

function ProductsIndex() {
    const dispatch = useDispatch()
    const productState = useSelector(state => state.products.allProducts)
    const products = Object.values(productState)
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (!products.length) {
        return null
    }

    return (
        <div className="products-index">
            <div className="productIndex">
                {Object.values(products).map(product => (
                    <ProductIndexItem title={product.name} product={product} key={product.id} />
                ))}
            </div>
        </div>
    )
}

export default ProductsIndex;
