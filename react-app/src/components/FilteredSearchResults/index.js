import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

import { getFilteredSearchResults } from "../../store/search"

import '../SearchResults/SearchResults.css'

function FilteredSearchResults() {

    const dispatch = useDispatch()

    const {category} = useParams()

    console.log(category)

    const products = useSelector((state) => state.search.filteredSearch)

    useEffect(() => {
        dispatch(getFilteredSearchResults(category))
    }, [dispatch, category])
    console.log('products',products)

    if (!products) {
        return null
    }

    return (
        // <h1>nothing</h1>
        // <h1>Filtered Search Results</h1>
        <>
        <h1>Results:</h1>
        <div className="productsDisplay">
        {Object.values(products).map(product => (<Link to={`/products/${product.id}`}>
            <div className="productCard">
                <div><img style={{width: 300, height: 320}} src={product.ProductImages[0]?.url} alt='not found'/></div>
                <div className="productName">{product.name}</div>
                {/* <div className="productRating">Stars: {product.avgRating}</div> */}
                <div>
                {product.avgRating ? new Array(Math.floor(product.avgRating)).fill(null).map(() => (
                    <i class="fas fa-star"/>
                )): 'No Reviews'} {`(${product.reviews?.length})`}
                </div>
                <div className="productPrice">${product.price}</div>
                <div className="productSeller">Sold by: {product.shop?.name}</div>
            </div>
        </Link>
        ))}
        </div>
        </>
    )
}

export default FilteredSearchResults
