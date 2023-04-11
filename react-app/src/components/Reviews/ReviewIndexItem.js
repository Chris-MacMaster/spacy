import React from 'react';
import './ReviewIndexItem.css'

// import { useDispatch } from "react-redux"
// import { useHistory } from 'react-router-dom';

const ReviewIndexItem = ({ review }) => {
    // const history = useHistory()
    // const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()

    }

    return (
        <li onClick={handleClick} className='reviewIndexItem'>
            <div className='product-card-div, review-card-div' >
                <div className='rev-col-a'>
                    <div className='rev-stars'>
                        {review.stars} (stars)
                    </div>
                    <div className='rev-review'>
                        {review.review}
                    </div>
                    
                    <div className='rev-author-info'>
                        {review.userId} (review author id, for author name)
                        {review.createdAt} (needs formatting)
                    </div>
                </div>
                <div className='rev-col-b'>
                    <div className='rev-img'>
                        <img src={review.ReviewImages.url} alt='not loaded' />
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ReviewIndexItem;
