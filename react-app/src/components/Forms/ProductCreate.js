//src/components/SpotForm/CreateSpot.js
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux"
// import { editSpot, makeSpot } from '../../store/spot';
// import { fetchOneSpot } from '../../store/spot';

// import "./CreateSpot.css"
// import "./EditSpot.css"
// import { actionResetReviews } from '../../store/review';



const ReviewForm = () => {
    const history = useHistory();
    const dispatch = useDispatch()

    // const params = useParams()
    // const { closeModal } = useModal()


    const [name, setName] = useState("")
    const [available, setAvailable] = useState(0)
    const [avgRating, setAvgRating] = useState(0)

    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [freeShipping, setFreeShipping] = useState(false)
    const [price, setPrice] = useState(0)

    // shopId

    //validation
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);



    useEffect(() => {
        // setActiveRating(stars)
        // console.log("FREE SHIPPING: ", freeShipping)
    }, [])


    useEffect(() => {
        let e = {}
        setErrors(e)
        // if (!review) e.noReview = "Must submit a review"
        // if (review.length < 10) e.reviewLength = "Review must be at least 10 characters"
        // if (!stars) e.stars = "Must submit a star rating"

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        //trying to be careful about data types

        if (Object.values(errors).length) {
            // window.alert("Cannot Submit, See Errors Listed")
            return
        }
        const newReview = {
          
        }
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
                    {/* {hasSubmitted && errorsObj.country && (
                        <div className='error'>
                            * {errorsObj.country}
                        </div>
                    )} */}
                </div>

                <div className='product-available-div'>
                    <label className='product-label' >
                        Available
                        <input className='product-input' type="number"
                            value={available}
                            onChange={(e) => setAvailable(e.target.value)}
                            placeholder='Available' />
                    </label>
                    {/* {hasSubmitted && errorsObj.country && (
                        <div className='error'>
                            * {errorsObj.country}
                        </div>
                    )} */}
                </div>

                <div className='product-avg-rating-div'>
                    <label className='product-label' >
                        Average Rating
                        <input className='product-input' type="number"
                            value={avgRating}
                            onChange={(e) => setAvgRating(e.target.value)}
                            placeholder='Average Rating' />
                    </label>
                    {/* {hasSubmitted && errorsObj.country && (
                        <div className='error'>
                            * {errorsObj.country}
                        </div>
                    )} */}
                </div>

                <div className='product-price-div'>
                    <label className='product-label' >
                        Price
                        <input className='product-input' type="number"
                            value={avgRating}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Price' />
                    </label>
                    {/* {hasSubmitted && errorsObj.country && (
                        <div className='error'>
                            * {errorsObj.country}
                        </div>
                    )} */}
                </div>

                <div className='product-category-div'>
                    <label className='product-label' >
                        Category
                        <input className='product-input' type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder='Category' />
                    </label>
                    {/* {hasSubmitted && errorsObj.country && (
                        <div className='error'>
                            * {errorsObj.country}
                        </div>
                    )} */}
                </div>

                <div className='product-description-div'>
                    <label className='product-label' >
                        Description
                        <input className='product-input' type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description' />
                    </label>
                    {/* {hasSubmitted && errorsObj.country && (
                        <div className='error'>
                            * {errorsObj.country}
                        </div>
                    )} */}
                </div>

                <div className='product-shipping-div'>
                    <label className='product-label' >
                        Free Shipping
                        <input className='product-input' type="checkbox"
                            value={freeShipping}
                            onChange={handleCheck}
                            placeholder='Description' />
                    </label>
                    {/* {hasSubmitted && errorsObj.country && (
                        <div className='error'>
                            * {errorsObj.country}
                        </div>
                    )} */}
                </div>

            </form>


        </div>
    );
}

export default ReviewForm;