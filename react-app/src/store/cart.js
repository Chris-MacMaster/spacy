import { actionLoadProducts } from "./product"

const LOAD_CART = 'cart/LOAD'
const ADD_TO_CART = 'cart/ADD'
const REMOVE_FROM_CART ='cart/REMOVE'
const EDIT_QUANTITY = 'cart/QUANTITY'
const DELETE_CART = 'cart/DELETE'

//ACTIONS

export const loadCart = cart => {
    return {
        type: LOAD_CART,
        cart
    }
}

export const addCartItem = cart => {
    return {
        type: ADD_TO_CART,
        cart
    }
}

export const removeFromCart = cart => {
    return {
        type: REMOVE_FROM_CART,
        cart
    }
}
//THUNKS

export const fetchCart = () => async dispatch => {
    const response = await fetch('/api/cart/')

    // console.log(res)
    if(response.ok) {
        const cart = await response.json()
        // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~", cart)
        return dispatch(loadCart(cart))
    }
}

export const addCartItemThunk = (itemId, userId) => async dispatch => {
    const response = await fetch('/api/cart/', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"product_id" : itemId, "user_id": userId})
    })
    if (response.ok){
        const item = await response.json()
        console.log("VVVVVVVVVVVVVVVV", item)
        dispatch(addCartItem(item))
        return(item)
    }
}

export const removeCartItemThunk = itemId => async dispatch => {
    const response = await fetch('/api/cart/', {
        method: 'DELETE',
        heander: {"Content-Type": "application/json"},
        body: JSON.stringify({"product_id": itemId})
    })
    if (response.ok){
        const ans = await response.json()

        return dispatch(removeCartItemThunk)
    }
}

const initialState = {
    products: {}
}

export default function cartReducer(state = initialState, action) {
    const newState = {...state}
    switch(action.type){
        case LOAD_CART: {
            // console.log("!!!!!!!!!!!!!!!",action.cart)
            newState.products = action.cart
            return newState
        }
        case ADD_TO_CART: {
            // console.log(action)
            newState.products = action.cart
            return newState
        }
        case REMOVE_FROM_CART: {
            newState.products = action.cart
            return newState
        }
        default: return state
    }
}
