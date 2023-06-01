import React, { useEffect, useState } from 'react';
import "./Register.css";
import logo from '../images/icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { setLoggedUserInfo } from '../features/auth/authSlice';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Por favor, completa todos los campos', { position: toast.POSITION.TOP_CENTER });
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/customers');
      const customers = response.data;

      const existCustomer = customers.find(
        (customer) => customer.email === email && customer.password === password
      );

      if (existCustomer) {
        setFormData({
          email: '',
          password: '',
        });

        toast.success('Inicio de sesión exitoso!', { position: toast.POSITION.TOP_CENTER });

        dispatch(setLoggedUserInfo({
          name: existCustomer.name,
          email: existCustomer.email,
          address: existCustomer.address,
          phone: existCustomer.phone
        }));

        navigate('/');


      } else {
        toast.error('Credenciales incorrectas', { position: toast.POSITION.TOP_CENTER });
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('Error en el inicio de sesión', { position: toast.POSITION.TOP_CENTER });
    }
  };

  useEffect(() => {

  }, []);

  return (
    <Container fluid className='login-bg'>
      <Container className=" arepas-form d-flex justify-content-center align-items-center" style={{ minHeight: '70vh', marginTop: '10vh', marginBottom: '5vh', width: '40vw' }}>
        <Row>
          <Link to="../">
            <Image className="brandlogo" src={logo} alt='' style={{ margin: '0 auto', display: 'block', width: '200px', height: '200px' }} />
          </Link>
          <h1 className="titulo" style={{ fontWeight: 600, color: 'black' }}>Inicia Sesión</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </Form.Group>
            <Button type="submit" style={{ backgroundColor: '#996E65', margin: 'auto', border: 'none', display: 'flex', textAlign: 'center', justifyContent: 'center' }}>Inicia Sesión</Button>
            <br></br>
            <Form.Label className="form-label" style={{ display: 'flex', justifyContent: 'center' }}>
              ¿No tienes una cuenta? <a href="/register">Registrate aquí</a>
            </Form.Label>
          </Form>
        </Row>
      </Container>
      <ToastContainer limit={3} />
    </Container>
  );
};