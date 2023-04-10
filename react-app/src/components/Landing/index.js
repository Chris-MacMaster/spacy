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

            <div className='what-is-etzy'>
                <h1>What is Spacey</h1>
                <div className='column-container'>
                <div className='text-column'>
                    <h2 className='column-title'>A community of explorers and curious minds</h2>
                    <p className='what-is-paragraph'> Spacey is a online marketplace where people come together to expand our horizons and the horizons of mankind. Around here we think of the final frontier as too vast, too curious, and we're a moth to a flame.</p>
                </div>
                <div className='text-column'>
                    <h2 className='column-title'>Support independent creators</h2>
                    <p className='what-is-paragraph'> There's no centralized warehouse at Spacey, not even a central solar systems, just billions of intelligent lifeforms sharing technology and selling things they love. We make the whole process of connecting with others parsecs away painless, so that we can all discover something extraordinary.</p>
                </div>
                <div className='text-column'>
                    <h2 className='column-title'>Peace of mind</h2>
                    <p className='what-is-paragraph'> Who is out there? When we finally make contact, will they wish us harm? Coerce our labor in mining camps on a barely habitable moon? Your safety is the highest priority of our dedicated team. And if you ever need assistance, we are always ready to step in for support and mediate peace between waring galactic federations.</p>
                </div>
                </div>
                <h2>Have a question? Well, we've got some answers.</h2>
            </div>
        </div>
    )
}

export default Landing