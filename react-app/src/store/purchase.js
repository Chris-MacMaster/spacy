const LOAD_USER_PURCHASES = 'purchase/USER_LOAD'
const LOAD_STORE_PURCHASES = 'purchcase/STORE_LOAD'


export const userPurchases = (purchases) => {
    return {
        type: LOAD_USER_PURCHASES,
        purchases
    }
}

export const storePurchases = (purchases) => {
    return {
        type: LOAD_STORE_PURCHASES,
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

export const fetchStorePuchases = (storeId) => async dispatch  =>  {
    const response = await fetch('/api/purchases/store')
    if(response.ok) {
        const purchases = await response.json()
        dispatch(storePurchases(purchases))
    }
}

const initialState = { userPurchases: {}, storePurchases: {}}

export default function purchaseReducer(state = initialState, action){
    switch(action.type){
        case LOAD_USER_PURCHASES: {
            return {...state.storePurchases, userPurchases: action.purchases}
        }
        case LOAD_STORE_PURCHASES: {
            return {...state.userPurchases, storePurchases: action.purchases}
        }
        default: return state
    }
}
