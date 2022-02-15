import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'

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
    // pass in dispatch as an array to useEffect
  }, [dispatch])

  return (
    <div>
        <h1>Latest Products</h1>
        {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
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
