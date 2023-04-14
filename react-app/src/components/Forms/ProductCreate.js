//src/components/SpotForm/CreateSpot.js
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { makeProduct } from '../../store/product';
// import { editSpot, makeSpot } from '../../store/spot';
// import { fetchOneSpot } from '../../store/spot';
// import { actionResetReviews } from '../../store/review';
import './ProductCreate.css'


export default function ProductCreateForm() {
    const history = useHistory();
    const dispatch = useDispatch()

    const {shopId} = useParams()


    // const { closeModal } = useModal()


    const [name, setName] = useState("")
    const [available, setAvailable] = useState(0)
    // // const [avgRating, setAvgRating] = useState(0)

    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [freeShipping, setFreeShipping] = useState(false)
    const [price, setPrice] = useState(0)

    const [url1, setUrl1] = useState("")
    // const [url2, setUrl2] = useState("")
    // const [url3, setUrl3] = useState("")
    // const [url4, setUrl4] = useState("")
    // const [url5, setUrl5] = useState("")
    // const [url6, setUrl6] = useState("")
    // const [url7, setUrl7] = useState("")
    // const [url8, setUrl8] = useState("")
    // const [url9, setUrl9] = useState("")

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

    };


    const CreateTest = (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            available,
            category,
            description,
            free_shipping: freeShipping,
            price,
            shop_id: 1
        }
        // history.push(`/spots`);

    };

    const handleCheck = (e) => {
        freeShipping === true ? setFreeShipping(false) : setFreeShipping(true)
    }

    return (
        <div className='cp-container'>
            <h1 className='cp-title'>Listing details</h1>
            <p className='cp-grey-text'>Tell the world all about your item and why they'll love it</p>
            <form className='sp-form' onSubmit={handleSubmit} >

                <div className='product-name-div'>
                    <div>
                    <label className='cp-form-label cp-title' >
                        Title *
                    </label>
                    <p className='cp-grey-text'>Incldue keywords that buyer would use to search for your item</p>
                    </div>
                    <div className='cp-field-div'>
                        <input className='product-input' type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Name' />
                    {hasSubmitted && errors.name && (
                        <div className='error'>
                            * {errors.name}
                        </div>
                    )}
                    </div>
                </div>

                <div className='product-description-div'>
                    <div>
                    <label className='cp-form-label cp-description' >
                        Description *
                    </label>
                        <p className='cp-grey-text'>
                            Start with a brief overview that describes your item's findes feature. Shopper will only see the first few lines of your description at first, so make it count!
                        </p>
                        <p className='cp-grey-text'>
                            Not sure what else to say? Shoppers also like hearing about your process, and the story behind the item!
                        </p>
                    </div>
                    </div>

                <div className='cp-field-div'>
                        <input className='product-input' type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description' />
                    {hasSubmitted && errors.description && (
                        <div className='error'>
                            * {errors.description}
                        </div>
                    )}
                </div>


                <div className='product-available-div'>
                    <label className='cp-form-label cp-available' >
                        Available *
                    </label>
                    <p className='cp-grey-text'>
                        How many do you currently have in stock?
                    </p>
                    <div className='cp-field-div'>
                        <input className='product-input' type="number"
                            value={available}
                            onChange={(e) => setAvailable(e.target.value)}
                            placeholder='Available' />
                    {hasSubmitted && errors.available && (
                        <div className='error'>
                            * {errors.available}
                        </div>
                    )}
                    </div>
                </div>

                <div className='product-price-div'>
                    <label className='cp-form-label cp-price' >
                        Price *
                    </label>
                    <p className='cp-form-label'>
                        Please dont use denominations other than Empire or New Republic Credits
                    </p>
                    <div className='cp-form-field'>
                        <input className='product-input' type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Price' />
                    {hasSubmitted && errors.price && (
                        <div className='error'>
                            * {errors.price}
                        </div>
                    )}
                    </div>
                </div>

                <div className='product-category-div'>
                    <label className='product-label' >
                        Category
                    </label>
                    <p className='cp-grey-text'>Type a one word description of your item to get category suggestions that will help more shoppers find it.</p>
                    <div className='cp-field-div'>
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
                    {hasSubmitted && errors.category && (
                        <div className='error'>
                            * {errors.category}
                        </div>
                    )}
                    </div>
                </div>


                <div className='product-shipping-div'>
                    <label className='product-label' >
                        Free Shipping
                    </label>
                    <p className='cp-grey-text'>Either true or false</p>
                    <div className='cp-field-div'>
                        <input className='product-input' type="checkbox"
                            value={freeShipping}
                            onChange={handleCheck}
                            placeholder='Description' />
                    {hasSubmitted && errors.freeShipping && (
                        <div className='error'>
                            * {errors.freeShipping}
                        </div>
                    )}
                    </div>
                </div>


                <div className='product-img1-div'>
                    <label className='product-label' >
                        URL1:
                    </label>
                    <p className='cp-grey-text'>
                        Provide a url, pictures are necessary! Nobody wants to buy something sight unseen!
                    </p>
                        <input className='product-input' type="text"
                            value={url1}
                            onChange={(e) => setUrl1(e.target.value)}
                            placeholder='Url1' />
                    {hasSubmitted && errors.url1 && (
                        <div className='error'>
                            * {errors.url1}
                        </div>
                    )}
                </div>

            </form>

            <input onClick={handleSubmit} className='submit-button form-create-button red-styling' type="submit" value="Create Spot" />

        </div>
    );
}
