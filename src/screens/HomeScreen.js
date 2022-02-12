import React, { useState, useEffect } from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import Axios from 'axios';

function HomeScreen() {

  // initialize products array to empty state 
  const [products, setProducts] = useState([]);

  // useEffect gets triggered when a component loads
  // or when a state attribute is changed
  // useEffect needs to be triggered only when component first load
  useEffect(() => {
    // wrap wait inside an async function
    async function fetchProducts() {
      // use wait to return the promise
      // destructure into data
      const {data} = await Axios.get('/api/products/');
      setProducts(data);
    }

    fetchProducts()
    
  }, [])
  return (
    <div>
        <h1>Latest Products</h1>
        <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    {/* pass product as props into Product component */}
                    <Product product={product} />
                </Col>
            ))}
        </Row>
    </div>
  );
}

export default HomeScreen;
