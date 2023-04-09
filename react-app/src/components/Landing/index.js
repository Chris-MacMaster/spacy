import './Landing.css'

function Landing({ isLoaded }) {
    return (
        <div className='landing-div'>
        { isLoaded ? <h1>Incredible style and decor, plus one-of-a-kind gifts right this way</h1> : <h1>Welcome back user firstname</h1>}
        <div className='top-banner-suggest'>
            <div className='top-banner-suggestions'>
                <img src='https://i.imgur.com/NtSDPdE.png'
                alt='product'
                className='suggest-image'></img>
                <p>Jewelry</p></div>
            <div className='top-banner-suggestions'>
                <img src='https://i.imgur.com/bKS0Vs5.jpg'
                alt='product'
                className='suggest-image'></img>
                <p>Adventure Outfitting</p></div>
            <div className='top-banner-suggestions'>
                <img src='https://i.imgur.com/WQ691xR.png'
                alt='product'
                className='suggest-image'></img>
                <p>Rations and Foodstuffs</p></div>
            <div className='top-banner-suggestions'>
                <img src='https://i.imgur.com/KWP0Qte.png'
                alt='product'
                className='suggest-image'></img>
                <p>Furniture and Decor</p>
            </div>
            <div className='top-banner-suggestions'>
                <img src='https://i.imgur.com/pePufdv.jpg'
                alt='product'
                className='suggest-image'></img>
                <p>Something Else!</p>
            </div>
            <div className='top-banner-suggestions'>
                <img src='https://i.imgur.com/gdYYdaQ.png'
                alt='product'
                className='suggest-image'></img>
                <p>On Sale</p></div>
            </div>
        </div>
    )
}

export default Landing
