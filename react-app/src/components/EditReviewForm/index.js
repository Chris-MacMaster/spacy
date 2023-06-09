import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editReview, getOneReview } from "../../store/review";
import '../PostReviewForm/ReviewForm.css'
import LoadingIcon from "../LoadingIcon";

function EditReviewForm() {

    const history = useHistory()
    const dispatch = useDispatch()
    const {reviewId} = useParams()
    const reviewToEdit = useSelector((state) => state.reviews.singleReviewGet)
    const user = useSelector((state) => state.session.user)
    const [ hasLoaded, setHasLoaded ] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            await dispatch(getOneReview(reviewId))
            return setHasLoaded(true)
        }
        loadData()
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
        if (Object.values(errors).length) return;
        await dispatch(editReview(reviewId, review, stars))
        history.push(`/products/${reviewToEdit.Product.id}`)
    }
    if (!hasLoaded) return <LoadingIcon />
    if (!Object.values(reviewToEdit).length
        || !user
        || !Object.keys(reviewToEdit.Product).includes('ProductImages')
        || !Object.keys(reviewToEdit.Product).includes('Shop')) {
        return null
    }

    return (
        <>
        <div className="formParent">
        <form onSubmit={handleSubmit} className='wholeForm'>
            <div className='headerAndReview'>
                <div className='productPic'>
                    <img src={reviewToEdit.Product.ProductImages[0].url} alt='not found'/>
                    <div className="productName">
                     <p className="review-form-text">{reviewToEdit.Product.Shop.name}</p>
                    <h3 className="review-form-text review-form-item-name">{reviewToEdit.Product.name}</h3>
                    </div>
                </div>
            </div>
            <h2>My review</h2>
            <p className="review-form-text">What did you like about this product?</p>
            <p className="review-form-text">Help others by sending your feedback.</p>
            <div>
                {[1, 2, 3, 4, 5].map((ele, i) => (
                    <span className={`review-span`} onClick={() => setStars(ele)} key={'star' + ele} >
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
