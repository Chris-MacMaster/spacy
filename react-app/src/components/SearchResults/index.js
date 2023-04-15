import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchResults } from "../../store/search"
import { Link, useParams } from "react-router-dom"

import './SearchResults.css'

function SearchResults() {
    const {parameters} = useParams()
    const dispatch = useDispatch()
    // console.log(parameters)
    const products = useSelector((state) => state.search.searchResults)
    useEffect(() => {
        dispatch(getSearchResults(parameters))
    }, [dispatch, parameters])

    return (
        <div className="search-results-div">
        <div className="est-arrival">
            <span className="est-arrival-time">Esitmated Arrival Time</span>
            <span className="est-arrival-any">Any time</span>
        </div>
        <div className="productsDisplay">
        {Object.values(products).map(product => (<Link to={`/products/${product.id}`}>
            <div className="productCard">
                <div><img style={{width: 300, height: 320}} src={product.ProductImages[0].url} alt='not found'/></div>
                <div className="productName">{product.name}</div>
                {/* <div className="productRating">Stars: {product.avgRating}</div> */}
                <div>
                {product.avgRating ? new Array(Math.floor(product.avgRating)).fill(null).map(() => (
                    <i class="fas fa-star"/>
                )): 'No Reviews'} {`(${product.reviews.length})`}
                </div>
                <div className="productPrice">${product.price}</div>
                <div className="productSeller">Sold by: {product.shop.name}</div>
            </div>
        </Link>
        ))}
        </div>
        </div>
    )
}

export default SearchResults
