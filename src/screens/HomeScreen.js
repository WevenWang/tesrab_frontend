import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import SliderShow from '../components/SliderShow'

function HomeScreen() {

  // const navigate = useNavigate()

  const location = useLocation()

  const dispatch = useDispatch()
  // also have other states like productList, 
  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList

  let keyword = location.search
  
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

    dispatch(listProducts(keyword));
    // pass in dispatch as an array to useEffect
  }, [dispatch, keyword])

  return (
    <div>
        {!keyword && <SliderShow />}
       
        <h1>Latest Products</h1>
        {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
                : 
                <div>
                  <Row>
                      {products.map(product => (
                          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                              {/* pass product as props into Product component */}
                              <Product product={product} />
                          </Col>
                      ))}
                  </Row>
                  <Paginate page={page} pages={pages} keyword={keyword}/>
                </div>
        }
        
    </div>
  );
}

export default HomeScreen;
