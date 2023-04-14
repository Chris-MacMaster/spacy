//src/components/SpotForm/CreateSpot.js
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { makeProduct } from '../../store/product';
// import { editSpot, makeSpot } from '../../store/spot';
// import { fetchOneSpot } from '../../store/spot';

// import "./CreateSpot.css"
// import "./EditSpot.css"
// import { actionResetReviews } from '../../store/review';



const ProductCreateForm = () => {
    const history = useHistory();
    const dispatch = useDispatch()

    const {shopId} = useParams()


    // const { closeModal } = useModal()


    const [name, setName] = useState("")
    const [available, setAvailable] = useState(0)
    const [avgRating, setAvgRating] = useState(0)

    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [freeShipping, setFreeShipping] = useState(false)
    const [price, setPrice] = useState(0)

    const [url1, setUrl1] = useState("")
    const [url2, setUrl2] = useState("")
    const [url3, setUrl3] = useState("")
    const [url4, setUrl4] = useState("")
    const [url5, setUrl5] = useState("")
    const [url6, setUrl6] = useState("")
    const [url7, setUrl7] = useState("")
    const [url8, setUrl8] = useState("")
    const [url9, setUrl9] = useState("")

    // shopId

    //validation
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let e = {}
        setErrors(e)
        // console.log(category)
        if (!name) e.name = "Must submit a name"
        if (!available) e.available = "Must submit a value for available."
        if (!price) e.price = "Must submit a price."
        if (!category) e.category = "Must submit a category"
        if (!description) e.description = "Must submit a description"
        if (!url1) e.url1 = "Must submit at least 1 url, in the first input line."
    }, [name, available, price, category, description, url1])

    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        // console.log("ERRORS", errors)
        if (Object.values(errors).length) {
            return
        }
        const newProduct = {
          name,
          shop_id: shopId,
          description,
          category,
          available,
          freeShipping,
          price,
          img_1: url1
        }
        dispatch(makeProduct(newProduct))
        reset()
        history.push(`/shops/${shopId}`)
    };

    const reset = () => {
        setName("")
        setAvailable("")
        setPrice("")
        setCategory("")
        setDescription("")
        setUrl1("")
    };

    const handleCheck = (e) => {
        freeShipping === true ? setFreeShipping(false) : setFreeShipping(true)
    }

    return (
        <div>
            <form className='login-form' onSubmit={handleSubmit} >

                <div className='product-name-div'>
                    <label className='product-label' >
                        Name
                        <input className='product-input' type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Name' />
                    </label>
                    {hasSubmitted && errors.name && (
                        <div className='error'>
                            * {errors.name}
                        </div>
                    )}
                </div>

                <div className='product-available-div'>
                    <label className='product-label' >
                        Available
                        <input className='product-input' type="number"
                            value={available}
                            onChange={(e) => setAvailable(e.target.value)}
                            placeholder='Available' />
                    </label>
                    {hasSubmitted && errors.available && (
                        <div className='error'>
                            * {errors.available}
                        </div>
                    )}
                </div>

                <div className='product-price-div'>
                    <label className='product-label' >
                        Price
                        <input className='product-input' type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Price' />
                    </label>
                    {hasSubmitted && errors.price && (
                        <div className='error'>
                            * {errors.price}
                        </div>
                    )}
                </div>

                <div className='product-category-div'>
                    <label className='product-label' >
                        Category
                        <select name='category' onChange={(e) => setCategory(e.target.value)}>
                            <option value='' >--Please choose an option--</option>
                            <option value='Accessories' >Accessories</option>
                            <option value='Apparel' >Apparel</option>
                            <option value='Collectibles' >Collectibles</option>
                            <option value='Food' >Food</option>
                            <option value='Home Decor' >Home Decor</option>
                            <option value='Jewelry' >Jewelry</option>
                            <option value='Lighting' >Lighting</option>
                            <option value='Wall Art' >Wall Art</option>
                        </select>
                    </label>
                    {hasSubmitted && errors.category && (
                        <div className='error'>
                            * {errors.category}
                        </div>
                    )}
                </div>

                <div className='product-description-div'>
                    <label className='product-label' >
                        Description
                        <input className='product-input' type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description' />
                    </label>
                    {hasSubmitted && errors.description && (
                        <div className='error'>
                            * {errors.description}
                        </div>
                    )}
                </div>

                <div className='product-shipping-div'>
                    <label className='product-label' >
                        Free Shipping
                        <input className='product-input' type="checkbox"
                            value={freeShipping}
                            onChange={handleCheck}
                            placeholder='Description' />
                    </label>
                    {hasSubmitted && errors.freeShipping && (
                        <div className='error'>
                            * {errors.freeShipping}
                        </div>
                    )}
                </div>


                <div className='product-img1-div'>
                    <label className='product-label' >
                        URL1: 
                        <input className='product-input' type="text"
                            value={url1}
                            onChange={(e) => setUrl1(e.target.value)}
                            placeholder='Url1' />
                    </label>
                    {hasSubmitted && errors.url1 && (
                        <div className='error'>
                            * {errors.url1}
                        </div>
                    )}
                </div>

            </form>

            <input onClick={handleSubmit} className='submit-button button modal-button form-create-button red-styling' type="submit" value="Create Spot" />

        </div>
    );
}

export default ProductCreateForm;