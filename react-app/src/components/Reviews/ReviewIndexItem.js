import React from 'react';
import './ReviewIndexItem.css'
import { useSelector } from 'react-redux';
import { deleteReview, fetchProductReviews } from '../../store/review';
import { useDispatch } from "react-redux"
import OpenModalButton from '../OpenModalButton'
import { NavLink } from 'react-router-dom';

import DeleteReviewModal from '../DeleteReviewModal/DeleteReview';
// import { deleteReview } from '../../store/review';


const ReviewIndexItem = ({ review , product}) => {
    // const history = useHistory()

    console.log('product in reviews', product)
    const dispatch = useDispatch()
    let user = useSelector((state) => state.session.user)

    const handleClick = (e) => {
        e.preventDefault()

    }

    const handleDeleteClick = (e) => {
        e.preventDefault()
        dispatch(deleteReview(review.id))
        dispatch(fetchProductReviews(product.id))
    }

    if (!Object.values(review).length || !product) return null

    return (
        <div onClick={handleClick} className='reviewIndexItem'>
            <div className='product-card-div, review-card-div' >
                <div className='rev-col-a'>
                    <div className='rev-stars'>
                        {Array(5).fill(1).map((s, i) => (
                            i < review.stars ? (
                                <i className="fa-solid fa-star gold-star landing-shop-stars"></i>
                            ) : (
                                <i className="fa-solid fa-star blank-star landing-shop-stars"></i>
                            )
                        ))}
                        {review.stars} (stars)
                    </div>
                    <div className='rev-review'>
                        {review.review}
                    </div>

                    <div className='rev-author-info'>
                        <div className='author-names'>
                            <img id='detail-review-icon' src='https://i.imgur.com/mMEwXsu.png' alt='usericon'
                                className='user-icon detail-icon'></img>
                            <div className='author-subdiv-names'>
                                {review.author_first} {review.author_last}
                            </div>
                        </div>
                        <div className='review-created'>
                            {Object.values(review).length && review.createdAt ? (<p>

                                {review.createdAt.slice(0, -12)}
                            </p>): null}
                        </div>
                    </div>
                {user && Object.values(review).length > 0 && review.userId === user.id ?
                <div>
                    {/* <OpenModalButton modalComponent={<DeleteReviewModal reviewId={review.id} product={product}/>} buttonText={'Delete'}/> */}
                    <button className='delete-review-button' onClick={handleDeleteClick}>Delete Review</button>

                    <NavLink to={`/product-reviews/${review.id}/edit`}>
                    <button className='edit-review-button'>Edit Review</button>
                    </NavLink>
                </div>
                : null}
                </div>
                <div className='rev-col-b'>
                    {review.ReviewImages ?

                    <div className='rev-img'>
                        <img className='review-image-detail' src={review.ReviewImages.url} alt='not loaded' />
                    </div>

                    : null}
                </div>
            </div>
        </div>
    );
};

export default ReviewIndexItem;
