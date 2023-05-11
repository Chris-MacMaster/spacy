import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProducts } from '../../store/product'

function UserProducts(){
    const dispatch = useDispatch();
    const [user, products] = useSelector(state => [state.session.user, state.products.userProducts])

    useEffect(() => {
        dispatch(fetchUserProducts())
    }, [dispatch, user])

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
