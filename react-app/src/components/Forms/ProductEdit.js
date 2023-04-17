//src/components/SpotForm/CreateSpot.js
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { editProduct, fetchOneProduct } from '../../store/product';
import { urlCheck } from './ProductCreate';
import "./ProductCreate.css"
// import { render } from 'react-dom';
// import { editSpot, makeSpot } from '../../store/spot';
// import { fetchOneSpot } from '../../store/spot';

// import "./CreateSpot.css"
// import "./EditSpot.css"
// import { actionResetReviews } from '../../store/review';



const ProductEditForm = () => {
    const history = useHistory();
    const dispatch = useDispatch()

    const { productId } = useParams()
    const productState = useSelector(state => state.products.singleProduct)

    const [name, setName] = useState("")
    const [available, setAvailable] = useState(0)
    const [shopId, setShopId] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [freeShipping, setFreeShipping] = useState(false)
    const [price, setPrice] = useState(0)
    const [url, setUrl] = useState("")

    const product = productState

    // shopId

    //validation
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let e = {}
        setErrors(e)
        // console.log(category)
        if (!name) e.name = "Must submit a name"
        if (!available || available < 0) e.available = "Must submit a value for available."
        if (!price || price < 0) e.price = "Must submit a price."
        if (!category) e.category = "Must submit a category"
        if (!description) e.description = "Must submit a description"
        if (!url) e.url = "Must submit a url"
        if (!urlCheck(url)) e.urlCheck = "Must submit a valid url. We accept urls ending in any of the following: jpeg, jpg, svg, png, gif, bmp."
    }, [name, available, price, category, description, url])

    useEffect(() => {
        dispatch(fetchOneProduct(productId));
      }, [dispatch, productId]);




      // prepopulate form
    useEffect(() => {
        setName(productState?.name || "");
        setAvailable(productState?.available || 0);
        setShopId(productState?.shopId || "");
        setCategory(productState?.category || "");
        setDescription(productState?.description || "");
        setFreeShipping(productState?.freeShipping || false);
        setPrice(productState?.price || 0);

        setUrl(productState && productState.ProductImages && productState.ProductImages.length ? productState.ProductImages[0].url : "");
        // setUrl1(productState.ProductImages.length ? productState?.ProductImages[0]?.url || "" : "");
    }, [productState]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        // console.log("ERRORS", errors)
        if (Object.values(errors).length) {
            return
        }
        const editedProduct = {
            name,
            shop_id: shopId,
            description,
            category,
            available,
            free_shipping: freeShipping,
            price,
            url
        }
        dispatch(editProduct(editedProduct, productId))
        dispatch(fetchOneProduct(productId));
        reset()
        history.push(`/products/${productId}`)
        // console.log("SUBMITTED!")
    };

    const reset = () => {
        setName("")
        setAvailable("")
        setPrice("")
        setCategory("")
        setDescription("")
    };

    const handleCheck = (e) => {
        freeShipping === true ? setFreeShipping(false) : setFreeShipping(true)
    }

    if (!Object.values(product).length) return null

    return (
        <div className='edit-product-container cp-container'>
            <h1 className='cp-title form-title'>Listing details</h1>
            <p className='cp-grey-text sub-q-text form-sub'>Tell the world all about your item and why they'll love it</p>
            <form className='login-form sp-form' onSubmit={handleSubmit} >

                <div className='product-name-div'>
                    <div>
                        <label className='cp-form-label cp-title q-text' >
                            Title
                        </label>
                        <p className='create-shop-grey'>
                            Choose a name for your product. Incldue keywords that a buyer would use to search for your item.
                        </p>
                    </div>
                    <div className='cp-field-div'>
                        <input className='product-input input-field' type="text"
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

                <div className='product-description-div sub-text-flex'>
                    <div className='description-title-sub-text'>
                        <label className='cp-form-label cp-description q-text' >
                            Description
                        </label>
                        <p className='cp-grey-text sub-q-text create-shop-grey'>
                            Start with a brief overview that describes your item's findes feature. Shopper will only see the first few lines of your description at first, so make it count!
                        </p>
                        <p className='cp-grey-text sub-q-text create-shop-grey'>
                            Not sure what else to say? Shoppers also like hearing about your process, and the story behind the item!
                        </p>
                    </div>
                    <div className='cp-field-div description-text'>
                        <textarea className='product-input input-field description-input' type="text-area"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description' />
                        {hasSubmitted && errors.description && (
                            <div className='error'>
                                * {errors.description}
                            </div>
                        )}
                    </div>
                    </div>
                <div className='cp-field-div'>
                </div>

                <div className='product-available-div'>
                    <div >
                        <label className='cp-form-label cp-available q-text' >
                            Available
                        </label>
                        <p className='cp-grey-text sub-q-text create-shop-grey'>
                            How many do you currently have in stock?
                        </p>
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
                        <p className='cp-form-label sub-q-text create-shop-grey'>
                            Please dont use denominations other than Empire or New Republic Credits
                        </p>
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
                        <label className='product-label q-text' >
                            Category
                        </label>
                        <p className='cp-grey-text sub-q-text create-shop-grey'>Select a category from the options below.</p>
                        <div className='cp-field-div'>
                            <select name='category' onChange={(e) => setCategory(e.target.value)}>
                                {/* <option value='' >--Please choose an option--</option> */}
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
                            <p className='cp-form-label sub-q-text create-shop-grey check-box-text'>
                                Check the box to indicate whether or not your product is shipped for free.
                            </p>
                            {/* <p className='cp-grey-text'>Either true or false</p> */}
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
                        <p className='cp-grey-text sub-q-text create-shop-grey'>
                            Provide a url, pictures are necessary! Nobody wants to buy something sight unseen!
                        </p>
                    </div>
                    <input className='product-input input-field' type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder='Url' />
                    {hasSubmitted && errors.url && (
                        <div className='error'>
                            * {errors.url}
                        </div>
                    )}
                </div>
                {hasSubmitted && errors.urlCheck && (
                    <div className='error'>
                        * {errors.urlCheck}
                    </div>
                )}

            </form>

            <input onClick={handleSubmit} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button' type="submit" value="Edit Product" />

        </div>
    );
}

export default ProductEditForm;
