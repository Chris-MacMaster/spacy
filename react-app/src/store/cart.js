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

export const checkoutCart = () => {
    return {
        type: DELETE_CART
    }
}
export const editItemQuantity = cart => {
    return {
        type: EDIT_QUANTITY,
        cart
    }
}
//THUNKS

export const fetchCart = () => async dispatch => {
    const response = await fetch('/api/cart/')
    if(response.ok) {
        const cart = await response.json()
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
        dispatch(addCartItem(item))
        return(item)
    }
}

export const removeCartItemThunk = (cartId) => async dispatch => {
    console.log(cartId)
    const response = await fetch('/api/cart/', {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"cart_id": cartId})
    })
    if (response.ok){
        return dispatch(removeFromCart(cartId))
    }
}
export const checkoutCartThunk = () => async dispatch => {
    const response = await fetch('/api/cart/empty', {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify()
    })
    if (response.ok){
        return dispatch(checkoutCart())
    }
}

export const editCartItemThunk = (cartId, quantity, userId, productId) =>  async dispatch =>{
    const response = await fetch('/api/cart/', {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"quantity": quantity, "user_id": userId, "product_id": productId, "cart_id": cartId})
    })
    if (response.ok){
        console.log("Oh me, oh my!")

        const cart = await response.json()
        console.log(cart)
        return dispatch(editItemQuantity(cart))
    }
}


const initialState = {
    products: {}
}

export default function cartReducer(state = initialState, action) {
    const newState = {...state}
    newState.products = {...state.products}
    switch(action.type){
        case LOAD_CART: {
            newState.products = action.cart
            return newState
        }
        case ADD_TO_CART: {
            newState.products = action.cart
            return newState
        }
        case REMOVE_FROM_CART: {
            delete newState.products[action.cart]
            return newState
        }
        case DELETE_CART :{
            newState.products = {}
            return newState
        }
        case EDIT_QUANTITY : {
            newState[action.cart.id] = action.cart
            return newState
        }
        default: return state
    }
}
