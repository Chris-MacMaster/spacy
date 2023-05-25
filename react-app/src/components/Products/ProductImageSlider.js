import { useEffect, useState } from "react";
import './ProductImageSlider.css'
export default function ProductImageSlider({ data, chosenImage, setChosenImage }) {
    const [ current, setCurrent ] = useState(chosenImage ? chosenImage : 0)
    const nextSlide = () => {
        setCurrent(current === data.length - 1 ? 0 : current+1)
        setChosenImage(current === data.length - 1 ? 0 : current+1)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? data.length - 1 : current-1)
        setChosenImage(current === 0 ? data.length - 1 : current-1)
    }

    useEffect(() => {
        setCurrent(chosenImage ? chosenImage
            : chosenImage === 0 ? 0 :
            current)
    }, [chosenImage])

    if (!data || !data.length) return null
    return (
        <div className="product-image-slider">
            <div className="left-arrow" onClick={prevSlide}><i className="fa-solid fa-circle-left"/></div>
            <div className="right-arrow" onClick={nextSlide}><i className="fa-solid fa-circle-right"/></div>
            {data.map((img, i) =>
            <div className={i === current ? 'slide active' : 'slide'} key={i}>
                {i === current && (
                <img src={img.url} className="slider-images" alt="" key={i}/>
                )}
            </div>
            )}
        </div>
    )
}
