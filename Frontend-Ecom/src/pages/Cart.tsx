import React, { useEffect, useState } from 'react';
import { VscError } from 'react-icons/vsc';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const cartItems = [
  {
    productId: "sf",
    photo: "https://m.media-amazon.com/images/I/312wQIwK2TS._SX466_.jpg",
    name: "ret",
    price: 23432,
    quantity: 4,
    stock: 43,
  }
];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shipppingCharges = 200;
const total = subTotal + tax + shipppingCharges;
const discount = 400;

const Cart = () => {
  const [coupounCode, setCoupounCode] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);


  useEffect(() => {

    const id = setTimeout(() => {

      if(Math.random() > 0.5){
        setIsValid(true);
      }
      else setIsValid(false);

    }, 1000);

    return () => {
clearTimeout(id);
    }
  }, [coupounCode]);

  return (
    <div className="cart">
      <main>
        {
          cartItems.length > 0 ? cartItems.map((item, idx) => (
            <CartItem key={idx} cartItem={item}/>
          )) : (
            <h1>No items in cart. <Link to='home'>Shop Now</Link></h1>
          )
        }
      </main>

      <aside>
        <p>SubTotal: ${subTotal}</p>
        <p>Shipping Charges: ${shipppingCharges}</p>
        <p>Tax: ${tax}</p>
        <p>
          Discount: <em className='red'>- ${discount}</em>
        </p>

        <p>
          <p>Total: ${total}</p>
        </p>

        <input type="text" value={coupounCode} onChange={(e) => setCoupounCode(e.target.value)} />

        {coupounCode &&
          (isValid ? (
            <span className="green">
              ${discount} off using the <code>{coupounCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupoun Code <VscError />
            </span>
          ))}


          {
            cartItems.length && <Link to="/shipping">Checkout</Link>
          }
      </aside>
    </div>
  );
};

export default Cart;
