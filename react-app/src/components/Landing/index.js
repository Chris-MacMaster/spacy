import './Landing.css'

function Landing({ isLoaded }) {
    return (
        <div className='landing-div'>
        { isLoaded ? <h1 className='welcome-title'>Incredible style and decor, plus one-of-a-kind gifts right this way</h1> : <h1 className='welcome-title'>Welcome back user firstname</h1>}
        <div className='top-banner-suggest'>
            <div className='top-banner-suggestions'>
                <div className='suggest-image-div'>
                <img src='https://i.imgur.com/NtSDPdE.png'
                alt='product'
                className='suggest-image'></img>
                </div>
                <p>Jewelry</p></div>
            <div className='top-banner-suggestions'>
                <div className='suggest-image-div'>
                <img src='https://i.imgur.com/bKS0Vs5.jpg'
                alt='product'
                className='suggest-image'></img>
                </div>
                <p>Adventure Outfitting</p></div>
            <div className='top-banner-suggestions'>
                <div className='suggest-image-div'>
                <img src='https://i.imgur.com/WQ691xR.png'
                alt='product'
                className='suggest-image'></img>
                </div>
                <p>Rations and Foodstuffs</p></div>
            <div className='top-banner-suggestions'>
                <div className='suggest-image-div'>
                <img src='https://i.imgur.com/KWP0Qte.png'
                alt='product'
                className='suggest-image'></img>
                </div>
                <p>Furniture and Decor</p>
            </div>
            <div className='top-banner-suggestions'>
                <div className='suggest-image-div'>
                <img src='https://i.imgur.com/pePufdv.jpg'
                alt='product'
                className='suggest-image'></img>
                </div>
                <p>Something Else!</p>
            </div>
            <div className='top-banner-suggestions'>
                <div className='suggest-image-div'>
                <img src='https://i.imgur.com/gdYYdaQ.png'
                alt='product'
                className='suggest-image'></img>
                </div>
                <p>On Sale</p></div>
            </div>
        </div>
    )
}

export default Landing
