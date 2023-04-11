const LOAD_SHOPS = 'shops/LOAD'
const LOAD_USER_SHOPS = 'shops/LOAD_USER_SHOPS'
const DELETE_SHOP = 'shops/DELETE_SHOP'

//actions
export const actionLoadShops = shops => {
    return {
        type: LOAD_SHOPS,
        shops
    }
}

//shops for landing page
export const fetchShops = () => async dispatch => {
    const response = await fetch('/api/shops')
    if (response.ok) {
        const shops = await response.json()
        dispatch(actionLoadShops(shops))
    }
}

const initialState = {}

export default function shopReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SHOPS:
            return {...state, ...action.shops}
        default: return state
    }
}
