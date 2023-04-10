import { csrfFetch } from './csrf'
const LOAD_PRODUCTS = "products/LOAD"

const LOAD_USER_PRODUCTS = 'products/LOAD_USER_PRODUCTS'


const LOAD_PRODUCT = "product/LOAD"

//**Actions */
export const actionLoadProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        payload: products
    }
}

export const actionLoadProduct = (product) => {
    return {
        type: LOAD_PRODUCT,
        payload: product
    }
}





const userProducts = products => ({
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

export const fetchOneProduct = (id) => async dispatch => {
    const response = await fetch(`/api/products/${id}`)
    const product = await response.json()
    if (response.ok) {
        dispatch(actionLoadProduct(product))
    }
}

const fetchUserProducts = () => async dispatch => {
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
            let newState;
            newState = {...state}
            newState.allProducts = action.payload
            // resets product details when going to allProducts page
            newState.singleProduct = {}
            return newState
        }
        case LOAD_PRODUCT: {
            let newState = { ...state }
            newState.singleProduct = action.payload
            return newState
        }
        case LOAD_USER_PRODUCTS:
            const newState = {...state}
            console.log(action)
            return { newState}


        default: return state
    }
}
