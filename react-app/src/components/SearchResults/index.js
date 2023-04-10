import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchResults } from "../../store/search"
import { useLocation, useParams } from "react-router-dom"



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

    const [products, setProducts] = useState({})

    // const searchResults = dispatch(getSearchResults(parameters))

    // console.log('searchResults', searchResults)

    useEffect(() => {
        const searchResults = dispatch(getSearchResults(parameters))
        console.log('search results', searchResults)
        setProducts(searchResults)
    }, [])

    if (Object.values(products).length < 1) {
        return (
            <h1>No Results</h1>
        )
    }

    return (
        <>
        <h1>Results:</h1>
        {Object.values(products).map(product => (
            <div>
                <div><img src={product.ProductImages[0].url}/></div>
                <div>{product.price}</div>
            </div>
        ))}
        </>
    )
}

export default SearchResults