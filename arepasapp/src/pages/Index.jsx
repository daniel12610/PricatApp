import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { NavHeader } from '../components/NavHeader';
import { ArepasList } from './ArepasIndex';
import { ToastContainer} from 'react-toastify';

export const Index = () => {

  // localStorage.removeItem('cartItems');
  const cartQuantity = useSelector((state) => state.cart.cartTotalQuantity);

  return (
    <body>
      <NavHeader />
      <section className="main-home">
        <div className="main-text">
          <h2>¡30 días de<p></p> entregas gratis!</h2>
          <h3>En tus pedidos favoritos</h3>
          <div className="main-btn">
            Pedir ahora<i className="bx bxs-chevron-right"></i>
          </div>
        </div>
      </section>
      <br />

      <div className="container main-menu">
        <ArepasList />
      </div>
      <br />
      <Link to="../Pedidos">
        <Button className="rounded-circle bottom-0 end-0 m-3">
          <FontAwesomeIcon icon={faCartShopping} />
          <span className="cart-quantity">{cartQuantity}</span>
        </Button>
      </Link>

      <ToastContainer limit={3}/>
    </body>
  );
};