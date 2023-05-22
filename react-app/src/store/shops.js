const LOAD_SHOPS = 'shops/LOAD'
const LOAD_FOLLOWED_SHOPS = 'shops/FOLLOWED/LOAD'
const FOLLOW_SHOP = 'shops/FOLLOWED/FOLLOW'
const UNFOLLOW_SHOP = 'shops/FOLLOWED/UNFOLLOW'
const DELETE_SHOP = 'shops/DELETE_SHOP'
const LOAD_ONE_SHOP = 'shops/LOAD_ONE_SHOP'
const POST_SHOP = 'shops/POST_SHOP'
const EDIT_SHOP = 'shops/EDIT_SHOP'
//actions
export const actionLoadShops = shops => {
    return {
        type: LOAD_SHOPS,
        shops
    }
}

export const actionLoadFollowedShops = shops  => {
    return {
        type: LOAD_FOLLOWED_SHOPS,
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
export const editAShop = edittedShop => {
    return {
        type: EDIT_SHOP,
        edittedShop
    }
}
export const deleteAShop = deleted => {
    return {
        type: DELETE_SHOP,
        deleted
    }
}

export const actionFollowShop = shop => {
    return {
        type: FOLLOW_SHOP,
        shop
    }
}

export const actionUnfollowShop = id => {
    return {
        type: UNFOLLOW_SHOP,
        id
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

// Shops user follows
export const fetchFollowedShops = () => async dispatch => {
    const response = await fetch('/api/shops/current-followed')
    if (response.ok) {
        const shops = await response.json()
        dispatch(actionLoadFollowedShops(shops))
    }
}

export const followShop = (id) => async dispatch => {
    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const options = { method, headers }

    const response = await fetch(`/api/shops/current-followed/follow/${id}/`, options)
    if (response.ok) {
        const shop = await response.json()
        dispatch(actionFollowShop(shop))
        return shop
    }
}

export const unfollowShop = (id) => async dispatch => {
    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const options = { method, headers }

    const response = await fetch(`/api/shops/current-followed/unfollow/${id}/`, options)
    if (response.ok) {
        const shop = await response.json()
        dispatch(actionUnfollowShop(id))
        return shop
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

export const unfollowSingleShop = id => async dispatch => {
    const response = await fetch(`/api/shops/${id}`)
    if (response.ok) {
        const shop = await response.json()
        shop.Followed.Status = "Not Followed"
        return dispatch(loadOneShop(shop))
    }
}

export const followSingleShop = id => async dispatch => {
    const response = await fetch(`/api/shops/${id}`)
    if (response.ok) {
        const shop = await response.json()
        shop.Followed.Status = "Followed"
        return dispatch(loadOneShop(shop))
    }
}




//post shop
export const createShop = (formData) => async dispatch => {
    // const { name, street_address, city, state, country, description, category, policies, url} = data
    const response = await fetch('/api/shops/',
    {"method": "POST",
    // "headers": {"Content-Type": "application/json"},
    // "body": JSON.stringify({
    //     name,
    //     street_address,
    //     city,
    //     state,
    //     country,
    //     description,
    //     category,
    //     policies,
    //     url
    // })
    body: formData
    }
    )
    if (response.ok) {
        const newShop = await response.json()
        dispatch(postShop(newShop))
        return newShop
    }
}
//put shop
export const editShop = (formData, id) => async dispatch => {
    // const { name, street_address, city, state, country, description, category, policies, url} = data
    // console.log('BACKEND FORM DATA', formData['url'])
    const response = await fetch(`/api/shops/${id}`, {
        method: 'PUT',
        // headers: {'Content-Type': 'application/json'},
        body: formData
    })
    // {"method": "PUT",
    // "headers": {"Content-Type": "application/json"},
    // "body": JSON.stringify({
    //     id, name, street_address, city, state, country, description, category, policies, url
    // })})
    const edittedShop = await response.json()
    if (response.ok) {
        dispatch(editAShop(edittedShop))
        return edittedShop
    }
}
//delete shop thunk
export const deleteShopRequest = shopId => async dispatch => {
    const response = await fetch(`/api/shops/${shopId}`, {
        method: "DELETE", 
        headers: {"Content-Type": "application/json"}
    })
    if (response.ok) {
        const deleted = await response.json()
        dispatch(deleteAShop(deleted))
        return deleted
    }
}
const initialState = {}

export default function shopReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_SHOPS:
            return {...state, allShops : { ...state.allShops, ...action.shops }, singleShop : { ...state.singleShop }, followedShops: {...state.followedShops} }
        case LOAD_FOLLOWED_SHOPS:
            return { ...state, allShops: { ...state.allShops }, singleShop: { ...state.singleShop }, followedShops: { ...state.followedShops, ...action.shops } }
        case LOAD_ONE_SHOP:
            return { ...state, allShops: { ...state.allShops }, singleShop: { ...action.shop }, followedShops: { ...state.followedShops } }
        case POST_SHOP:
            return { ...state, allShops: { ...state.allShops, [action.newShop.id]: action.newShop }, singleShop: { ...state.singleShop }, followedShops: { ...state.followedShops } }
        case EDIT_SHOP:
            return { ...state, allShops: { ...state.allShops, [action.edittedShop.id]: action.edittedShop }, singleShop: { ...state.singleShop }, followedShops: { ...state.followedShops } }
        case DELETE_SHOP:
            const withDeleted = { ...state, allShops: { ...state.allShops }, singleShop: { ...state.singleShop }, followedShops: { ...state.followedShops } }
            delete withDeleted.allShops[String(action.deleted.id)]
            return withDeleted
        case FOLLOW_SHOP:
            // isn't updating state properly?
            return { ...state, allShops: { ...state.allShops }, singleShop: { ...state.singleShop }, followedShops: { ...state.followedShops, [action.shop.id]: action.shop } }
        case UNFOLLOW_SHOP:
            const withFollowed = { ...state, allShops: { ...state.allShops }, singleShop: { ...state.singleShop }, followedShops: { ...state.followedShops } }
            delete withFollowed.followedShops[String(action.id)]
            return withFollowed
        default: return state
    }
}
