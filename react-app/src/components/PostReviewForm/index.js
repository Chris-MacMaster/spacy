import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { fetchOneProduct } from "../../store/product";
import { createProductReview } from "../../store/review";

export default function PostReviewForm() {
    let product = useSelector((state) => state.products.singleProduct)
    let user = useSelector((state) => state.session.user)

    const dispatch = useDispatch()
    const {productId} = useParams()
    useEffect(() => {
        dispatch(fetchOneProduct(productId))
    }, [])

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(1)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await dispatch(createProductReview(product.id, review, stars, user))
    }

    if (!user) {
        return null
    }

    return (
        <>
        <h1>Review Form</h1>
        <form onSubmit={handleSubmit} className='wholeForm'>
            <div className='headerAndReview'>
                <div className='topText'>{`How did you like ${product.name}?`}</div>
                <textarea name='review' className='reviewText' value={review} onChange={(e) => setReview(e.target.value)}/>
            </div>
            <div>
                Stars
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
            <div className='submitButtonParent'>
                <button type='submit' className='submitButton' disabled={review.length < 10 || stars < 1}>Submit Your Review</button>
            </div>
        </form>
        </>
    )
}