import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../images/icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../features/auth/authSlice';
import { Button, Container } from 'react-bootstrap'
import { clearCart } from '../features/cart/cartSlice';


export const NavHeader = () => {
    
const navigate = useNavigate();

const user = useSelector((state:RootState) => state.auth.userInfo);
const isLogged = useSelector((state:RootState) => state.auth.logged);

const dispatch = useDispatch();

const handleLogout = (e) => {
    navigate('/Index');
    dispatch(logOut());
    dispatch(clearCart());
}

const renderWelcomeRedux = () => {
    if (isLogged){
        return(
                <h3>Bienvenido, {user.name}.</h3>
        )
    }
}

const renderUserButtonsRedux = () => {
    if (isLogged){
        return(
            <button type="submit" onClick={(e) => handleLogout(e)} className="btn confirm">Cerrar Sesión</button>
        )
    }else if (isLogged === false){
        return(

            <div >
                <Link to="../Login">
                    <button type="submit" className="btn confirm" style={{ display: 'flex', margin: '0 1vw', width: '10vw'}}>Inicia Sesión</button>
                </Link>
            </div>
        )  
    }
};



    return(
        <header class="index-header">

        <Container style={{ display: 'flex', flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between' }}>
            <Container style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap',alignItems: 'center', width: '50%' }}>
                <Link to="../Index">
                <img className="logo-img" src={logo} /> 
                </Link>

                <h1 className="titulo">ArepasYa!</h1>

                <Link to = "../Contact">
                <Button className='btn confirm' style={{ display: 'flex', margin: '0 1vw', width: '10vw'}}>Contáctenos</Button>
                </Link>
            </Container>

            <Container style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',alignItems: 'center', justifyContent: 'center' , width: '50%'}}>
                {renderWelcomeRedux()}
                
                <Nav className="nav-icon">
                    <Nav className="navbar-brand d-flex align-items-center" href="#">
                        <div className="boton" >
                            {renderUserButtonsRedux()}
                        </div>
                    </Nav>
                </Nav>
            </Container>
        </Container>
        </header>
    )
}