import { csrfFetch } from './csrf'
const LOAD_REVIEWS = "reviews/LOAD"

//**Actions */
export const actionLoadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        payload: reviews
    }
}
//**Thunks */

//PRODUCTS HOME PAGE
export const fetchProductReviews = (productId) => async dispatch => {
    // console.log("TRIGGERED")
    console.log("REVIEWS route TRIGGERED")
    const response = await csrfFetch(`/api/productReviews/${productId}`)
    const reviews = await response.json()
    if (response.ok) {
        dispatch(actionLoadReviews(reviews))
    }
}



const initialState = {
    productReviews: {},
}

//**Reducer and Cases */
export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_REVIEWS: {
            let newState;
            newState = { ...state }
            newState.productReviews = action.payload
            // resets product details when going to allreviews page
            
            return newState
        }
        default: return state
    }
}
