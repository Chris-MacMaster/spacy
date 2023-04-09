import React from 'react';

import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';

const ProductIndexItem = ({ product }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()

    }

    return (
        <li onClick={handleClick} className='productIndexItem'>

            <div title={product.name} className='product-card-div' >

            </div>
        </li>
    );
};

export default ProductIndexItem;
