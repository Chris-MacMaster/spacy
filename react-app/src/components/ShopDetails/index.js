import './ShopDetails.css'

export default function ShopDetails ({ shop }) {

    return (
        <div className='shop-header'>
            <img src={`${shop.ShopImages.url}`} alt='shoplogo'></img>
            <div className='shop-businesscard'>
                <p>{shop.name}</p>
                <p>{shop.state}, {shop.country}</p>
                <p>{Math.floor(Math.random()*20000)} Sales | AvgReview </p>

            </div>

            <div>
                <p><span className='bold-text'>Smooth shipping</span> Has a history of shipping on time with tracking.</p>
            </div>
            <div className='shop-owner'>
                <img className='shop-owner-img'
                src={`${shop.ShopImages.url}`}
                alt='user'></img>
                <p>Shop Owner Name</p>
            </div>
            <div className='items-section'>
            <div className='item-category-sidebar'></div>
            <div className='item-card-display'>
                <p>Featured Items</p>
                <div className='item-cards'></div>
            </div>
            </div>
        </div>
    )
}
