import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editReview, getOneReview } from "../../store/review";
import '../PostReviewForm/ReviewForm.css'

function EditReviewForm() {

    const history = useHistory()
    const dispatch = useDispatch()
    const {reviewId} = useParams()
    const reviewToEdit = useSelector((state) => state.reviews.singleReviewGet)
    const user = useSelector((state) => state.session.user)


    useEffect(() => {
        dispatch(getOneReview(reviewId))
    }, [dispatch, reviewId])

    const [review, setReview] = useState(reviewToEdit.review || '')
    const [stars, setStars] = useState(reviewToEdit.stars || '')
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (Object.values(reviewToEdit).length) {
            setReview(reviewToEdit.review)
            setStars(reviewToEdit.stars)
        }
    }, [reviewToEdit])

    useEffect(() => {
        const e = {}
        setErrors(e)
        if (!review) e.review = "Must submit a review"
        if (review.length < 40) e.reviewLength = "Review must be at least 40 characters"
        if (!stars) e.stars = "Must submit a value for stars."

    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        if (Object.values(errors).length) {
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
                {[1, 2, 3, 4, 5].map((ele, i) => (
                    <span className={`review-span`}

                        onClick={() => setStars(ele)}
                        key={'star' + ele} >
                        <i className={`fa-solid fa-star ${stars >= ele ? `review-filled` : `review-empty`}`} key={ele}></i>
                    </span>
                ))}

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
