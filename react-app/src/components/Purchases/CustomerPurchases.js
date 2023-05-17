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
                    <div className="purchase-shop-div">
                        <div className="purchase-shop-name"> {item[0].shopName}</div>
                        <div className="two">Product</div>
                        <div className="three">Qty </div>
                        <div className="four">Price</div>
                        {/* <div className="item-map-div"> */}
                            {item.map(el => (
                                // <div className="purchase-item-div">
                                <>
                                <div className="purchase-product-img-div one"><img className="purchase-product-img one" src={el.productImage} alt={`${el.productName} Image`}/></div>
                                <div className="two">{el.productName}</div>
                                <div className="three">{el.quantity}</div>
                                <div className="four">{el.price}</div>
                                <div>{el.price * el.quantity}</div>
                                {/* </div> */}
                                </>
                            ))}
                        </div>
                    // </div>
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
