const LOAD_REVIEWS = "reviews/LOAD"
const POST_REVIEW = 'reviews/POST'
const LOAD_ONE_REVIEW = 'reviews/LOAD_ONE'
const EDIT_REVIEW = 'reviews/EDIT'
const DELETE_REVIEW = 'reviews/DELETE'
//**Actions */
export const actionLoadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        payload: reviews
    }
}

export const actionLoadSingleReview = (review) => {
    return {
        type: LOAD_ONE_REVIEW,
        review
    }
}

export const actionPostReview = (newReview) => {
    return {
        type: POST_REVIEW,
        newReview
    }
}

export const actionEditReview = (editedReview) => {
    return {
        type: EDIT_REVIEW,
        editedReview
    }
}

const actionDeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}
//**Thunks */

//PRODUCTS HOME PAGE
export const fetchProductReviews = (productId) => async dispatch => {
    if (!productId) return
    const response = await fetch(`/api/product-reviews/${productId}`)
    if (response.ok) {
        const reviews = await response.json()
        dispatch(actionLoadReviews(reviews))
        return reviews
    }
}

export const createProductReview = (productId, review, stars, image) => async dispatch => {

    let res
    if (image) {
        res = await fetch(`/api/product-reviews/${productId}/new`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                'review': review,
                'stars': stars,
                'image': image
            })
        })
    } else {
        res = await fetch(`/api/product-reviews/${productId}/new`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                'review': review,
                'stars': stars
            })
        })
    }

    if (res.ok) {
        const newReview = await res.json()
        dispatch(actionPostReview(newReview))
        return newReview
    }
}

export const getOneReview = (reviewId) => async dispatch => {
    const res = await fetch(`/api/product-reviews/search/${reviewId}`)
    if (res.ok) {
        const review = await res.json()
        dispatch(actionLoadSingleReview(review))
        return review
    }
}

export const editReview = (reviewId, review, stars) => async dispatch => {
    const res = await fetch(`/api/product-reviews/${reviewId}/edit`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'review': review,
            'stars': stars
        })
    })

    if (res.ok) {
        const editedReview = await res.json()
        dispatch(actionEditReview(editedReview))
        return editedReview
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const res = await fetch(`/api/product-reviews/${reviewId}/delete`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if (res.ok) {
        const deleted = await res.json()
        await dispatch(actionDeleteReview(reviewId))
        return deleted
    }
}

const initialState = {
    productReviews: {},
    singleReviewPost: {},
    singleReviewGet: {}
}

//**Reducer and Cases */
export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = {...state,
                singleReviewPost: {...state.singleReviewPost},
                singleReviewGet: {...state.singleReviewGet}}
            newState.productReviews = action.payload
            return newState
        }
        case POST_REVIEW: {
            const newState2 = {...state,
                productReviews: {...state.productReviews},
                singleReviewPost: {...state.singleReviewPost},
                singleReviewGet: {...state.singleReviewGet}}
            newState2.productReviews[action.newReview.id] = {...action.newReview}
            newState2.singleReviewPost[action.newReview.id] = {...action.newReview}
            return newState2
        }
        case LOAD_ONE_REVIEW: {
            const newState3 = {...state,
                productReviews: {...state.productReviews},
                singleReviewPost: {...state.singleReviewPost},
                singleReviewGet: {...state.singleReviewGet}}
            newState3.singleReviewGet = {...action.review}
            return newState3
        }
        case EDIT_REVIEW: {
            const newState4 = {...state,
                productReviews: {...state.productReviews},
                singleReviewPost: {...state.singleReviewPost},
                singleReviewGet: {...state.singleReviewGet}}
            newState4.editedReview = {}
            newState4.editedReview = {...action.editedReview}
            return newState4
        }
        case DELETE_REVIEW: {
            const newState5 = {...state,
                productReviews: {...state.productReviews},
                singleReviewPost: {...state.singleReviewPost},
                singleReviewGet: {...state.singleReviewGet}
            }

            delete newState5.productReviews[action.reviewId]
            return newState5
        }
        default: return state
    }
}
