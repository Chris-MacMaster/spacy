//src/components/SpotForm/CreateSpot.js
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { makeProduct } from '../../store/product';
import { fetchShops } from '../../store/shops';
import './ProductCreate.css'


export default function ProductCreateForm() {
    const history = useHistory();
    const dispatch = useDispatch()

    const {shopId} = useParams()


    // const { closeModal } = useModal()

    const formData = new FormData();


    const [name, setName] = useState("")
    const [available, setAvailable] = useState(0)
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [freeShipping, setFreeShipping] = useState(false)
    const [price, setPrice] = useState(0)

    // const [url1, setUrl1] = useState("")
    const [url, setUrl] = useState(null)

    //validation
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let e = {}
        setErrors(e)
        if (!name) e.name = "Must submit a name"
        if (!available || available < 0) e.available = "Must submit a value for available."
        if (!price || price < 0) e.price = "Must submit a price."
        if (!category) e.category = "Must submit a category"
        if (!description) e.description = "Must submit a description"
        // if (!url1) e.url1 = "Must submit a url."
        // if (!urlCheck(url1)) e.urlCheck = "Must submit a valid url. We accept urls ending in any of the following: jpeg, jpg, svg, png, gif, bmp."
    }, [name, available, price, category, description])

    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (Object.values(errors).length) return;

        const newProduct = {
          name,
          shop_id: shopId,
          description,
          category,
          available,
          freeShipping,
          price,
        //   url: url1
        }
        for (let key in newProduct) {
            formData.append(`${key}`, newProduct[key])
        }
        formData.append("image", url); //aws

        dispatch(makeProduct(formData))
        dispatch(fetchShops())
        history.push(`/shops/${shopId}`)
    };

    const handleDragOver = (e) => {
        e.preventDefault()
    }
    const images = []
    const handleDrop = (e) => {
        e.preventDefault()
        images.push(e.dataTransfer.files[e.dataTransfer.files.length - 1])
        console.log('all images',images)
        setUrl(images)
        console.log('HELLO FROM DROP', url)
    }
    const handleCheck = (e) => {
        freeShipping === true ? setFreeShipping(false) : setFreeShipping(true)
    }

    // if (url) {
    //     return (
    //         <h1>hello</h1>
    //     )
    // }

    return (
        <div className='cp-container'>
            <h1 className='cp-title form-title'>Listing details</h1>
            <p className='cp-grey-text sub-q-text form-sub'>Tell the world all about your item and why they'll love it</p>
            <form className='sp-form' onSubmit={handleSubmit} >

                <div className='product-name-div'>
                    <div>
                        <label className='cp-form-label cp-title q-text' >
                            Title
                        </label>
                        <div className='create-shop-grey'>
                            Choose a name for your product. Incldue keywords that a buyer would use to search for your item.
                        </div>
                    </div>
                    <div className='input-div'>
                        <div className='cp-field-div'>
                            <input className='product-input input-field' type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Title' />
                        {hasSubmitted && errors.name && (
                            <div className='error'>
                                * {errors.name}
                            </div>
                        )}
                        </div>
                    </div>

                </div>

                <div className='product-description-div'>
                    <div className='description-title-sub-text'>
                        <label className='cp-form-label cp-description q-text' >
                            Description
                        </label>
                        <div className='cp-grey-text sub-q-text create-shop-grey'>
                                Start with a brief overview that describes your item's findes feature. Shopper will only see the first few lines of your description at first, so make it count!
                            </div>
                        <div className='cp-grey-text sub-q-text create-shop-grey'>
                                Not sure what else to say? Shoppers also like hearing about your process, and the story behind the item!
                            </div>
                        </div>
                    <div className='cp-field-div description-text'>
                        <textarea className='product-input input-field description-input' type="text-area"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder='' />
                            {hasSubmitted && errors.description && (
                                <div className='error'>
                                    * {errors.description}
                                </div>
                            )}
                    </div>
                </div>


                <div className='product-available-div'>
                    <div >
                        <label className='cp-form-label cp-available q-text' >
                            Available
                        </label>
                        <div className='cp-grey-text sub-q-text create-shop-grey'>
                            How many do you currently have in stock?
                        </div>
                    </div>
                    <div className='cp-field-div'>
                        <input className='product-input input-field' type="number"
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
                    <div >
                        <label className='cp-form-label cp-price q-text' >
                            Price
                        </label>
                        <div className='cp-form-label sub-q-text create-shop-grey'>
                            Please dont use denominations other than Empire or New Republic Credits
                        </div>
                    </div>
                    <div className='cp-form-field'>
                        <input className='product-input input-field' type="number"
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

                <div className='category-shipping-div'>
                    <div className='product-category-div'>
                        <div >
                            <label className='product-label q-text' >
                                Category
                            </label>
                            <div className='cp-grey-text sub-q-text create-shop-grey'>Select a category from the options below.</div>
                        </div>
                        <div className='cp-field-div'>
                            <select className='product-category-select' name='category' onChange={(e) => setCategory(e.target.value)}>
                                <option value='' >--Please choose a category--</option>
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

                    <div className='shipping-img-div'>
                        <div className='product-shipping-div'>
                                <label className='product-label q-text' >
                                    Free Shipping
                                </label>
                                <div className='cp-form-label sub-q-text create-shop-grey check-box-text'>
                                    Check the box to indicate whether or not your product is shipped for free.
                                </div>
                                {/* Either true or false*/}
                                <div className='cp-field-div'>
                                <input className='product-input input-field check-box' type="checkbox"
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
                        </div>


                    </div>
                        <div className='product-img1-div'>
                            <div >
                                <label className='product-label q-text' >
                                    Image URL
                                </label>
                                <div className='cp-grey-text sub-q-text create-shop-grey'>
                                    Provide a url, pictures are necessary! Nobody wants to buy something sight unseen!
                                </div>
                            </div>
                            <div className='dropzone'
                                    draggable={true}
                                    // draggable='true'
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                            >
                            <input className='product-input input-field' type="file"
                                    accept = 'image/*'
                                    // value={image}
                                    multiple={true}
                                    onChange={(e) => setUrl(e.target.files)}
                                    placeholder='URL' />
                            </div>
                            {hasSubmitted && errors.url1 && (
                                <div className='error'>
                                    * {errors.url1}
                                </div>
                            )}
                        </div>
                            {hasSubmitted && errors.urlCheck && (
                                <div className='error'>
                                    * {errors.urlCheck}
                                </div>
                            )}


            </form>

            <input onClick={handleSubmit} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button' type="submit" value="Create Product" />

        </div>
    );
}


export const urlCheck = (url) => {
    return url.endsWith("jpeg") ||
        url.endsWith("jpg") ||
        url.endsWith("svg") ||
        url.endsWith("png") ||
        url.endsWith('gif') ||
        url.endsWith("bmp")
}
