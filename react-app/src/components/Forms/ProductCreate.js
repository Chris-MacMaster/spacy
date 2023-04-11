//src/components/SpotForm/CreateSpot.js
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux"
// import { editSpot, makeSpot } from '../../store/spot';
import { fetchOneSpot } from '../../store/spot';

// import "./CreateSpot.css"
// import "./EditSpot.css"
// import { actionResetReviews } from '../../store/review';


const EditSpotForm = ({ report, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch()


    // const [errorsObj, setErrorsObj] = useState({})
    // const [hasSubmitted, setHasSubmitted] = useState(false);



    useEffect(() => {
        // let eObj = {}
        // setErrorsObj(eObj)
    }, [])


    //get spot ID
    useEffect(() => {
        const fillFeilds = async () => {
            // let spotInfo = await dispatch(fetchOneSpot(spotId));


            // setCountry(spotInfo.country)
            // setTitle(spotInfo.name)
        }
        fillFeilds()
    }, [dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault();

        setHasSubmitted(true)
   
        }


        // const id = window



    };

    const reset = () => {
   
    };


    return (
        <div>
            {/* {hasSubmitted && errors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul>
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )} */}
            <form onSubmit={handleSubmit} >
                <h2>{formType}</h2>
                <div className='edit-intro-div'>
                    <p id='update-your-spot'>
                        Update your Spot
                    </p>
                    <p id='where-place'>
                        Where's your place located?
                    </p>
                    <p id='only-booked'>
                        Guests will only get your exact address once they booked a reservation.
                    </p>
                </div>
                <div className='country-address-div'>
                    <label className='country-label' >
                        Country
                        <input className='country-input' type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder='Country' />
                    </label>
                    {hasSubmitted && errorsObj.country && (
                        <div className='error'>
                            * {errorsObj.country}
                        </div>
                    )}

                    <label className='address-label'>
                        Street Address
                        <input className='address-input' type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Address' />
                    </label>
                    {hasSubmitted && errorsObj.address && (
                        <div className='error'>
                            * {errorsObj.address}
                        </div>
                    )}
                </div>


                <div className='city-state-div'>
                    <label id='city-input-label'>
                        City
                        <input className='city-input' type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='City' />
                        {hasSubmitted && errorsObj.city && (
                            <div className='error'>
                                * {errorsObj.city}
                            </div>
                        )}
                    </label>

                    <p className='comma'>
                        ,
                    </p>

                    <label id="state-input-label">
                        State
                        <input className='state-input' type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder='State' />
                        {hasSubmitted && errorsObj.state && (
                            <div className='error'>
                                * {errorsObj.state}
                            </div>
                        )}
                    </label>

                </div>


                <div className='lat-lng-div'>
                    <label>
                        Latitude
                        <input className='lat-input' type="text"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            placeholder='Latitude' />
                        {hasSubmitted && errorsObj.lat && (
                            <div className='error'>
                                * {errorsObj.lat}
                            </div>
                        )}
                        {hasSubmitted && errorsObj.latNum && (
                            <div className='error'>
                                * {errorsObj.latNum}
                            </div>
                        )}
                    </label>

                    <p className='comma'>
                        ,
                    </p>



                    <label>
                        Longitude
                        <input className='lng-input' type="text"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            placeholder='Longitude' />
                        {hasSubmitted && errorsObj.lng && (
                            <div className='error'>
                                * {errorsObj.lng}
                            </div>
                        )}
                        {hasSubmitted && errorsObj.lngNum && (
                            <div className='error'>
                                * {errorsObj.lngNum}
                            </div>
                        )}
                    </label>

                </div>

                <div className='description-label'>
                    <p id='describe-to-guests'>
                        Describe your place to guests
                    </p>
                    <p className='desc-text mention-text'>
                        Mention the best features of your space, any special amenities like
                        fast wifi or parking, and what you love about the neighborhood.
                    </p>
                </div>


                <textarea className='description-textarea'
                    placeholder='Please write at least 30 characters'
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}>

                </textarea>

                {hasSubmitted && errorsObj.description && (
                    <div className='error'>
                        * {errorsObj.description}
                    </div>
                )}

                {hasSubmitted && errorsObj.descriptionLength && (
                    <div className='error'>
                        * {errorsObj.descriptionLength}
                    </div>
                )}

                <div className='title-label'>
                    <p >
                        Create a title for your spot
                    </p>
                    <p className='desc-text'>
                        Catch guests' attention with a spot title that
                        highlights what makes your place special.
                    </p>
                </div>


                <input className='name-input' type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name of your spot' />

                {hasSubmitted && errorsObj.name && (
                    <div className='error'>
                        * {errorsObj.name}
                    </div>
                )}


                <div className='price-label'>
                    <p className='set-base-price'>
                        Set a base price for your spot
                    </p>
                    <p className='desc-text comp-pricing'>
                        Competitive pricing can help your listing stand out and rank
                        higher in search results.
                    </p>
                </div>


                <div className='price-div'>
                    <p className='dollar comma'>
                        $
                    </p>

                    <input className='price-input' type="text"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }}
                        placeholder='Price per night (USD)' />




                </div>
                <div id='price-error-div'>
                    {hasSubmitted && errorsObj.price && (
                        <div className='error'>
                            * {errorsObj.price}
                        </div>
                    )}
                </div>

                <input className='submit-button modal-button button red-styling' type="submit" value="Update your Spot" />
            </form>

        </div>
    );
}

export default EditSpotForm;