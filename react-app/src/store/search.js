// import { csrfFetch } from "./csrf"
const GET_SEARCH_RESULTS = 'search/getResults'
const GET_FILTERED_SEARCH = 'search/filteredSearch'

const search = (currSearchResults) => {
    return {
        type: GET_SEARCH_RESULTS,
        currSearchResults
    }
}

const filteredSearch = (filteredSearchResults) => {
    return {
        type: GET_FILTERED_SEARCH,
        filteredSearchResults
    }
}
export const getSearchResults = (parameters) => async (dispatch) => {
    const res = await fetch(`/api/search/${parameters}`)
    if (res.ok) {
        const currSearchResults = await res.json()
        await dispatch(search(currSearchResults))
        return currSearchResults
    }
}

export const getFilteredSearchResults = (searchCategory) => async (dispatch) => {
    const res = await fetch(`/api/search/filtered-search/${searchCategory}`)
    if (res.ok) {
        const filteredSearchResults = await res.json()
        await dispatch(filteredSearch(filteredSearchResults))
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
        case GET_FILTERED_SEARCH: {
            const newState2 = {...state, searchResults: {...state.searchResults}}
            newState2.filteredSearch = {}
            action.filteredSearchResults.map(result => (newState2.filteredSearch[result.id] = result))
            return newState2
        }
        default:
            return state
    }
}
