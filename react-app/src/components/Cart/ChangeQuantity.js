import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart, editCartItemThunk } from "../../store/cart"

export default function ChangeQuantity({cartId, quantity, productId}){
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const options = []
    for (let i = 1; i <= 200; i++){
        options.push({value: i})
    }

    const func = updatedQuantity => {
        dispatch(editCartItemThunk(cartId, updatedQuantity, user.id, productId))
        dispatch(fetchCart()) //Only way I could get it to re-render without infinite rerender. :| I don't like it, and want to refactor it, but also want to move on and make more progress.
    }

    return (
        <>
            <select value={quantity} onChange={e => func(e.target.value)}>
                {options.map(i => (
                <option value={i.value}>{i.value}</option>
                ))}
            </select>
        </>
    )
}
