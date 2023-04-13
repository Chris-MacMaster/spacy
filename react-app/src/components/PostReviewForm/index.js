import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { fetchOneProduct } from "../../store/product";
import { createProductReview } from "../../store/review";
import './ReviewForm.css'
import { fetchOneShop } from "../../store/shops";

export default function PostReviewForm() {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const {productId} = useParams()
    
    
    let product = useSelector((state) => state.products.singleProduct)
    // let shop = useSelector((state) => state.shops.singleShop)
    let user = useSelector((state) => state.session.user)

    const [imageURL, setImageURL] = useState('')
    
    useEffect(() => {
        dispatch(fetchOneProduct(productId))
        let res = dispatch(fetchOneShop(product.shopId))
        console.log('state shop', res)
    }, [])

    const [review, setReview] = useState('')
    const [stars, setStars] = useState(1)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await dispatch(createProductReview(product.id, review, stars, ...imageURL))
        console.log('res', res)
        history.push(`/products/${productId}`)
    }

    //  || !product.ProductImages.length || !Object.values(product.Shop).length

    if (!user || !Object.keys(product).includes('ProductImages') || !Object.keys(product).includes('Shop')) {
        return null
    }

    return (
        <>
        <div className="formParent">
        <form onSubmit={handleSubmit} className='wholeForm'>
            <div className='headerAndReview'>
                <div className='productPic'>
                    {product.ProductImages.length > 0 ? 
                    <img src={product.ProductImages[0].url}/>
                    : ''}
                    <div className="productName">
                     <p>{product.Shop.name}</p>   
                    <p style={{fontWeight:'bolder', fontSize:'larger'}}>{product.name}</p>
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
            <div>
                <textarea name='review' className='reviewText' value={review} onChange={(e) => setReview(e.target.value)}/>
            </div>
            <div>
                <div className="imageURLdiv">
                <label >Image URL
                </label>
                </div>
                <div className="imageURLinput">
                <input type='text' id='imageURL' value={imageURL} onChange={(e) => setImageURL(e.target.value)}></input>
                </div>
            </div>
            <div className='submitButtonParent'>
                <button type='submit' className='submitButton' disabled={review.length < 10 || stars < 1}>Post Your Review</button>
            </div>
        </form>
        </div>
        </>
    )
}