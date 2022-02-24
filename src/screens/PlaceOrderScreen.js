import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'

function PlaceOrderScreen() {

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const dispatch = useDispatch() 

    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)

    cart.shippingPrice = (cart.itemsPrice > 100 ?  0 : 10).toFixed(2)

    cart.taxPrice = ((0.095) * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2) 

    if(!cart.paymentMethod) {
        navigate('/payment')
    }

    useEffect(() => {
        if(success){
            navigate(`/order/${order._id}`)
        }
    }, [navigate, success])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice

        }))
    }

    


    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Shipping Address
                            </h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}
                                <br></br>
                                {cart.shippingAddress.city}
                                <br></br>
                                {cart.shippingAddress.postalCode}
                                <br></br>
                                {cart.shippingAddress.country}
                                
                            </p>
                        </ListGroup.Item>
                        <br></br>

                        <ListGroup.Item>
                            <h2>
                                Payment Method
                            </h2>
                            <p>
                                <strong>Payment Method: </strong>
                                {cart.paymentMethod}
                                
                                
                            </p>
                        </ListGroup.Item>
                        <br></br>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? 
                                (<Message variant='info'>
                                    Your cart is empty
                                </Message>) : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>

                                                    <Col>
                                                        <Link className='text-decoration-none' to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={5}>
                                                        {item.qty} X ${item.price} = ${(item.qty *  item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}

                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>
                                    Order Summary
                                </h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>$ {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>$ {cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>$ {cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>$ {cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                                
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='w-100'
                                    variant="outline-dark"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen