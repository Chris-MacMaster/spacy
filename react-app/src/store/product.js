import { csrfFetch } from './csrf'
const LOAD_PRODUCTS = "products/LOAD"

const LOAD_USER_PRODUCTS = 'products/LOAD_USER_PRODUCTS'



//**Actions */
export const actionLoadProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products
    }
}

export const userProducts = products => ({
    type: LOAD_USER_PRODUCTS,
    products
})
//**Thunks */

//PRODUCTS HOME PAGE
export const fetchProducts = () => async dispatch => {
    // console.log("TRIGGERED")
    const response = await fetch('/api/products')
    const products = await response.json()
    if (response.ok) {
        dispatch(actionLoadProducts(products))
    }
}

export const fetchUserProducts = () => async dispatch => {
    const res = await csrfFetch(`/api/products/current`)

    if (res.ok) {
        const products = await res.json()
        return dispatch(userProducts(products))
    }
}

const initialState = {
    allProducts: {},
    singleProduct: {},
    userProducts: {}
}

//**Reducer and Cases */
export default function productReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_PRODUCTS: {
            const newState = {...state}
            newState.allProducts = action.products
            // resets product details when going to allProducts page
            newState.singleProduct = {}
            return newState
        }
        case LOAD_USER_PRODUCTS:
            const newState = {...state}
            console.log(action)
            return { newState}


        default: return state
    }
}
