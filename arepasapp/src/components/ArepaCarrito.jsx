import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../pages/Carrito.css";

export const ArepaCarrito = ({ id, imageUrl, name, description, quantity }) => {
  return (
    <div>
      <Card className="square rounded-pill my-2" style={{ maxWidth: '560px', height: '148px' }}>
        <Row className='g-0'>
          <Col xs='auto'>
            <img src={imageUrl} className="img-fluid product-image-cart" style={{ width: '10vw', height: '144px' }} alt={name} />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                {description}
                <h5>Cantidad Total: {quantity}</h5>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
