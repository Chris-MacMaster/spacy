//src/components/SpotForm/CreateSpot.js
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { editProduct, fetchOneProduct, makeProduct } from '../../store/product';
import { render } from 'react-dom';
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


    const [rendered, setRendered] = useState(false)

    console.log(productState)


    // const { closeModal } = useModal()


    const [name, setName] = useState("")
    const [available, setAvailable] = useState(0)
    const [shopId, setShopId] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [freeShipping, setFreeShipping] = useState(false)
    const [price, setPrice] = useState(0)

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
        if (!available) e.available = "Must submit a value for available."
        if (!price) e.price = "Must submit a price."
        if (!category) e.category = "Must submit a category"
        if (!description) e.description = "Must submit a description"
    }, [name, available, price, category, description])

    //prepopulate form
    // useEffect(() => {
    //     console.log("ENTER USE EFFECT")
    //     const fillFields = async () => {
    //         console.log("ENTER FILL FIELDS")
    //         dispatch(fetchOneProduct(productId))
    //         setName(product?.name)
    //         setShopId(product?.shopId)
    //         setDescription(product?.description)
    //         setCategory(product?.category)
    //         setAvailable(product?.available)
    //         setFreeShipping(product?.freeShipping)
    //         setPrice(product?.price)
    //     }
    //     fillFields()
    // },[dispatch])

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
        }
        dispatch(editProduct(editedProduct, productId))
        reset()
        // history.push(`/products/${productId}`)
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

            </form>

            <input onClick={handleSubmit} className='submit-button button modal-button form-create-button red-styling' type="submit" value="Create Spot" />

        </div>
    );
}

export default ProductEditForm;
