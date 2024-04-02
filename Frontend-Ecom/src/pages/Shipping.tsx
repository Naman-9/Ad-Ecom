import React, { ChangeEvent, useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartReducerInitialState } from '../types/reducer-types';

const Shipping = () => {


    const { cartItems} = useSelector(
        (state: { cartReducer: CartReducerInitialState }) => state.cartReducer,
      );

  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if(cartItems.length <= 0) navigate("/cart");
  }, [cartItems]);

  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate('/cart')}>
        <BiArrowBack />
      </button>

      <form>
        <h1>Shipping Address</h1>

        <input
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
          required
        />

        <input
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
          required
        />
        <input
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
          required
        />

        <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
          <option value="">Choose Country</option>
          <option value="india">India</option>
          <option value="usa">U.S.A</option>
          <option value="uk">U.K.</option>
        </select>
        <input
          type="number"
          placeholder="Pin Code"
          name="pincode"
          value={shippingInfo.pincode}
          onChange={changeHandler}
          required
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;

