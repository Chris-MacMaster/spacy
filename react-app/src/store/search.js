import { csrfFetch } from "./csrf"

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
    console.log('parameters',parameters)
    // const res = await fetch(`api/search/${parameters}`)

    const res = await fetch(`/api/search/${parameters}`)
    
    if (res.ok) {
        console.log('res ok')
        const currSearchResults = await res.json()
        await dispatch(search(currSearchResults))
        return currSearchResults
    }
}

export const getFilteredSearchResults = (searchCategory) => async (dispatch) => {
    // const res = await fetch(`/api/search/filtered-search/${searchCategory}`)
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
            console.log('thunk hit')
            const newState = {...state, searchResults: {...state.searchResults}}
            console.log('reducer data', action.currSearchResults)
            // Object.values(action.currSearchResults).map(result => newState.searchResults[result.id] = result)
            newState.searchResults = {...action.currSearchResults}
            console.log('newState', newState)
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