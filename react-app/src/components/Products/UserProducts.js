import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProducts } from '../../store/product'

function UserProducts(){
    const history = useHistory()
    const dispatch = useDispatch();
    const [user, products] = useSelector(state => {
        console.log(state)
        return [state.session.user, state.productReducer.userProducts]}
        )

    useEffect(() => {
        dispatch(fetchUserProducts())
    }, [dispatch, user])
    // console.log("!!!!!", products)
    // console.log(user)
    // console.log(!Object.values(products).length && !user)

    // if(!Object.values(products).length && !user){
    //     return <>{history.push('/')}</>
    // }

    if(!products) return <h2>You must list an item for sale in order to sell it!</h2>

    return (
        <>
        <h1>These are your products</h1>
        <div className="user-products">
            <ul>
                <div className="user-product">
                    {Object.values(products).map(product => (
                    <li key={product.id}>{product.name}</li>))}
                </div>
            </ul>
        </div>
        </>
    )
}

export default UserProducts
