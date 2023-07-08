import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchOneProduct } from "../../store/product";
import { createProductReview } from "../../store/review";
import './ReviewForm.css'
import { fetchOneShop } from "../../store/shops";

export default function PostReviewForm() {

    const dispatch = useDispatch()
    const history = useHistory()
    const {productId} = useParams()
    const product = useSelector((state) => state.products.singleProduct)
    const user = useSelector((state) => state.session.user)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        dispatch(fetchOneProduct(productId))
        dispatch(fetchOneShop(product.shopId))
    }, [dispatch, productId, product.shopId])

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const err = {}
        setErrors(err)
        if (!review) err.review = "Must submit a review"
        if (review.length < 40) err.reviewLength = "Review must be at least 40 characters"
        if (!stars) err.stars = "Must submit a value for stars."
        if(!url) err.url = "Please upload an image."
    }, [review, stars, url])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        if (Object.values(errors).length) return;
        const reviewData = { product_id: productId, review, stars, url }
        await dispatch(createProductReview(reviewData))
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

            <h2 className="post-review-title">My review</h2>
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
                <textarea name='review' className='review-text' value={review} onChange={(e) => setReview(e.target.value)}/>
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
                <label >Image</label>
                </div>
                <div className="imageURLinput">
                <input type='file' id='imageURL' name='url' accept="image/*" onChange={(e) => setUrl(e.target.files[0])}></input>
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
