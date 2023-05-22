import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart, editCartItemThunk } from "../../store/cart"

export default function ChangeQuantity({cartId, quantity, productId, available}){
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()


    const options = []
    for (let i = 1; i <= available; i++){
        options.push({value: i})
    }

    const func = async updatedQuantity => {
        await dispatch(editCartItemThunk(cartId, updatedQuantity, user.id, productId, available))
        // await dispatch(fetchCart()) //Only way I could get it to re-render without infinite rerender. :| I don't like it, and want to refactor it, but also want to move on and make more progress.
    }


    if(available <= 1) return <></>

    if(!user){
        return <>
        <select value={quantity} onChange={e => func(e.target.value)}
        className="cart-select-quantity">
            {options.map(i => (
            <option value={i.value}>{i.value}</option>
            ))}
        </select>
        </>
    }

    return (
        <>
            <select value={quantity} onChange={e => func(e.target.value)}
            className="cart-select-quantity">
                {options.map(i => (
                <option value={i.value}>{i.value}</option>
                ))}
            </select>
        </>
    )
}
