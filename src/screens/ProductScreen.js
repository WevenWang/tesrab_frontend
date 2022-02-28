import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';

import { createProductReview, listProductDetails } from '../actions/productActions'
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import products from '../products';
import axios from 'axios';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';


function ProductScreen() {
    const [qty, setQty] = useState(1)

    // for product review
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const match = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview, 
        error: errorProductReview, 
        success: successProductReview
    } = productReviewCreate

    // useEffect gets triggered when a component loads
    // or when a state attribute is changed
    // useEffect needs to be triggered only when component first load
    useEffect(() => {

        if( successProductReview || errorProductReview !== '') {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.id))
        // pass dispatch and match as parameters to useEffect function
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        // console.log("add to cart: ", match.id)
        navigate(`/cart/${match.id}?qty=${qty}`)
    }

    const submitReviewHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.id, 
            {
                rating,
                comment
            }
        ))
    }

    return (
        <div>
            <Link to='/' className="btn btn-outline-dark my-3">
                Go Back
            </Link>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    (
                        <div>
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
                            </Row>


                            <Row>
                                <Col md={6}>
                                    <h4>Reviews</h4>
                                    <br></br>
                                    {
                                        product.reviews.length === 0 && 
                                        <Message variant='info'>No Review has been added to this product yet</Message>
                                    }

                                    <ListGroup variant='flush'>
                                        {product.reviews.map(review => (
                                            <ListGroup.Item key={review._id}>
                                                <h5>{review.name}</h5>
                                                <Rating value={review.rating} color='#f8e825' />
                                                <p>
                                                    {review.createdAt.substring(0,10)}
                                                </p>
                                                <p>
                                                    {review.comment}
                                                </p>
                                            </ListGroup.Item>
                                        ) )}
                                        <ListGroup.Item>
                                            <br></br>
                                            <h4>Write a review</h4>

                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <Message variant='success'>Your review is submitted!</Message>}
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                            <br></br>
                                            {userInfo ? (
                                                <Form onSubmit={submitReviewHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Select
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}    
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Select>
                                                    </Form.Group>

                                                    <br></br>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            rows={5}
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}    
                                                        ></Form.Control>
                                                    </Form.Group>
                                                    <br></br>

                                                    <Button 
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='outline-dark'
                                                        className='w-100'
                                                    >Submit</Button>
                                                </Form>
                                            ) : (
                                                <Message variant='info'>
                                                    Please <Link to='/login'>login</Link> to write a review
                                                </Message>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )
                }

            
        </div>
        
        );
}

export default ProductScreen;
 