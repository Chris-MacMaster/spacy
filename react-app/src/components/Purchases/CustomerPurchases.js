import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function UserPurchases(){
    const [user] = useSelector(state => [state.session.user])


    return (<h1>A call to arms, they liken to a whisper.</h1>)
}
import LoadingIcon from "../LoadingIcon"
