import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchResults } from "../../store/search"
import { useLocation, useParams } from "react-router-dom"

import './SearchResults.css'

function SearchResults() {
    // const [products, setProducts] = useState({})
    // const location = useLocation()
    // // const parameters = new URLSearchParams(location.search).get('query')
    // const searchResults = useSelector((state) => state.search.searchResults)
    
    // const {parameters} = useParams()

    
    // const dispatch = useDispatch()

    // const altSearchResults = dispatch(getSearchResults(parameters))
    
    // console.log('search results', searchResults)
    // useEffect(() => {
    //     // dispatch(getSearchResults(parameters))
    //     setProducts(searchResults)
    //     // setProducts(altSearchResults)
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(getSearchResults(parameters))   
    //  }, [])

    // if (Object.values(searchResults).length < 1) {
    //     return (
    //         <h1>No Results</h1>
    //     )
    // }



    // alternate

    const {parameters} = useParams()
    const dispatch = useDispatch()
    console.log(parameters)

    // const [products, setProducts] = useState({})
    const products = useSelector((state) => state.search.searchResults)

    // const searchResults = dispatch(getSearchResults(parameters))

    // console.log('searchResults', searchResults)

    useEffect(() => {
        dispatch(getSearchResults(parameters))
        // console.log('search results', searchResults)
        // setProducts(searchResults)
    }, [])
    // useEffect(() =>  {
    //     let searchResults;
    //     async function search (parameters) {
    //         searchResults = await dispatch(getSearchResults(parameters))
    //     }
    //     search(parameters)
    //     // setloading(!loading)
    // }, [])

    // if (Object.values(products).length < 1) {
    //     return (
    //         <h1>No Results</h1>
    //     )
    // }

    return (
        <>
        <h1>Results:</h1>
        {Object.values(products).map(product => (
            <div>
                <div><img style={{width: 300, height: 320}} src={product.ProductImages[0].url}/></div>
                <div>{product.name}</div>
                {/* <div className="productRating">Stars: {product.avgRating}</div> */}
                <div>
                {new Array(Math.floor(product.avgRating)).fill(null).map(() => (
                    <i class="fas fa-star"/>
                ))} {`(${product.reviews.length})`}
                </div>
                <div className="productPrice">${product.price}</div>
                <div className="productSeller">Sold by: {product.shop.name}</div>
            </div>
        ))}
        </>
    )
}

export default SearchResults