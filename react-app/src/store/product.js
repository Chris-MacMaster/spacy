const LOAD_PRODUCTS = "products/LOAD"

//**Actions */
export const actionLoadProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        payload: products
    }
}

const initialState = {
    allProducts: {},
    singleProduct: {}
}

//**Reducer and Cases */
export default function productReducer(state = initialState, action) {
    let newState

    switch (action.type) {
        case LOAD_PRODUCTS: {
            newState = {...state}
            newState.allProducts = action.payload
            // resets product details when going to allProducts page
            newState.singleProduct = {}
            return newState
        }
        default: return state
    }
}


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
