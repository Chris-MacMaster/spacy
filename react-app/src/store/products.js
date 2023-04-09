import { csrfFetch } from './csrf'

const GET_USER_PRODUCTS = 'products/GET_USER_PRODUCTS'

const userProducts = products => ({
    type: GET_USER_PRODUCTS,
    products
})

const userProductsThunk = () => async dispatch => {
    const res = await csrfFetch(`/api/products/current`)

    if (res.ok) {
        const products = await res.json()
        return dispatch(userProducts(products))
    }
}

const initialState = {
    products: {

    },

    userProducts: {

    }
}


export default function reducer(state = initialState, action) {
    switch (action.type){
        case GET_USER_PRODUCTS:
            const newState = {...state}
            console.log(action)
            return { newState}
    }
}
