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
    console.log("REVIEWS route TRIGGERED")
    // const response = await fetch(`/api/product-reviews/${productId}`)
    const response = await fetch(`/api/product-reviews/${productId}`)
    const reviews = await response.json()
    if (response.ok) {
        dispatch(actionLoadReviews(reviews))
    }
}

export const getAllReviews = () => async dispatch => {

}


// export const addImageToReview = (reviewId, imageUrl) => async dispatch => {
//     const res = await fetch(`/api/product-reviews/${reviewId}/add-image`, {
//         method: 'PUT',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//             'image': imageUrl
//         })
//     })
// }


export const createProductReview = (productId, review, stars, image) => async dispatch => {
    console.log('thunk hit')
    console.log('thunk image', image)
    console.log(productId)
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
        console.log('res ok')
        let newReview = await res.json()
        console.log('newReview json', newReview)
        dispatch(actionPostReview(newReview))
        // return newReview
    }
}

export const getOneReview = (reviewId) => async dispatch => {
    console.log('thunk hit')
    const res = await fetch(`/api/product-reviews/search/${reviewId}`)

    if (res.ok) {
        console.log('res ok')
        let review = await res.json()
        console.log('review get json', review)
        dispatch(actionLoadSingleReview(review))
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
        let editedReview = await res.json()
        dispatch(actionEditReview(editedReview))
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const res = await fetch(`/api/product-reviews/${reviewId}/delete`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (res.ok) {
        await dispatch(actionDeleteReview(reviewId))
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
            let newState;
            newState = { ...state }
            console.log('newState', newState)
            console.log('payload', action.payload)
            newState.productReviews = action.payload
            // resets product details when going to allreviews page

            return newState
        }
        case POST_REVIEW: {
            console.log('reducer')
            // const newState2 = {}
            const newState2 = {...state, productReviews: {...state.productReviews}, singleReviewPost: {...state.singleReviewPost}, singleReviewGet: {...state.singleReviewGet}}
            newState2.productReviews[action.newReview.id] = {...action.newReview}

            console.log('revew id', action.newReview.id)
        
            newState2.singleReviewPost[action.newReview.id] = {...action.newReview} 

            console.log('newState2', newState2)
            
            return newState2
        }
        case LOAD_ONE_REVIEW: {
            const newState3 = {...state, productReviews: {...state.productReviews}, singleReviewPost: {...state.singleReviewPost}, singleReviewGet: {...state.singleReviewGet}}

            newState3.singleReviewGet = {...action.review}

            return newState3
        }
        case EDIT_REVIEW: {
            const newState4 = {...state, productReviews: {...state.productReviews}, singleReviewPost: {...state.singleReviewPost}, singleReviewGet: {...state.singleReviewGet}}

            newState4.editedReview = {}
            newState4.editedReview = {...action.editedReview}

            return newState4
        }
        case DELETE_REVIEW: {
            console.log('reducer')
            const newState5 = {...state, singleReviewPost: {...state.singleReviewPost}, singleReviewGet: {...state.singleReviewGet}}

            // newState5.singleReviewGet = {...state.singleReviewGet}

            state.productReviews.map(review => (newState5.productReviews[review.id] = review ))

            console.log('newState5', newState5)

            // newState5.productReviews[state.singleReviewGet.id] = {...action.singleReviewGet}
            // delete newState5.productReviews[state.singleReviewGet.id]
            delete newState5.singleReviewGet

            return newState5
        }
        default: return state
    }
}
