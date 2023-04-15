const LOAD_SHOPS = 'shops/LOAD'
// const LOAD_USER_SHOPS = 'shops/LOAD_USER_SHOPS'
// const DELETE_SHOP = 'shops/DELETE_SHOP'
const LOAD_ONE_SHOP = 'shops/LOAD_ONE_SHOP'
const POST_SHOP = 'shops/POST_SHOP'
//actions
export const actionLoadShops = shops => {
    return {
        type: LOAD_SHOPS,
        shops
    }
}
export const loadOneShop = shop => {
    return {
        type: LOAD_ONE_SHOP,
        shop
    }
}
export const postShop = (newShop) => {
    return {
        type: POST_SHOP,
        newShop
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
//shop details
export const fetchOneShop = id => async dispatch => {
    const response = await fetch(`/api/shops/${id}`)
    if (response.ok) {
        const shop = await response.json()
        return dispatch(loadOneShop(shop))
    }
}
//post shop
export const createShop = (data) => async dispatch => {
    const { name, street_address, city, state, country, description, category, policies, url} = data
    console.log('DATA ============', data)
    const response = await fetch('/api/shops/',
    {"method": "POST",
    "headers": {"Content-Type": "application/json"},
    "body": JSON.stringify({
        name,
        street_address,
        city,
        state,
        country,
        description,
        category,
        policies,
        url
    })})
    const newShop = await response.json()
    if (response.ok) {
        return newShop
    }
}

const initialState = {}

export default function shopReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SHOPS:
            const newState = {...state}
            newState.allShops = {...action.shops}
            return newState
        case LOAD_ONE_SHOP:
            const beforeOneShop = {...state}
            beforeOneShop.singleShop = {...action.shop}
            return beforeOneShop
        case POST_SHOP:
            return {...state, ...action.newShop}
        default: return state
    }
}
