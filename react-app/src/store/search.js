import { csrfFetch } from "./csrf"

const GET_SEARCH_RESULTS = 'search/getResults'

const search = (currSearchResults) => {
    return {
        type: GET_SEARCH_RESULTS,
        currSearchResults
    }
}

// export const getSearchResults = (parameters) => async (dispatch) => {
//     const res = await csrfFetch(`api/search/${parameters}`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(parameters)
//     })
    
//     if (res.ok) {
//         const currSearchResults = await res.json()
//         dispatch(search(currSearchResults))
//     }
// }
export const getSearchResults = (parameters) => async (dispatch) => {
    console.log('redux')
    const res = await csrfFetch(`api/search/${parameters}`)
    
    if (res.ok) {
        console.log('res ok')
        const currSearchResults = await res.json()
        await dispatch(search(currSearchResults))
    }
}

let initialState = {
    searchResults: {}
}
export default function searchReducer(state=initialState, action) {
    switch(action.type) {
        case GET_SEARCH_RESULTS: {
            console.log('thunk hit')
            const newState = {...state, searchResults: {...state.searchResults}}
            console.log('reducer data', action.currSearchResults)
            // Object.values(action.currSearchResults).map(result => newState.searchResults[result.id] = result)
            newState.searchResults = {...action.currSearchResults}
            console.log('newState', newState)
            return newState
        }
        default:
            return state
    }
}