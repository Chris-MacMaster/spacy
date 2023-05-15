import './LoadingIcon.css'
import React from 'react'
import Lottie from 'react-lottie';
import loadingRocket from './loadingrocket.json'

export default function LoadingIcon() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingRocket,
    };
    return (
        <div className='loading-container'>
            <Lottie options={defaultOptions} id="loading-lottie" />
        </div>
    )
}
