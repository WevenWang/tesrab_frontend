import React, { useEffect } from "react";
import { Link, useParams, useLocation, useSearchParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, TabContent } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


function CartScreen() {
   
    const {id} = useParams()
    const productId = id
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchParams,setSearchParams]=useSearchParams()
    const qty=searchParams.get('qty')
    

    const cart = useSelector(state => state.cart)
    // destruct the cart and pulling from cartItems
    const {cartItems} = cart
    // console.log("qty,id => ", qty, id)
    // console.log("cart Items: ", cartItems)

    // make sure the user is logged in
    const userLogin = useSelector(state => state.userLogin)
    // destruct user login
    const { userInfo } = userLogin

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
        
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (idToRemove) => {
        // console.log("remove: ", idToRemove)
        dispatch(removeFromCart(idToRemove))
    }

    const checkoutHandler = () => {
        if(!userInfo) {
            navigate('/login')
        } else {
            navigate('/shipping')
        }
        
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your cart is empty <br></br> 
                        <br></br>     
                        <Link to="/" className="btn btn-outline-dark">Continue Shopping</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src = {item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.price}
                                    </Col>

                                    <Col md={3}>
                                        <Form.Select
                                           
                                            value={item.qty}
                                            onChange={(event) => {
                                                dispatch(addToCart(item.product, event.target.value))
                                                // this is needed because otherwise page refresh will revert qty value 
                                                setSearchParams({qty: event.target.value })
                                                }}
                                        >
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Col>

                                    <Col md={1}>
                                        <Button type='button' variant="outline-dark" onClick={() => removeFromCartHandler(item.product)}><i className="fas fa-trash"></i></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            {/* use reduce method to loop through array and add item quantities to the accumulator */}
                            <h3>SubTotal  [{cartItems.reduce((accumulator, item) => accumulator + Number(item.qty), 0)}]  items</h3>
                            {/* toFixed limit the price to 2 decimal places */}
                            Total Price: ${cartItems.reduce((accumulator, item) => accumulator + Number(item.qty) * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            onClick={checkoutHandler}
                            variant='outline-dark'
                            className='btn btn-block w-100' 
                            disabled={cartItems.length === 0}
                            type='button'
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;