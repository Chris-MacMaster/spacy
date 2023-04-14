import { useDispatch, useSelector } from 'react-redux'
import './ShopPoliciesModal.css'
import { useEffect } from 'react'
import { fetchShops } from '../../store/shops'

export default function ShopPoliciesModal({ shop }) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchShops())
    }, [dispatch])

    return (
        <div className='shop-policies' >
            <h1
            id='shop-pol-title'
            className='shop-policies-title'>Shop Policies for {shop.name}</h1>
            <p id='shop-pol-text'
            className='shop-policies-text'>{shop.policies}</p>
            <h3 className='shop-policies-cancellations'>Cancellations</h3>
            <p className='shop-policies-cancellations'>Cancellations: accepted</p>
            <p className='shop-policies-cancellations'>Request a cancellation: before item has shipped</p>
            <h3 className='shop-policies-payments'>Payments</h3>
            <p className='shop-policies-lock'>
                <i className="fa-solid fa-lock lock-icon">
                    </i>Secure options</p>
            <div className='credit-cards'>
            <img src='https://i.imgur.com/QfGSupn.png'
            alt='credit-cards'
            className='credit-cards-img'></img>
            <p className='shop-policies-gift-cards'>Accepts Spacey gift cards and Republic Credits</p>
            <p className='shop-policies-sharing'>Spacey keeps your payment information secure. Spacey shops never recevie your credit card information.</p>
            </div>
        </div>
    )
}
