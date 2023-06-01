import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

export const ArepaCard = ({ productId, imageUrl, name, description, price }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const product = { productId, imageUrl, name, description, price, quantity };
    dispatch(addToCart(product));
  };

  return (
    <Card className="product-card" style={{ display: 'flex', alignItems: 'center', maxWidth: '300px'}}>
      <img src={imageUrl} className="img-fluid product-image" alt={name} style={{ display: 'flex', height: '40%', width: '100%' }}/>
      <Card.Body>
        <Card.Title className="titulo" style={{ textAlign: 'left' }}>
          {name}
        </Card.Title>
        <Card.Text style={{ display: 'flex', height: '30%', width: '100%', overflow: 'hidden',textOverflow: 'ellipsis' }}>
          {description}
        </Card.Text>
        <Card.Text>
          <h5 className="titulo" style={{ textAlign: 'left' }}>$ {price}</h5>
        </Card.Text>
       
      </Card.Body>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '85%', position: 'absolute', bottom: '0px'}}>
          <ButtonToolbar>
            <Button style={{ width: '25%', backgroundColor: '#996E65', border: 'none' }} onClick={handleDecrement}>
              -
            </Button>
            <input type="text" value={quantity} readOnly className="form-control" style={{ width: '50px', textAlign: 'center' }} />
            <Button style={{ width: '25%', backgroundColor: '#996E65', border: 'none' }} onClick={handleIncrement}>
              +
            </Button>
          </ButtonToolbar>

          <Button style={{ backgroundColor: '#996E65', border: 'none', marginTop: '1vh', width: '100%'}} onClick={handleAddToCart}>
            Agregar al carrito
          </Button>
        </div>
    </Card>
  );
};