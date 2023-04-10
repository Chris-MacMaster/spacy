import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProducts } from '../../store/product'

function UserProducts(){
    const dispatch = useDispatch();
    const [user, products] = useSelector(state => [state.session.user, state.products.UserProducts])

    useEffect(() => {
        dispatch(fetchUserProducts())
    }, [dispatch, user])
    console.log(products)

    return (
        <>
        <h1>These are your products</h1>
        </>
    )
}

export default UserProducts
