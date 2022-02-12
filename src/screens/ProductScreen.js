import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';
import axios from 'axios';


function ProductScreen() {

    const match = useParams();
    // initialize products array to empty state 
    const [product, setProduct] = useState([]);

    // useEffect gets triggered when a component loads
    // or when a state attribute is changed
    // useEffect needs to be triggered only when component first load
    useEffect(() => {
        // wrap wait inside an async function
        async function fetchProduct() {
        // use wait to return the promise
        // destructure into data
        const {data} = await axios.get(`/api/products/${match.id}`);
        setProduct(data);
        }

        fetchProduct()
        
    }, [])
    return (
        <div>
            <Link to='/' className="btn btn-dark my-3">
                Go Back
            </Link>

            <Row>
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

                            <ListGroupItem>
                                <Button className='btn btn-block w-100\' disabled={product.countInStock > 0 ? false : true} type='button'>Add to Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
        
        );
}

export default ProductScreen;
 