import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { removeFromCart, decreaseCart, increaseCart} from '../features/cart/cartSlice';
import { Image, ButtonToolbar, Button } from 'react-bootstrap';
import "../pages/Pedidos.css";
import { addToCart } from '../features/cart/cartSlice';


export const ArepaPedidos = ({ imageUrl, name, price, totalPrice, cartQuantity, item}) => {
  const [quantity, setQuantity] = useState(cartQuantity);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  }; 

  const handleDecreaseCart = (cartItem) => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    };
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    setQuantity(quantity + 1);
    dispatch(increaseCart(cartItem));
  };

  return (
    <>
      <td>
        <Image src={imageUrl} style={{ width: '120px', height: '90px' }} alt="Arepa con huevo perico" />
      </td>
      <td>{name}</td>
      <td>{price}</td>
      <td>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ButtonToolbar>
            <Button style={{ width: '40px', backgroundColor: '#996E65', border: 'none' }} onClick={() => handleDecreaseCart(item)}>-</Button>
            <input type="text" value={quantity} readOnly className="form-control" style={{ width: '50px', textAlign: 'center' }} />
            <Button style={{ width: '40px', backgroundColor: '#996E65', border: 'none' }} onClick={() => handleIncreaseCart(item)}>+</Button>
          </ButtonToolbar>
        </div>
      </td>
      <td>{totalPrice}</td>
      <td><i onClick={() => handleRemoveFromCart(item)} className='bx bxs-trash-alt cart-remove'></i></td>
    </>
  );
};