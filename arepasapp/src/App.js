//import logo from './logo.svg';
import './styles.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import {Register} from './pages/Register';
import {Carrito} from './pages/Carrito';
import {ArepasList} from './pages/ArepasIndex';
import {Pedidos} from './pages/Pedidos';
import { ContactUs } from './pages/Contact';

function App() {

  return (
    <div className="App">

      <React.Fragment>

      <Layout>
        <Router>
          <Routes> 
              <Route exact path="/" element={<Index/>} />
              <Route path="/Index" element={<Index/>} />
              <Route path="/Login" element={<Login/>} />
              <Route path="/Register" element={<Register/>} />
              <Route path="/Products" element={<ArepasList/>} />
              <Route path="/Carrito" element={<Carrito/>} />
              <Route path="/Pedidos" element={<Pedidos/>} />
              <Route path='/Contact' element={<ContactUs/>} />
          </Routes>
        </Router>
      </Layout>
      </React.Fragment>
    </div>
  );
}



export default App;