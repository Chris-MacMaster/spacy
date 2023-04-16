import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchResults } from "../../store/search"
import { NavLink, useParams } from "react-router-dom"

import './SearchResults.css'

function SearchResults() {
    const {parameters} = useParams()
    const dispatch = useDispatch()
    // console.log(parameters)
    const products = useSelector((state) => state.search.searchResults)
    useEffect(() => {
        dispatch(getSearchResults(parameters))
    }, [dispatch, parameters])


    if (!Object.values(products).length) {
        return (
            <h1>No Results</h1>
        )
    }

    return (
        <div className="search-results-div">
        <div className="est-arrival">
            <span className="est-arrival-time">Esitmated Arrival Time </span>
            <span className="est-arrival-any">Any time</span>
        </div>
        <div className="search-result-display">
        {Object.values(products).map(product => (
        <NavLink to={`/products/${product.id}`}
        style={{ textDecoration: 'none' }}>
            <div className="search-product-card">
                <div className="search-result-image-div"><img className='search-result-img' src={product.ProductImages[0].url} alt='not found'/></div>

                <div className="search-product-text">
                    <p className="search-product-name">{product.name}</p>
                    <p className='search-results-stars'>
                    {typeof product.avgRating === 'number'?
                             Array(5).fill(1).map((s,i)=> (
                            i < product.avgRating ? (
                                <i className="fa-solid fa-star search-results-stars-gold search-stars"
                                key={i}></i>
                            ) : (
                                <i className="fa-solid fa-star search-results-stars-black grey-search-stars" key={i}></i>
                            )
                            ) ) : (
                                <span className="search-new-product">New! <i className="fa-solid fa-star gold-star search-results-stars"/> </span>
                            )} {product.sales}
                            <span className="search-star-seller"><i className="fa-solid fa-certificate search-badge"></i>Star Seller</span></p>

                <p className="search-result-price">${product.price}</p>
                <p className="search-result-shop">{product.shop.name}</p>
                <p className="search-more-like">More Like This <i className="fa-solid fa-arrow-right search-more-like"></i></p>

                </div>
            </div>
        </NavLink>
        ))}
        </div>
        </div>
    )
}

export default SearchResults
