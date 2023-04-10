import { csrfFetch } from './csrf'
const LOAD_PRODUCTS = "products/LOAD"

const LOAD_PRODUCT = "product/LOAD"
const LOAD_USER_PRODUCTS = 'products/LOAD_USER_PRODUCTS'



//**Actions */
export const actionLoadProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products
    }
}

export const actionLoadProduct = (product) => {
    return {
        type: LOAD_PRODUCT,
        payload: product
    }
}

export const userProducts = products => ({
    type: LOAD_USER_PRODUCTS,
    payload: products
})
//**Thunks */

//PRODUCTS HOME PAGE
export const fetchProducts = () => async dispatch => {
    // console.log("TRIGGERED")
    const response = await fetch('/api/products')

    if (response.ok) {
        const products = await response.json()
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
export const fetchUserProducts = () => async dispatch => {
    const response = await fetch(`/api/products/current`)

    if (response.ok) {
        const products = await response.json()
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
        case LOAD_PRODUCT: {
            let newState = { ...state }
            newState.singleProduct = action.payload
            return newState
        }
        case LOAD_USER_PRODUCTS: {
            const newState = {...state}
            console.log("FDASFDSAFAD", action.payload)
            newState.userProducts = {...action.payload}
            return newState
        }
        default: return state
    }
}
