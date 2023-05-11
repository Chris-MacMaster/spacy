import React from 'react';

const ProductIndexItem = ({ product }) => {
    const handleClick = (e) => {
        e.preventDefault()
    }

    return (
        <li onClick={handleClick} className='productIndexItem'>

            <div title={product.name} className='product-card-div' >
                {product.name}
            </div>
        </li>
    );
};

export default ProductIndexItem;
