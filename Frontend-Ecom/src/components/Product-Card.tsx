import React from 'react'
import { FaCartPlus } from 'react-icons/fa6';

// think what's needed to make the UI
type ProductsProp = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: (id : string) => void;
}


const ProductCard = ({productId, name, photo, price, stock, handler}: ProductsProp) => {
  return (
    <div className='product-card'>
        <img src={`${photo}`} alt={name} />
        <p>{name}</p>
        <span>{price}</span>

        <div>
            <button onClick={() => handler(productId)}>
                <FaCartPlus />
            </button>
        </div>
    </div>
  )
}

export default ProductCard