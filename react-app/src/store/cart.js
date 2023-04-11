import { actionLoadProducts } from "./product"

const LOAD_CART = 'cart/LOAD'
const ADD_TO_CART = 'cart/ADD'
const REMOVE_FROM_CART ='cart/REMOVE'
const DELETE_CART = 'cart/DELETE'

//ACTIONS

export const loadCart = cart => {
    return {
        type: LOAD_CART,
        cart
    }
}

//THUNKS

export const fetchCart = () => async dispatch => {
    const response = await fetch('/api/cart/')

    // console.log(res)
    if(response.ok) {
        const cart = await response.json()
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~", cart)
        return dispatch(loadCart(cart))
    }
}

const initialState = {
    products: {}
}

export default function cartReducer(state = initialState, action) {
    switch(action.type){
        case LOAD_CART: {
            const newState = {...state}
            // console.log("!!!!!!!!!!!!!!!",action.cart)
            newState.products = action.cart
            return newState
        }
        default: return state
    }
}
