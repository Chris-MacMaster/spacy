import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchOneProduct } from "../../store/product";
import { createProductReview } from "../../store/review";
import './ReviewForm.css'
import { fetchOneShop } from "../../store/shops";
import { urlChecka } from "../Cart/_helpers";

export default function PostReviewForm() {

    const dispatch = useDispatch()
    const history = useHistory()
    const {productId} = useParams()
    const product = useSelector((state) => state.products.singleProduct)
    const user = useSelector((state) => state.session.user)
    const [imageURL, setImageURL] = useState('')

    useEffect(() => {
        dispatch(fetchOneProduct(productId))
        dispatch(fetchOneShop(product.shopId))
    }, [dispatch, productId, product.shopId])

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let e = {}
        setErrors(e)
        if (!review) e.review = "Must submit a review"
        if (review.length < 40) e.reviewLength = "Review must be at least 40 characters"
        if (!stars) e.stars = "Must submit a value for stars."
        if(!urlChecka(imageURL) && imageURL !== "") e.imageURL = "Submitted urls must be valid."
    }, [review, stars, imageURL])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        if (Object.values(errors).length) return;
        await dispatch(createProductReview(product.id, review, stars, imageURL))
        history.push(`/products/${productId}`)
    }


    if (!user || !Object.keys(product).includes('ProductImages') || !Object.keys(product).includes('Shop')) return null


    return (
        <>
        <div className="formParent">
        <form className='wholeForm'>
            <div className='headerAndReview'>
                <div className='productPic'>
                    {product.ProductImages.length > 0 ?  <img src={product.ProductImages[0].url} alt='not loading'/> : null}
                    <div className="productName">
                     <p>{product.Shop.name}</p>
                    <p style={{fontWeight:'bolder', fontSize:'larger'}}>{product.name}</p>
                    </div>
                </div>
            </div>

            <p id="review-h2">My review</p>
            <p>What did you like about this product?</p>
            <p>Help others by sending your feedback.</p>

            <div>
                <div className="rate">
                  <input type="radio" id="star5" name="rate" value='5' onChange={(e) => setStars(Number(e.target.value))} />
                  <label htmlFor="star5" title="text">5 stars</label>
                  <input type="radio" id="star4" name="rate" value='4' onChange={(e) => setStars(Number(e.target.value))} />
                  <label htmlFor="star4" title="text">4 stars</label>
                  <input type="radio" id="star3" name="rate" value='3' onChange={(e) => setStars(Number(e.target.value))} />
                  <label htmlFor="star3" title="text">3 stars</label>
                  <input type="radio" id="star2" name="rate" value='2' onChange={(e) => setStars(Number(e.target.value))} />
                  <label htmlFor="star2" title="text">2 stars</label>
                  <input type="radio" id="star1" name="rate" value='1' onChange={(e) => setStars(Number(e.target.value))} />
                  <label htmlFor="star1" title="text">1 star</label>
                </div>
            </div>

            {hasSubmitted && errors.stars && (
                <div className='error'>
                    * {errors.stars}
                </div>
            )}

            <div>
                <textarea name='review' className='reviewText' value={review} onChange={(e) => setReview(e.target.value)}/>
            </div>

            {hasSubmitted && errors.review && (
                <div className='error'>
                    * {errors.review}
                </div>
            )}

            {hasSubmitted && errors.reviewLength && (
                <div className='error'>
                    * {errors.reviewLength}
                </div>
            )}

            <div>
                <div className="imageURLdiv">
                <label >Image URL
                </label>
                </div>
                <div className="imageURLinput">
                <input type='text' id='imageURL' value={imageURL} onChange={(e) => setImageURL(e.target.value)}></input>
                </div>
            </div>

            {hasSubmitted && errors.imageURL && (
                <div className='error'>
                    * {errors.imageURL}
                </div>
            )}

            <div className='submitButtonParent'>
                <input onClick={handleSubmit} className='submit-button form-create-button red-styling edit-review-button' type="submit" value="Post Your Review" />
            </div>
        </form>
        </div>
        </>
    )
}
