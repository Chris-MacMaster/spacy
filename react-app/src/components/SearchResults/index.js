import { useSelector } from "react-redux"



function SearchResults() {
    const products = useSelector((state) => state.search.searchResults)
    console.log('products', Object.values(products))

    if (Object.values(products).length < 1) {
        return (
            <h1>No Results</h1>
        )
    }

    return (
        <>
        <h1>Results:</h1>
        {products && Object.values(products).map(product => {
            <div>
                <div><img src={product.ProductImages[0].url}/></div>
                <div>{product.price}</div>
            </div>
        })}
        </>
    )
}

export default SearchResults