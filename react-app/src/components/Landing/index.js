import { useEffect, useState } from 'react'
import './Landing.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/product'
import { authenticate } from '../../store/session'
import { fetchOneShop, fetchShops } from '../../store/shops'
import ProductCard from '../ProductCard'
import { NavLink, useHistory } from 'react-router-dom'
import LoadingIcon from '../LoadingIcon'
import PopularGifts from '../PopularGifts'
import { fetchCart } from '../../store/cart'
import { getSearchResults } from '../../store/search'

function Landing({ isLoaded }) {
    const dispatch = useDispatch()
    const [ hasLoaded, setHasLoaded ] = useState(false)

    const history = useHistory()

    const products = useSelector(state => state.products.allProducts)
    const user = useSelector(state => state.session.user)
    const under30arr = Object.values(products).filter(p=> parseInt(p.price) < 30)
    const under30 = under30arr[Math.floor(Math.random()*under30arr.length)]
    const others = Object.values(products).filter(p=> p !== under30)
    const title = ['Creating Change', 'Gifts for Her', 'Gifts for Him', 'Gifts for Kids', 'Gifts Under $30']

    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchProducts())
            await dispatch(authenticate())
            await dispatch(fetchShops())
            await dispatch(fetchOneShop(1))
            return setHasLoaded(true)
        }
        loadData()
    }, [dispatch])

    useEffect(() => {
        if(user) dispatch(fetchCart())
    }, [dispatch, user])


    const handleSubmitJewelry = async (e) => {
        e.preventDefault()
        await dispatch(getSearchResults("Jewelry"))
        await dispatch(fetchCart())
        history.push(`/search/${"Jewelry"}`)
    }

    const handleSubmitAdventureOutfitting = async (e) => {
        e.preventDefault()
        await dispatch(getSearchResults("Adventure Outfitting"))
        await dispatch(fetchCart())
        history.push(`/search/${"Adventure Outfitting"}`)
    }

    const handleSubmitRationsandFoodstuffs = async (e) => {
        e.preventDefault()
        await dispatch(getSearchResults("Rations and Foodstuffs"))
        await dispatch(fetchCart())
        history.push(`/search/${"Rations and Foodstuffs"}`)
    }

    const handleSubmitFurnitureandDecor = async (e) => {
        e.preventDefault()
        await dispatch(getSearchResults("Furniture and Decor"))
        await dispatch(fetchCart())
        history.push(`/search/${"Furniture and Decor"}`)
    }

    const handleSubmitAdventureOutfittingexclaim = async (e) => {
        e.preventDefault()
        await dispatch(getSearchResults("Adventure Outfitting!"))
        await dispatch(fetchCart())
        history.push(`/search/${"Adventure Outfitting!"}`)
    }

    const handleSubmitOnSale = async (e) => {
        e.preventDefault()
        await dispatch(getSearchResults("On Sale"))
        await dispatch(fetchCart())
        history.push(`/search/${"On Sale"}`)
    }




    if (!hasLoaded) return <LoadingIcon />

    const rand1 = products[13] ? products[13] : others[Math.floor(Math.random()*others.length)]
    const rand2 = products[7] ? products[7] : others[Math.floor(Math.random()*others.length)]
    const rand3 = products[2] ? products[2] : others[Math.floor(Math.random()*others.length)]
    const rand4 = products[14] ? products[14] : others[Math.floor(Math.random()*others.length)]

    return (
        <div className='landing-div'>
        <div className='landing-header-accent'></div>
        <div className='landing-80'>
        <div className='landing-header'>
        { !user ? <h1 className='welcome-title'>Incredible style and decor, plus one-of-a-kind gifts right this way</h1> : <h1 className='welcome-title'>Welcome back {user.firstName}</h1>}

        <div className='top-banner-suggest'>
            <div className='top-banner-suggestions' onClick={handleSubmitJewelry}>
                <div className='suggest-image-div'>
                <img src='https://i.imgur.com/NtSDPdE.png'
                alt='product'
                className='suggest-image'></img>
                </div>
                <p className='suggest-image-text'>Jewelry</p>
            </div>
            <div className='top-banner-suggestions' onClick={handleSubmitAdventureOutfitting}>
                <div className='suggest-image-div'>
                <img src='https://i.imgur.com/bKS0Vs5.jpg'
                alt='product'
                className='suggest-image'></img>
                </div>
                <p className='suggest-image-text'>Adventure Outfitting</p></div>
            <div className='top-banner-suggestions' onClick={handleSubmitRationsandFoodstuffs}>
                <div className='suggest-image-div'>
                <img src='https://i.imgur.com/WQ691xR.png'
                alt='product'
                className='suggest-image'></img>
                </div>
                <p className='suggest-image-text'>Rations and Foodstuffs</p></div>
            <div className='top-banner-suggestions' onClick={handleSubmitFurnitureandDecor}>
                <div className='suggest-image-div'>
                <img src='https://i.imgur.com/KWP0Qte.png'
                alt='product'
                className='suggest-image'></img>
                </div>
                <p className='suggest-image-text'>Furniture and Decor</p>
            </div>
                        <div className='top-banner-suggestions' onClick={handleSubmitAdventureOutfittingexclaim}>
                <div className='suggest-image-div'>
                <img src='https://i.imgur.com/pePufdv.jpg'
                alt='product'
                className='suggest-image'></img>
                </div>
                <p className='suggest-image-text'>Adventure Outfitting!</p>
            </div>
            <div className='top-banner-suggestions' onClick={handleSubmitOnSale}>
                <div className='suggest-image-div'>
                <img src='https://i.imgur.com/gdYYdaQ.png'
                alt='product'
                className='suggest-image'></img>
                </div>
                <p className='suggest-image-text'>On Sale</p></div>
            </div>
            </div>

            <div className='from-etzy-sellers'>
                <div className='by-etsy-header'>
                    <p className='sponsored'>Sponsored <i className="fa-solid fa-question"></i></p>
                    <h2 className='by-etsy-title'>By Spacey Sellers</h2>
                </div>

                {[products["5"], products["6"], products["7"], products["8"], products["12"], products["1"]].map(product => (
                product?.ProductImages[1]?.url ? (
                <NavLink to={`/products/${product.id}`}
                style={{ textDecoration: 'none' }}
                key={`navlink${product.id}`}
                >
                    <ProductCard product={product}
                    key={`${product.id}`}/>
                </NavLink>
                ) : null
                ))}

                <div className='from-etzy-closing'>
                    <span className='closing-text'>
                    Fun fact: behind every sponsored item there is an intelligent lifeform hoping you'll check out their shop
                    </span>
                </div>
            </div>

            <div className='shop-our-selections'>
                <div className='shop-our-titles'>
                <h2 className='shop-our-title'>Shop our selections <i className="fa-solid fa-arrow-right shop-our-title"></i></h2>
                <h3 className='shop-our-title'>Curated hand-picked by spacey editors</h3>
                </div>


                <div className='shop-our-mapped'>


        {[rand1, rand2, rand3, rand4, under30].map((rand,i) => (
            <NavLink to={`/search/filtered-search/${title[i]}`}
                    style={{ textDecoration: 'none' }}
                    key={i}>
                <div className='selection-card'
                // onClick={history.push(`/search/${rand.category}`)}
                key={`div${i}`}>
                <img src={`${rand?.ProductImages[1]?.url}`}
                        alt='selection-im'
                        key={`img${i}`}
                        className='shop-our-select-img'></img>
                <h3 key={`h3${i}`}
                className='selection-subtitle'>{title[i]}</h3>
                </div>
            </NavLink>
                    ))}


                </div>
            </div>

            <div className='popular-gifts' >
            <div className='popular-gifts-titles'>
                <h1>Popular gifts right now</h1>
            </div>
            <div className='popular-gifts-mapped'>
            {Object.values(products).reverse().map((p,i)=>
            <NavLink to={`/products/${p.id}`} style={{textDecoration: "none"}}>
                <PopularGifts product={p} key={i} />
            </NavLink>
            )}
            </div>
            </div>

            <div className='what-is-etzy'>
                <h1 className='what-is-title'>What is Spacey</h1>
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
                <h2 className='have-questions'>Have a question? Well, we've got some answers.</h2>
            </div>
        </div>
        </div>
    )
}

export default Landing
