import React from 'react';
import './ReviewIndexItem.css'
import { useSelector } from 'react-redux';
import { deleteReview } from '../../store/review';
import { useDispatch } from "react-redux"
import OpenModalButton from '../OpenModalButton'
import { NavLink } from 'react-router-dom';

import DeleteReviewModal from '../DeleteReviewModal/DeleteReview';

const ReviewIndexItem = ({ review }) => {
    // const history = useHistory()
    const dispatch = useDispatch()
    let user = useSelector((state) => state.session.user)

    const handleClick = (e) => {
        e.preventDefault()

    }


    return (
        <li onClick={handleClick} className='reviewIndexItem'>
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
                            {review.createdAt.slice(0, -12)} 
                        </div>
                    </div>
                {user && review.userId == user.id ? 
                <div>
                    <OpenModalButton modalComponent={<DeleteReviewModal reviewId={review.id}/>} buttonText={'Delete'}/>
                    <NavLink to={`/product-reviews/${review.id}/edit`}>
                    <button>Edit Review</button>
                    </NavLink>
                </div>
                : ''}
                </div>
                <div className='rev-col-b'>
                    {review.ReviewImages ? 
                    
                    <div className='rev-img'>
                        <img className='review-image-detail' src={review.ReviewImages.url} alt='not loaded' />
                    </div>
                    
                    : ''}
                </div>
            </div>
        </li>
    );
};

export default ReviewIndexItem;
