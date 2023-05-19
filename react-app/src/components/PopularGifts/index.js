import './PopularGifts.css'

export default function PopularGifts({ product }) {
    return (
        <div className="popular-product-card">
        <div className="popular-result-image-div"><img className='popular-result-img' src={product.ProductImages[0].url} alt='not found'/></div>

        <div className="popular-product-text">
            <div className="popular-product-name">{product.name}</div>
            <div className='popular-results-stars'>
            {typeof product.avgRating === 'number'?
                     Array(5).fill(1).map((s,i)=> (
                    i < product.avgRating ? (
                        <i className="fa-solid fa-star search-results-stars-gold search-stars"
                        key={i}></i>
                    ) : (
                        <i className="fa-solid fa-star search-results-stars-black grey-search-stars" key={i}></i>
                    )
                    ) ) : (
                        <span className="search-new-product">New! <i className="fa-solid fa-star search-results-stars-gold "/> </span>
                    )} {product.sales}
                    {/* <span className="popular-star-seller"><i className="fa-solid fa-certificate search-badge"></i>Star Seller</span> */}
                    </div>

        <div className="popular-result-price">${product.price}</div>

        </div>
    </div>
    )
}
