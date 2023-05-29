import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchStorePuchases, fetchUserPuchases } from "../../store/purchase"
import LoadingIcon from "../LoadingIcon"
import './Purchases.css'

export default function UserPurchases(){
    const purchases = useSelector(state => state.purchases.userPurchases)
    const dispatch = useDispatch()
    const [hasLoaded, setHasLoaded] = useState(false)
    const [totalCost, setTotalCost] = useState(0)
    useEffect(async () => {
        await dispatch(fetchUserPuchases())
        return setHasLoaded(true)
    }, [dispatch])

    if(!hasLoaded) return <LoadingIcon />
    let sortedPurchases = groupItemsBySellDateThenStore(purchases)
    // console.log(sortedPurchases)
    return (
    <div className="purchase-div">
        <h2>Purchases:</h2>
        {purchases && Object.keys(sortedPurchases).map(el => (
            <div className="purchase-date-div">
                <p className="purchase-date">{el.slice(0,25)}</p>

                {Object.values(sortedPurchases[el]).map(item => (
                    <div className="purchase-shop-div">
                        <div className="purchase-shop-name"> {item[0].shopName}</div>
                        <div className="two">Product</div>
                        <div className="three">Qty </div>
                        <div className="four">Price</div>
                        <div className="five">Total</div>
                        {/* <div className="item-map-div"> */}
                            {item.map(el => (
                                // <div className="purchase-item-div">
                                <>
                                <div className="purchase-product-img-div one"><img className="purchase-product-img one" src={el.productImage} alt={`${el.productName} Image`}/></div>
                                <div className="two">{el.productName}</div>
                                <div className="three">{el.quantity}</div>
                                <div className="four">{el.price}</div>
                                <div className="five">${(el.price * el.quantity).toFixed(2)}</div>
                                </>
                            ))}

                        <div className="five bld">${item.reduce((acc, el) => {
                                return acc + (el.quantity * el.price)
                             }, 0).toFixed(2)}
                        </div>
                        </div>
                    // </div>
                ))}
            </div>
        ))}
    </div>
    )
}

function groupItemsBySellDateThenStore(purchases){
    //This function takes a normalized object contatining all the purchases and then
    //bundles them together first by date, then by store.
    ///It returns an object that looks like this
    /*
    {date1: { store1: [item1, item2], store2: [item3]}, date2: {store3: [item1]}}
    or thereabouts.
    */
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
