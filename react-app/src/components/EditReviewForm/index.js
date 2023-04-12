import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { fetchOneProduct } from "../../store/product";
import { createProductReview, editReview, getOneReview } from "../../store/review";
import '../PostReviewForm/ReviewForm.css'

function EditReviewForm() {
    
    const dispatch = useDispatch()
    const {reviewId} = useParams()
    
    let reviewToEdit = useSelector((state) => state.reviews.singleReviewGet)
    useEffect(() => {
        dispatch(getOneReview(reviewId))
    }, [])
    console.log('edit review', reviewToEdit)


    const [review, setReview] = useState(reviewToEdit.review || '')
    const [stars, setStars] = useState(reviewToEdit.stars || '')

    console.log('review value',review)

    useEffect(() => {
        if (Object.values(reviewToEdit).length) {
            setReview(reviewToEdit.review)
            setStars(reviewToEdit.stars)
        }
    }, [reviewToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault()

        dispatch(editReview(reviewId, review, stars))
    }

    if (!Object.values(reviewToEdit).length) return null

    return (
        <>
        <h1>Edit Review Form</h1>
        <form onSubmit={handleSubmit} className='wholeForm'>
            <div className='headerAndReview'>
                <div className='topText'>{`Edit your review of ${reviewToEdit.product.name}`}</div>
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

export default EditReviewForm