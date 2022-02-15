import React, { useState, useEffect } from 'react';
import {Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product';
import axios from 'axios';
import {listProducts} from '../actions/productActions'

function HomeScreen() {
  const dispatch = useDispatch()
  // also have other states like productList, 
  const productList = useSelector(state => state.productList)
  const { error, loading, products } = productList

  // initialize products array to empty state 
  // const [products, setProducts] = useState([]);

  // useEffect gets triggered when a component loads
  // or when a state attribute is changed
  // useEffect needs to be triggered only when component first load
  useEffect(() => {
    // wrap wait inside an async function
    // async function fetchProducts() {
    //   // use wait to return the promise
    //   // destructure into data
    //   const {data} = await Axios.get('/api/products/');
    //   setProducts(data);
    // }

    // fetchProducts()

    dispatch(listProducts());
    
  }, [])

  return (
    <div>
        <h1>Latest Products</h1>
        {loading ? <h2>Loading...</h2>
            : error ? <h3>Error Fetching Product Data</h3>
                : 
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            {/* pass product as props into Product component */}
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
        }
        
    </div>
  );
}

export default HomeScreen;
