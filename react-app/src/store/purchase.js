const LOAD_USER_PURCHASES = 'purchase/USER_LOAD'
const LOAD_SHOP_PURCHASES = 'purchase/SHOP_LOAD'

export const userPurchases = (purchases) => {
    return {
        type: LOAD_USER_PURCHASES,
        purchases
    }
}

export const shopPurchases = (purchases) => {
    return {
        type: LOAD_SHOP_PURCHASES,
        purchases
    }
}

export const fetchUserPuchases = () => async dispatch  =>  {
    const response = await fetch('/api/purchases/')
    if(response.ok) {
        const purchases = await response.json()
        dispatch(userPurchases(purchases))
    }
}

export const fetchStorePuchases = (shopId) => async dispatch  =>  {
    const response = await fetch(`/api/purchases/shop/${shopId}`)
    if(response.ok) {
        const purchases = await response.json()
        dispatch(shopPurchases(purchases))
    }
}

const initialState = { userPurchases: {}, shopPurchases: {}}

export default function purchaseReducer(state = initialState, action){
    switch(action.type){
        case LOAD_USER_PURCHASES: {
            return {...state.shopPurchases, userPurchases: action.purchases}
        }
        case LOAD_SHOP_PURCHASES: {
            return {...state.userPurchases, shopPurchases: action.purchases}
        }
        default: return state
    }
}
