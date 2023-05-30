// import { csrfFetch } from './csrf'
const LOAD_PRODUCTS = "products/LOAD"
const LOAD_PRODUCT = "product/LOAD"
const LOAD_USER_PRODUCTS = 'products/LOAD_USER_PRODUCTS'
const POST_PRODUCT = "products/POST"
const DELETE_PRODUCT = "products/DELETE"

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

export const actionDeleteProduct = (id) => {
    return {
        type: DELETE_PRODUCT,
        payload: id
    }
}
//**Thunks */

//PRODUCTS HOME PAGE
export const fetchProducts = () => async dispatch => {
    const response = await fetch('/api/products')
    if (response.ok) {
        const products = await response.json()
        dispatch(actionLoadProducts(products))
    }
}

export const fetchOneProduct = (id) => async dispatch => {
    const response = await fetch(`/api/products/${id}/`)
    if (response.ok) {
        const product = await response.json()
        dispatch(actionLoadProduct(product))
        return product
    }
}

export const followProductShop = (id) => async dispatch => {
    const response = await fetch(`/api/products/${id}/`)
    if (response.ok) {
        const product = await response.json()
        product.Shop.Followed.Status = "Followed"
        dispatch(actionLoadProduct(product))
        return product
    }
}

export const unfollowProductShop = (id) => async dispatch => {
    const response = await fetch(`/api/products/${id}/`)
    if (response.ok) {
        const product = await response.json()
        product.Shop.Followed.Status = "Not Followed"
        dispatch(actionLoadProduct(product))
        return product
    }
}

export const fetchUserProducts = () => async dispatch => {
    const response = await fetch(`/api/products/current`)

    if (response.ok) {
        const products = await response.json()
        return dispatch(userProducts(products))
    }
}

export const makeProduct = (formData) => async dispatch => {
    console.log('FORM DATA IN THUNK', formData)
    const response = await fetch('/api/products/', {
        method: 'POST',
        body: formData
    })
    if (response.ok){
        const product = await response.json()
        return product
    }

}

export const editProduct = (productBody, productId) => async dispatch => {
    const { name, shop_id, description, category, available, free_shipping, price, url } = productBody
    const method = "PUT"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({
        name,
        shop_id,
        description,
        category,
        available,
        free_shipping,
        price,
        url
    })
    const options = { method, headers, body }
    const response = await fetch(`/api/products/${productId}/`, options)

    if (response.ok) {
        const product = await response.json()
        return product
    }

}

export const deleteProduct = (id) => async dispatch => {
    const response = await fetch(`/api/products/${id}/`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        const deleteData = await response.json()
        dispatch(actionDeleteProduct(id))
        return deleteData
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
            return { ...state, allProducts: { ...action.products}, singleProduct: {...state.singleProduct}}
        }
        case LOAD_PRODUCT: {
            return { ...state, singleProduct: {...action.payload} }
        }
        case LOAD_USER_PRODUCTS: {
            return {...state, userProducts: { ...action.payload } }
        }
        case POST_PRODUCT: {
            return { ...state, singleProduct: { ...action.payload } }
        }
        case DELETE_PRODUCT: {
            const newState = { ...state, allProducts: {...state.allProducts } }
            delete newState.allProducts[action.payload]
            return newState
        }
        default: return state
    }
}
