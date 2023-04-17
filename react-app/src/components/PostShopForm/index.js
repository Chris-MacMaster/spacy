import { useEffect, useState } from 'react'
import './PostShopForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { createShop } from '../../store/shops'
import { useHistory } from 'react-router-dom'

export default function PostShopForm() {
    const history = useHistory()
    const dispatch = useDispatch()


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

    const [hasSubmitted, setHasSubmitted] = useState(false);


    const user = useSelector(state => state.session.user)

    useEffect(() => {
        const err = {}
        if (!name || name.length < 4) err.name = 'Please enter a valid name, at least 4 characters.'
        if (!streetAddress || streetAddress.length < 6) err.streetAddress = 'Please enter a valid street address, at least 6 characters'
        if (!city || city.length < 4) err.city = 'Please enter a valid city, at least 4 characters'
        if (!state) err.state = 'Please enter a valid state'
        if (!country) err.country = 'Please enter a valid country'
        if (!description || description.length < 20) err.description = 'Please enter a valid shop description, at least 20 characters'
        if (!category || category.length <3) err.category = 'Please enter a shop category'
        if (!policies || policies.length < 30) err.policies = 'Please enter shop policies about returns or shipping'
        if (!url || url.length < 20) err.url = 'Please enter a shop image to represent your shop'
        setErrors(err)
    }, [name, streetAddress, city, state, country, description, category, policies, url])

    
    const handleSubmit = async e => {
        e.preventDefault();

        setHasSubmitted(true)

        
        if (Object.values(errors).length) {
            return
        }
        
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
        await dispatch(createShop(newShop))
        history.push(`/users/${user.id}`)
    }
    return (
        <div className='post-shop-div'>
            <h1 className='post-shop-title'>Create New Shop</h1>

        <div className='post-shop-grid' >
        <form onSubmit={handleSubmit}
        id='post-shop'
        className='post-shop-form'>

        <div className='create-shop-name create-shop-label' >
        <label className='create-shop-label'>Name</label>
        <p className='create-shop-grey'>Choose a welcoming name for your shop</p>
        </div>
        <div className='create-shop-input'>
            <input type='text' value={name}
            className='create-shop-input-field' onChange={e => setName(e.target.value)}></input>
            {hasSubmitted && errors.name && (
                <div className='error'>
                    * {errors.name}
                </div>
            )}
        </div>

        <label className='create-shop-label'>Street Address</label>

        <div className='create-shop-input'>
        <input className='create-shop-input-field' type='text' value={streetAddress} onChange={e => setStreetAddress(e.target.value)}></input>
        {hasSubmitted && errors.streetAddress && (
            <div className='error'>
                * {errors.streetAddress}
            </div>
        )}
        </div>


        <label className='create-shop-label'>City</label>

        <div className='create-shop-input'>
        <input className='create-shop-input-field' type='text' value={city} onChange={e => setCity(e.target.value)}></input>
        {hasSubmitted && errors.city && (
            <div className='error'>
                * {errors.city}
            </div>
        )}
        </div>

        <label className='create-shop-label'>State</label>

        <div className='create-shop-input'>

        <input className='create-shop-input-field' type='text' value={state} onChange={e => setState(e.target.value)} ></input>
        {hasSubmitted && errors.state && (
            <div className='error'>
                * {errors.state}
            </div>
        )}

        </div>

        <label className='create-shop-label'>Country</label>

        <div className='create-shop-input'>
        <input type='text' value={country} className='create-shop-input-field' onChange={e => setCountry(e.target.value)}></input>
        {hasSubmitted && errors.country && (
            <div className='error'>
                * {errors.country}
            </div>
        )}
        </div>

        <div className='create-shop-label-grid create-shop-description'>
        <label className='create-shop-label'>Description</label>
        <p className='create-shop-grey'>Start building you brand by giving a brief description of your shop and what you're known for.</p>
        </div>

        <div className='create-shop-input'>
        <textarea className='create-shop-input-field shop-create-description' type='textarea' value={description} onChange={e => setDescription(e.target.value)}></textarea>
        {hasSubmitted && errors.description && (
            <div className='error'>
                * {errors.description}
            </div>
        )}
        </div>

        <div className='create-shop-label-grid create-shop-category'>
        <label className='create-shop-label '>Category</label>
        <p className='create-shop-grey'>Providing a category helps you get shown in search results!</p>
        </div>

        <div className='create-shop-input'>
        <input type='text' value={category}
        className='create-shop-input-field category-input'
        onChange={e => setCategory(e.target.value)}></input>
        {hasSubmitted && errors.category && (
            <div className='error'>
                * {errors.category}
            </div>
        )}
        </div>

        <div className='create-shop-label-grid'>
        <label className='create-shop-label'>Policies</label>
        <p className='create-shop-grey'>Give your customers an idea of the sort of service they can expect from you.</p>
        </div>

        <div className='create-shop-input'>
                        <textarea className='create-shop-input-field policies-inpu shop-create-description' type='text' value={policies} onChange={e => setPolicies(e.target.value)}></textarea>
        {hasSubmitted && errors.policies && (
            <div className='error'>
                * {errors.policies}
            </div>
        )}
        </div>

        <div className='create-shop-label-grid'>
        <label className='create-shop-label'>Image URL</label>
        <p className='create-shop-grey'>Images are mandatory, show off your logo or a good representation of your business!</p>
        </div>

        <div className='create-shop-input'>
                        <input className='create-shop-input-field category-input' type='url' value={url} onChange={e => setUrl(e.target.value)} ></input>
        {hasSubmitted && errors.url && (
            <div className='error'>
                * {errors.url}
            </div>
        )}
        </div>


        <div className='create-shop-div'>
            <input onClick={handleSubmit} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button' type="submit" value="Create Shop" />
        </div>


        {/* <button type='submit' className='favorite-shop submit-create-shop'>Submit Shop</button> */}
        </form>
        </div>
        </div>
    )
}
