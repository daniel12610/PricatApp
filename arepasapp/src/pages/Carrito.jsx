import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./Carrito.css";
import Form from 'react-bootstrap/Form';
import { ArepaCarrito } from '../components/ArepaCarrito';
import { NavHeader } from '../components/NavHeader';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { clearCart } from '../features/cart/cartSlice';
import axios from 'axios';

export const Carrito = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const isLogged = useSelector((state) => state.auth.logged);
  const totalPrice = useSelector((state) => state.cart.cartTotalAmount);
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.name,
    address: user.address,
    phone: user.phone,
    notes: '',
    price: totalPrice
  });

  const handleOrderDetails = async (orderId, cartItems) => {
    const orderDetailsURL = "http://localhost:5000/ordersDetails";

    try {
      await Promise.all(cartItems.map(async (item) => {
        const response = await axios.post(orderDetailsURL, {
          orderId: orderId,
          productId: item.productId,
          quantity: item.quantity,
          priceOrder: item.price * item.quantity
        });

        if (response.status === 201) {
          const data = response.data;
          const orderDetailId = data.id;
        } else {
          toast.error('Error registrando los detalles de su orden (status)', { position: toast.POSITION.TOP_CENTER });
          console.log(response.status)
        }
      }));
      toast.success('Compra exitosa!', { position: toast.POSITION.TOP_CENTER });

    } catch (error) {
      console.error('Error:', error);
      toast.error('Error registrando los detalles de su orden', { position: toast.POSITION.TOP_CENTER });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/orders', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        const data = response.data;
        const orderId = data.id;

        toast.success('Compra exitosa!', { position: toast.POSITION.TOP_CENTER });

        setFormData({
          name: '',
          address: '',
          phone: '',
          notes: '',
          price: ''
        });

        // CREAR ORDER DETAILS
        handleOrderDetails(orderId, cart.cartItems);
        // LIMPIAR CARRO Y VOLVER AL INDEX
        navigate("/");
        dispatch(clearCart());

      } else {
        toast.error('Error registrando su orden (response)', { position: toast.POSITION.TOP_CENTER });
        console.log(response);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error registrando su orden', { position: toast.POSITION.TOP_CENTER });
    }

  };

  const renderForm = () => {
    const handleChange = (e, field) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre Completo *</Form.Label>
          <Form.Control
            type="text"
            required
            defaultValue={user.name}
            onChange={(e) => handleChange(e, 'name')}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dirección *</Form.Label>
          <Form.Control
            type="text"
            required
            defaultValue={user.address}
            onChange={(e) => handleChange(e, 'address')}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Telefono *</Form.Label>
          <Form.Control
            type="text"
            required
            defaultValue={user.phone}
            onChange={(e) => handleChange(e, 'phone')}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Notas</Form.Label>
          <Form.Control
            type="text"
            style={{ height: '60px' }}
            onChange={(e) => handleChange(e, 'notes')}
          />
        </Form.Group>

        <Link to="/Pedidos">
          <Button type="submit" style={{ backgroundColor: isLogged ? '#996E65' : 'gray', border: 'none' }}>
            {isLogged ? 'Volver al carrito' : 'Modificar pedido'}
          </Button>
        </Link>
        <Button type="submit" style={{ backgroundColor: '#996E65', border: 'none' }}>
          Enviar compra
        </Button>
      </Form>
    );
  };

  return (
    <Row>
      <NavHeader />
      <Col xs={12} md={6} className="column">
        <h2 className="titulo">PEDIDO</h2>
        {cart.cartItems.map((cartItem) => (
          <ArepaCarrito
            key={cartItem.id}
            imageUrl={cartItem.imageUrl}
            name={cartItem.name}
            description={cartItem.description}
            quantity={cartItem.quantity}
          />
        ))}
        <div className='total-title'><h5>TOTAL DE COMPRA ${totalPrice}</h5></div>
      </Col>
      <Col xs={12} md={6} className="column">
        <div className="d-flex flex-column h-100">
          <h2 className="titulo">DATOS DEL ENVÍO</h2>
          <div className="flex-grow-1">
            {renderForm()}
          </div>
        </div>
      </Col>
    </Row>
  );
};
