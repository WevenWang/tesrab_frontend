import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';

import { listProductDetails } from '../actions/productActions'
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import products from '../products';
import axios from 'axios';


function ProductScreen() {
    const [qty, setQty] = useState(1)

    const match = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    // useEffect gets triggered when a component loads
    // or when a state attribute is changed
    // useEffect needs to be triggered only when component first load
    useEffect(() => {
        dispatch(listProductDetails(match.id))
        // pass dispatch and match as parameters to useEffect function
    }, [dispatch, match])

    const addToCartHandler = () => {
        // console.log("add to cart: ", match.id)
        navigate(`/cart/${match.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className="btn btn-outline-dark my-3">
                Go Back
            </Link>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    (<Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={product.rating} text={` ${product.numReviews} reviews`} color={'#f8e825'}/>
                                </ListGroup.Item>

                                <ListGroup.Item >
                                    <strong>Price: ${product.price}</strong>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>

                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price: </Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status: </Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs='auto' className='my-1'>
                                                    <Form.Select
                                                        value={qty}
                                                        onChange={(event) => setQty(event.target.value)}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            variant='outline-dark'
                                            className='btn btn-block w-100' 
                                            disabled={product.countInStock > 0 ? false : true} 
                                            type='button'
                                        >
                                            Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>)
                }

            
        </div>
        
        );
}

export default ProductScreen;
 