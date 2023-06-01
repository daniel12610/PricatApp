import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Index.css';
import { Button, Container } from 'react-bootstrap';
import { ArepaCard } from '../components/ArepaCard';
import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";

export function ArepasList() {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(3);
  const baseUrl = 'http://localhost:5000/products';

  const getProducts = async () => {
    try {
      const response = await axios.get(baseUrl);
      setTotalData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getByPage = async (page, limit) => {
    getProducts();
    try {
      const response = await axios.get(`http://localhost:5000/products?_page=${page}&_limit=${limit}`);
      setData(response.data);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getByPage(currentPage, limit, 0);
  }, [currentPage]);

  const totalPages = Math.ceil(totalData.length / limit);

  const renderPagination = () => {
    if (currentPage === 1 && totalPages !== 1) {
      return (
        <div className='pagination'>
          <Button className='button-pagination'>{currentPage}</Button>
          <Button className='button-pagination' onClick={() => getByPage(currentPage + 1, 3)}>
            <HiChevronRight/>
          </Button>
          <Button className='button-pagination' onClick={() => getByPage(totalPages, 3)}>
            <HiChevronDoubleRight/>
          </Button>
        </div>
      );
    } else if (currentPage === totalPages && totalPages !== 1) {
      return (
        <div className='pagination'>
          <Button className='button-pagination' onClick={() => getByPage(1, 3)}>
            <HiChevronDoubleLeft/>
          </Button>
          <Button className='button-pagination' onClick={() => getByPage(currentPage - 1, 3)}>
            <HiChevronLeft/>
          </Button>
          <Button className='button-pagination'>{currentPage}</Button>
        </div>
      );
    } else if (totalPages === 1) {
      return (
        <div className='pagination'>
          <Button className='button-pagination'>{currentPage}</Button>
        </div>
      );
    } else {
      return (
        <div className='pagination'>
          <Button className='button-pagination' onClick={() => getByPage(1, 3)}>
          <HiChevronDoubleLeft/>
          </Button>
          <Button className='button-pagination' onClick={() => getByPage(currentPage - 1, 3)}>
            <HiChevronLeft/>
          </Button>
          <Button className='button-pagination'>{currentPage}</Button>
          <Button className='button-pagination' onClick={() => getByPage(currentPage + 1, 3)}>
            <HiChevronRight/>
          </Button>
          <Button className='button-pagination' onClick={() => getByPage(totalPages, 3)}>
            <HiChevronDoubleRight/>
          </Button>
        </div>
      );
    }
  };

  return (
    <div className='container main-menu'>
      <h1 className='titulo'>Menú principal</h1>
      <Row xs={1} md={3} className='g-4'>
        {data.map((per) => (
          <Col>
            <ArepaCard
              productId={per.id}
              imageUrl={require(`../images/${per.ImageName}`)}
              name={per.Name}
              description={per.Description}
              price={per.Price}
            />
          </Col>
        ))}
      </Row>
      <br />
      <Container className='centered-container'>{renderPagination()}</Container>
    </div>
  );
}