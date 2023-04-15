import { useEffect, useState } from 'react'
import './PostShopForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { createShop } from '../../store/shops'
import { useHistory } from 'react-router-dom'

export default function PostShopForm() {
    const [name, setName] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [policies, setPolicies] = useState('')
    const [url, setUrl] = useState('')
    const [errors, setErrors] = useState({})
    // const user = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const validate = () => {
        const err = {}
        if (!name || name.length < 4) err.name = 'Please enter a valid name'
        if (!streetAddress || streetAddress.length < 6) err.streetAddress = 'Please enter a valid street address'
        if (!city || city.length < 4) err.city = 'Please enter a valid city'
        if (!state) err.state = 'Please enter a valid state'
        if (!country) err.country = 'Please enter a valid country'
        if (!description || description.length < 20) err.name = 'Please enter a longer shop description'
        if (!category || category.length <3) err.category = 'Please enter a shop category'
        if (!policies || policies.length < 30) err.policies = 'Please enter shop policies about returns or shipping'
        if (!url || url.length < 20) err.url = 'Please enter a shop image to represent your shop'
        setErrors(err)
    }

    const handleSubmit = e => {
        e.preventDefault();
        validate()
        if (Object.values(errors).length )return
        const newShop = {
            name,
            street_address: streetAddress,
            city,
            state,
            country,
            description,
            category,
            policies,
            url
        }
        dispatch(createShop(newShop))
        // history.push(`/users/${user.id}`)
    }
    console.log("WE'RE REACHING THE ROUTE")
    return (
        <div className='post-shop-form'>
            <h1>Post New Shop</h1>
        <form onSubmit={handleSubmit}>

        <label className='create-shop-label'>Name</label>
        <input type='text' value={name} onChange={e => setName(e.target.value)}></input>

        <label className='create-shop-label'>Street Address</label>
        <input type='text' value={streetAddress} onChange={e => setStreetAddress(e.target.value)}></input>

        <label className='create-shop-label'>City</label>
        <input type='text' value={city} onChange={e => setCity(e.target.value)}></input>

        <label className='create-shop-label' >State</label>
        <input type='text' value={state} onChange={e => setState(e.target.value)} ></input>

        <label className='create-shop-label'>Country</label>
        <input type='text' value={country} onChange={e => setCountry(e.target.value)}></input>

        <label className='create-shop-label'>Description</label>
        <input type='text-area' value={description} onChange={e => setDescription(e.target.value)}></input>

        <label className='create-shop-label'>Category</label>
        <input type='text' value={category} onChange={e => setCategory(e.target.value)}></input>

        <label className='create-shop-label'>Policies</label>
        <input type='text' value={policies} onChange={e => setPolicies(e.target.value)}></input>

        <label className='create-shop-label'>Image URL</label>
        <input type='url' value={url} onChange={e => setUrl(e.target.value)} ></input>

        <button type='submit'>Submit Shop</button>

        </form>
        </div>
    )
}
