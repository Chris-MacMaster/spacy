import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSearchResults } from "../../store/search"
import { Link, useLocation, useParams } from "react-router-dom"

import '../SearchResults/SearchResults.css'

function FilteredSearchResults() {

    const {category} = useParams()

    console.log(category)

    return (
        <h1>Filtered Search Results</h1>
    )
}

export default FilteredSearchResults