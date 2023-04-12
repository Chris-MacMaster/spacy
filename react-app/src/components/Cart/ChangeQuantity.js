import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCart, } from "../../store/cart"
import Select from 'react-select'

export default function ChangeQuantity({cartId, quantity}){


    useEffect(() => {
        dispatchEvent()
    })

    const options = []

    for (i = 1; i < 200; i++){
        options.push({value: i})
    }

    return (

        <>

        </>
    )
}
