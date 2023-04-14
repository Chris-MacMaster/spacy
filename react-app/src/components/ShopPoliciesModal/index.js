import { useDispatch, useSelector } from 'react-redux'
import './ShopPoliciesModal.css'
import { useEffect } from 'react'
import { fetchShops } from '../../store/shops'

export default function ShopPoliciesModal({ shopId }) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchShops())
    }, [dispatch])
    const shops = useSelector(state => state.shops.allShops)
    const shop = shops[shopId]
    return (
        <div className='shop-policies' >
            <h1 className='shop-policies-title'>Shop Policies for {shop.name}</h1>
            <p className='shop-policies-text'>{shop.policies}</p>
            <h3 className='shop-policies-cancellations'>Cancellations</h3>
            <p>Cancellations: accepted</p>
            <p>Request a cancellation: before item has shipped</p>
            <h3 className='shop-policies-payments'>Payments</h3>
            <p className='shop-policies-'>
                <i className="fa-solid fa-lock lock-icon">
                    </i>Secure options</p>
            <div className='credit-cards'>
            <img src='https://i.imgur.com/QfGSupn.png'
            alt='credit-cards'></img>
            <p className='shop-policies-gift-cards'>Accepts spacey gift cards and Republic Credits</p>
            <p className='shop-policies-sharing'>spacey keeps your payment information secure. spacey shops never recevie your credit card information.</p>
            </div>
        </div>
    )
}
