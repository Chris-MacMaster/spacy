import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { editProduct, fetchOneProduct } from '../../store/product';
import { urlCheck } from './ProductCreate';
import "./ProductCreate.css"

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

    }, [productState]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true)
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
        <div className='create-product-page'>
            <h1 className='create-product-title'>Listing details</h1>
            <span className='form-description'>Tell the world all about your item and why they'll love it</span>
            <div className='create-product-grid'>
            <form className='create-product' onSubmit={handleSubmit} >

                    <div className='create-product-label-side'>
                        <label className='create-product-label' >
                            Title
                        </label>
                        <div className='create-shop-grey'>
                            Choose a name for your product. Incldue keywords that a buyer would use to search for your item.
                        </div>
                    </div>

                    <div className='create-product-input-side'>
                        <input className='product-input input-field' type="text"
                                value={name} onChange={(e) => setName(e.target.value)} placeholder='Title' />
                        {hasSubmitted && errors.name && (
                            <div className='error'>
                                * {errors.name}
                            </div>
                        )}
                    </div>




                    <div className='create-product-label-side'>
                        <label className='create-product-label' >
                            Description
                        </label>
                        <div className='create-shop-grey'>
                                Start with a brief overview that describes your item's findes feature. Shopper will only see the first few lines of your description at first, so make it count!
                        </div>
                        <div className='create-shop-grey second-paragraph'>
                                Not sure what else to say? Shoppers also like hearing about your process, and the story behind the item!
                        </div>
                    </div>

                    <div className='create-product-input-side'>
                        <textarea className='product-input input-field description-input' type="textarea" value={description}onChange={(e) => setDescription(e.target.value)}placeholder='' />
                        {hasSubmitted && errors.description && (
                            <div className='error'>
                                * {errors.description}
                            </div>
                        )}
                    </div>



                    <div className='create-product-label-side'>
                        <label className='create-product-label' >
                            Available
                        </label>
                        <div className='create-shop-grey'>
                            How many do you currently have in stock?
                        </div>
                    </div>

                    <div className='create-product-input-side'>
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



                    <div className='create-product-label-side'>
                        <label className='create-product-label' >
                            Price
                        </label>
                        <div className='cp-form-label sub-q-text create-shop-grey'>
                            Please dont use denominations other than Empire or New Republic Credits
                        </div>
                    </div>

                    <div className='create-product-input-side'>
                        <input className='product-input input-field' type="number"
                            value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' />
                    {hasSubmitted && errors.price && (
                        <div className='error'>
                            * {errors.price}
                        </div>
                    )}
                    </div>



                        <div className='create-product-label-side'>
                            <label className='create-product-label' >
                                Category
                            </label>
                            <div className='create-shop-grey'>Select a category from the options below.</div>
                        </div>

                        <div className='create-product-input-side'>
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


                        <div className='create-product-label-side'>
                        <label className='create-product-label' >
                            Free Shipping
                        </label>
                        <div className='cp-form-label sub-q-text create-shop-grey check-box-text'>
                            Check the box to indicate whether or not your product is shipped for free.
                        </div>
                        </div>


            <div className='create-product-input-side'>
            <input className='product-input input-field check-box' type="checkbox" value={freeShipping} onChange={handleCheck}placeholder='Description' />
            {hasSubmitted && errors.freeShipping && (
                <div className='error'>
                    * {errors.freeShipping}
                </div>
            )}
            </div>


                <div className='create-product-label-side'>
                <label className='create-product-label' >
                Image URL</label>
               <div className='cp-grey-text sub-q-text create-shop-grey'>   Provide a url, pictures are necessary! Nobody wants to buy something sight unseen!
                </div>
                </div>

                <div className='create-product-input-side'>                    <input className='product-input input-field' type="file" accept = 'image/*' onChange={(e) => setUrl(e.target.files[0])} placeholder='URL' />
            {hasSubmitted && errors.url1 && (
                        <div className='error'>
                            * {errors.url1}
                        </div>
                    )}
                    </div>


            <input onClick={handleSubmit} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button' type="submit" value="Create Product" />
            </form>
            </div>

        </div>
    );
}

export default ProductEditForm;
