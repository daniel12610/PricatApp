import React, { useState } from 'react';
import logo from '../images/icon.png';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword, address, phone } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !address || !password || !confirmPassword) {
      toast.error('Por favor, completa todos los campos', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const customerURL = "http://localhost:5000/customers";
      const response = await axios.post(customerURL, formData);

      if (response.status === 201) {
        toast.success('¡Registro exitoso!', {
          position: toast.POSITION.TOP_CENTER,
        });

        setFormData({
          name: '',
          email: '',
          address: '',
          phone: '',
          password: '',
          confirmPassword: '',
        });

        navigate('/Login');
      } else {
        toast.error('Error en el registro', {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error registrando al customer', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Container fluid className='login-bg'>
      <Container className=' arepas-form d-flex justify-content-center align-items-center' style={{ minHeight: '70vh', marginTop: '10vh', marginBottom: '5vh', minWidth: '80px'}}>
        <Row>
          <Link to='../'>
            <Image className='brandlogo' src={logo} alt='' style={{ margin: '0 auto', display: 'block', width: '200px', height: '200px' }} />
          </Link>
          <h1 className='titulo' style={{ fontWeight: 600, color: 'black' }}>Registrate</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Correo Electrónico *</Form.Label>
              <Form.Control type='email' value={email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Nombre Completo *</Form.Label>
              <Form.Control type='name' value={name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Dirección *</Form.Label>
              <Form.Control type='text' value={address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Teléfono *</Form.Label>
              <Form.Control type='text' required maxlength='10' pattern='[0-9]*' value={phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type='password' value={password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control type='password' value={confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
            </Form.Group>

            <Button type='submit' style={{ backgroundColor: '#996E65', margin: 'auto', border: 'none', display: 'flex', textAlign: 'center', justifyContent: 'center' }}>
              Registrate
            </Button>

            <br></br>

            <Form.Label className='form-label' style={{ display: 'flex', justifyContent: 'center' }}>
              ¿Ya tienes una cuenta? <a href='/Login'>Inicia Sesión</a>
            </Form.Label>
          </Form>
        </Row>
      </Container>
      <ToastContainer limit={3} />
    </Container>
  );
};