import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editReview, getOneReview } from "../../store/review";
import '../PostReviewForm/ReviewForm.css'

function EditReviewForm() {

    const history = useHistory()

    const dispatch = useDispatch()
    const {reviewId} = useParams()

    let reviewToEdit = useSelector((state) => state.reviews.singleReviewGet)
    let user = useSelector((state) => state.session.user)


    useEffect(() => {
        dispatch(getOneReview(reviewId))
    }, [dispatch, reviewId])
    // console.log('edit review', reviewToEdit)


    const [review, setReview] = useState(reviewToEdit.review || '')
    const [stars, setStars] = useState(reviewToEdit.stars || '')

    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // console.log('review value',review)

    useEffect(() => {
        if (Object.values(reviewToEdit).length) {
            setReview(reviewToEdit.review)
            setStars(reviewToEdit.stars)
        }
    }, [reviewToEdit])

    useEffect(() => {
        let e = {}
        setErrors(e)
        if (!review) e.review = "Must submit a review"
        if (review.length < 40) e.reviewLength = "Review must be at least 40 characters"
        if (!stars) e.stars = "Must submit a value for stars."
        // if (!imageURL) e.imageURL = "Must submit an image URL."
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        if (Object.values(errors).length) {
            // console.log("ERRORS!")
            return
        }

        await dispatch(editReview(reviewId, review, stars))

        history.push(`/products/${reviewToEdit.product.id}`)
    }

    if (!Object.values(reviewToEdit).length
        || !user
        || !Object.keys(reviewToEdit.product).includes('ProductImages')
        || !Object.keys(reviewToEdit.product).includes('Shop')) {
        return null
    }

    return (
        <>
        <div className="formParent">
        <form onSubmit={handleSubmit} className='wholeForm'>
            <div className='headerAndReview'>
                <div className='productPic'>
                    <img src={reviewToEdit.product.ProductImages[0].url} alt='not found'/>
                    <div className="productName">
                     <p>{reviewToEdit.product.Shop.name}</p>
                    <p style={{fontWeight:'bolder', fontSize:'larger'}}>{reviewToEdit.product.name}</p>
                    </div>
                </div>
            </div>
            <h2>My review</h2>
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

            <div className='submitButtonParent'>
                <input onClick={handleSubmit} className='submit-button form-create-button red-styling edit-review-button' type="submit" value="Edit Your Review" />
            </div>
        </form>
        </div>
        </>
    )
}

export default EditReviewForm
