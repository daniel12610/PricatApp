import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { NavHeader } from '../components/NavHeader';
import { ArepaPedidos } from '../components/ArepaPedidos';
import { clearCart } from '../features/cart/cartSlice';
import './Pedidos.css';

export const Pedidos = () => {
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector((state) => state.cart.cartTotalAmount);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {}, []);

  return (
    <body>
      <NavHeader />
      <div className='Cart-bg'>
        <div className='container arepas-form d-flex justify-content-center align-items-center' style={{ minHeight: '40vh', marginTop: '20vh', marginBottom: '20vh', minWidth: '50vw' }}>
          <div className='row'>
            {cart.cartItems.length === 0 ? (
              <div className='empty-cart'>
                <h2>No tienes productos en tu carrito</h2>

                <Link to='/'>
                  <div className='d-flex justify-content-end'>
                    <div style={{ marginRight: '10px' }}>
                      <Button style={{ backgroundColor: 'red', border: 'none' }}>Volver</Button>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div>
                {/* SE CARGAN LOS DATOS */}
                <div className='col-md-12' style={{ fontWeight: 200, textAlign: 'center' }}>
                  <h1 className='titulo-cart' style={{ fontWeight: 600, textAlign: 'center' }}>
                    CARRITO
                  </h1>
                  <div className='d-flex justify-content-end'>
                    <Button style={{ backgroundColor: 'red', border: 'none' }} onClick={() => handleClearCart()}>
                      Vaciar carrito
                    </Button>
                  </div>
                  <Table style={{ margin: '0 auto', textAlign: 'center' }}>
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Valor Unitario</th>
                        <th>Cantidad</th>
                        <th>Valor Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.cartItems?.map((cartItem) => (
                        <tr>
                          <ArepaPedidos imageUrl={cartItem.imageUrl} name={cartItem.name} price={cartItem.price} totalPrice={cartItem.price * cartItem.quantity} cartQuantity={cartItem.quantity} item={cartItem} />
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <td colSpan='4'></td>
                  <td style={{ textAlign: 'right' }}>
                    <div className='total-title'>TOTAL ${totalPrice}</div>
                  </td>

                  <div className='d-flex justify-content-end'>
                    <div style={{ marginRight: '10px' }}>
                      <Link to='../Index'>
                        <Button style={{ backgroundColor: 'gray', border: 'none' }}>Seguir comprando</Button>
                      </Link>
                    </div>

                    <Link to='../Carrito'>
                      <Button style={{ backgroundColor: '#996E65', margin: 'auto', border: 'none' }}>Confirmar</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </body>
  );
};
