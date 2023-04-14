// import { csrfFetch } from './csrf'
const LOAD_PRODUCTS = "products/LOAD"
const LOAD_PRODUCT = "product/LOAD"
const LOAD_USER_PRODUCTS = 'products/LOAD_USER_PRODUCTS'
const POST_PRODUCT = "products/POST"

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

export const actionPostProduct = (product) => {
    return {
        type: POST_PRODUCT,
        payload: product
    }
}
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
    if (response.ok) {
        const product = await response.json()
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

export const makeProduct = (productBody) => async dispatch => {
    const { name, shop_id, description, category, available, free_shipping, price, img_1 } = productBody
    const method = "POST"
    const headers = { "Content-Type" : "application/json"}
    const body = JSON.stringify({
        name,
        shop_id,
        description,
        category,
        available,
        free_shipping,
        price,
        img_1
    })
    const options = { method, headers, body }
    const response = await fetch('/api/products/', options)
    const product = await response.json()
    // console.log("RESPONSE", response)
    //testing
    if (response.ok){
        return product 
        //so your backend has to return product
    }

}

const initialState = {
    allProducts: {},
    singleProduct: {},
    userProducts: {},
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
            let newState = { ...state, singleProduct: {...state.singleProduct} }
            newState.singleProduct = {...action.payload}
            return newState
        }
        case LOAD_USER_PRODUCTS: {
            const newState = {...state}
            // console.log("FDASFDSAFAD", action.payload)
            newState.userProducts = {...action.payload}
            return newState
        }
        case POST_PRODUCT: {
            const newState = { ...state }
            newState.singleProduct = action.payload
            return newState
        }
        default: return state
    }
}
