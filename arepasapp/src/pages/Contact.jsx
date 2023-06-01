import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { NavHeader } from '../components/NavHeader';
import './Pedidos.css';
import Form from 'react-bootstrap/Form';

export const ContactUs = () => {



  return (
    <body>
      <NavHeader />
      <div className='Cart-bg'>
        <div className='container arepas-form d-flex justify-content-center align-items-center' style={{ minHeight: '40vh', marginTop: '20vh', marginBottom: '20vh', minWidth: '50vw' }}>
          <div className='row'>
           
            <Form.Group className='mb-3'>
              <Form.Label style={{align:"center"}}><h1>¿Tiene sugerencias?</h1></Form.Label>
              <Form.Control type='sugerencias'  />
            </Form.Group>

            <Link to = "../">
                <Button type='submit' style={{ backgroundColor: '#996E65', margin: 'auto', border: 'none', display: 'flex', textAlign: 'center', justifyContent: 'center' }}>Enviar</Button>
            </Link>
          </div>
        </div>
      </div>
    </body>
  );
};