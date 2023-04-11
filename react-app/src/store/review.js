const LOAD_REVIEWS = "reviews/LOAD"
const POST_REVIEW = 'reviews/POST'
//**Actions */
export const actionLoadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        payload: reviews
    }
}

export const actionPostReview = (newReview) => {
    return {
        type: POST_REVIEW,
        newReview
    }
}
//**Thunks */

//PRODUCTS HOME PAGE
export const fetchProductReviews = (productId) => async dispatch => {
    console.log("REVIEWS route TRIGGERED")
    const response = await fetch(`/api/product-reviews/${productId}`)
    const reviews = await response.json()
    if (response.ok) {
        dispatch(actionLoadReviews(reviews))
    }
}

export const createProductReview = (productId, review, stars) => async dispatch => {
    const res = await fetch(`/api/product-reviews/${productId}/new`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'review': review,
            'stars': stars
        })
    })

    if (res.ok) {
        let newReview = res.json()
        dispatch(actionPostReview(newReview))
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
        case POST_REVIEW: {
            const newState2 = {...state, productReviews: {...state.productReviews}}
            
            newState2.newReview = {...action.newReview}
            
            return newState2
        }
        default: return state
    }
}