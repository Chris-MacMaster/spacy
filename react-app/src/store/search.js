import { csrfFetch } from "./csrf"

const GET_SEARCH_RESULTS = 'search/getResults'

const search = (currSearchResults) => {
    return {
        type: GET_SEARCH_RESULTS,
        currSearchResults
    }
}



export const getSearchResults = (parameters) => async (dispatch) => {
    const res = await csrfFetch('/api/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(parameters)
    })
    
    if (res.ok) {
        const currSearchResults = await res.json()
        dispatch(search(currSearchResults))
    }
}

let initialState = {
    searchResults: {}
}
export default function searchReducer(state=initialState, action) {
    switch(action.type) {
        case GET_SEARCH_RESULTS: {
            const newState = {...state, searchResults: {...state.searchResults}}
            newState.searchResults = {...action.currSearchResults}
            return newState
        }
        default:
            return state
    }
}