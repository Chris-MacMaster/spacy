const LOAD_SHOPS = 'shops/LOAD'
// const LOAD_USER_SHOPS = 'shops/LOAD_USER_SHOPS'
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
export const editShop = (data, id) => async dispatch => {
    const { name, street_address, city, state, country, description, category, policies, url} = data
    const response = await fetch(`/api/shops/${id}`,
    {"method": "PUT",
    "headers": {"Content-Type": "application/json"},
    "body": JSON.stringify({
        id, name, street_address, city, state, country, description, category, policies, url
    })})
    const edittedShop = await response.json()
    if (response.ok) {
        dispatch(editAShop(edittedShop))
        return edittedShop
    }
}
//delete shop thunk
export const deleteShopRequest = shopId => async dispatch => {
    const response = await fetch(`/api/shops/${shopId}`, {method: "DELETE", headers: {"Content-Type": "application/json"}})
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
            return {...state, allShops : { ...state.allShops, ...action.shops }, singleShop : { ...state.singleShop } }
        case LOAD_ONE_SHOP:
            return {...state, allShops: { ...state.allShops }, singleShop: { ...action.shop}}
        case POST_SHOP:
            return {...state, allShops : { ...state.allShops, [action.newShop.id]: action.newShop }, singleShop : { ...state.singleShop } }
        case EDIT_SHOP:
            return {...state, allShops : { ...state.allShops, [action.edittedShop.id]: action.edittedShop }, singleShop : { ...state.singleShop } }
        case DELETE_SHOP:
            const withDeleted = { ...state, allShops: { ...state.allShops }, singleShop: { ...state.singleShop } }
            delete withDeleted.allShops[String(action.deleted.id)]
            return withDeleted
        default: return state
    }
}
