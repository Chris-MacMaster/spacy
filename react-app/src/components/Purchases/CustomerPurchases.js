import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchStorePuchases, fetchUserPuchases } from "../../store/purchase"
import LoadingIcon from "../LoadingIcon"
import './Purchases.css'

export default function UserPurchases(){
    const [user, purchases] = useSelector(state => [state.session.user, state.purchases.userPurchases])
    const dispatch = useDispatch()
    const [] = useState()
    const [hasLoaded, setHasLoaded] = useState(false)

    useEffect(async () => {
        await dispatch(fetchUserPuchases())
        return setHasLoaded(true)
    }, [dispatch])

    if(!hasLoaded) return <LoadingIcon />
    let sortedPurchases = groupItemsBySellDateThenStore(purchases)
    console.log(sortedPurchases)
    return (
    <div className="purchase-div">
        <h2>Purchases:</h2>
        {purchases && Object.keys(sortedPurchases).map(el => (
            <div className="purchase-date-div">
                <p className="purchase-date">{el.slice(0,25)}</p>
                    {console.log(sortedPurchases[el])}
                {Object.values(sortedPurchases[el]).map(item => (
                    <>
                    <p className="purchase-shop-name"> {item[0].shopName}</p>
                    <p>
                    <span>Product</span>
                    <span> Qty </span>
                    <span>Price </span>
                    <span>Product</span>
                    </p>
                    {item.map(el => (
                        <div className="purchase-item-div">
                           <div className="purchase-product-img-div"><img className="purchase-product-img" src={el.productImage} alt={`${el.productName} Image`}/></div>
                           <p>{el.productName}</p>
                           <p>{el.quality}</p>
                           <p>{el.price}</p>
                        </div>
                    ))}
                    </>
                ))}
            </div>
        ))}
    </div>
    )
}

function groupItemsBySellDateThenStore(purchases){
    const groupedItems = {}
    if(!purchases) return null
    for (const key in purchases) {
        const date = new Date(purchases[key].createdAt)
        if (!groupedItems[date]){
            groupedItems[date] = { }
        }
        if(!groupedItems[date][purchases[key].shopName]){
            groupedItems[date][purchases[key].shopName] = []
        }
            groupedItems[date][purchases[key].shopName].push(purchases[key])
    }
    return groupedItems
}
