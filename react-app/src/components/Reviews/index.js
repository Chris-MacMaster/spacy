import React from 'react';
import './ReviewIndexItem.css'
import { useSelector } from 'react-redux';
import { deleteReview, fetchProductReviews } from '../../store/review';
import { useDispatch } from "react-redux"
import { NavLink } from 'react-router-dom';

const ReviewIndexItem = ({ review , product}) => {
    const dispatch = useDispatch()
    let user = useSelector((state) => state.session.user)

    const handleDeleteClick = async (e) => {
        e.preventDefault()
        await dispatch(deleteReview(review.id))
        await dispatch(fetchProductReviews(product.id))
        await dispatch(fetch)
    }

    if (!Object.values(review).length || !product) return null

    return (
        <div  className='reviewIndexItem'>
            <div className='review-card-div' >
                <div className='rev-col-a'>
                    <div className='rev-stars'>
                        {Array(5).fill(1).map((s, i) => (
                            i < review.stars ? (
                                <i className="fa-solid fa-star gold-star  review-index-stars" key={`star${i}`}></i>
                            ) : (
                                <i className="fa-solid fa-star blank-star review-index-stars" key={`star${i}`}></i>
                            )
                        ))}
                        {review.stars} (stars)
                    </div>
                    <div className='rev-review'>
                        {review.review}
                    </div>

                    <div className='rev-author-info'>
                            <img id='detail-review-icon' src={review.User.profilePic} alt='usericon' className='user-icon detail-icon'></img>
                            <p className='author-subdiv-names'>
                                {review.User.firstName} {review.User.lastName} {review.createdAt.slice(0, -12)}
                            </p>
                    </div>
                {user && Object.values(review).length > 0 && review.userId === user.id ?
                <div>
                    <button className='delete-review-button' onClick={handleDeleteClick}>Delete Review</button>
                    <NavLink to={`/product-reviews/${review.id}/edit`}>
                    <button className='edit-review-button'>Edit Review</button>
                    </NavLink>
                </div>
                : null}
                </div>
                {review?.ReviewImages ? (
                    <img className='review-image-detail' src={review.ReviewImages?.url} alt='not loaded' />
                ) : null}
            </div>
            <hr className='review-hr'></hr>
        </div>
    );
};

export default ReviewIndexItem;
