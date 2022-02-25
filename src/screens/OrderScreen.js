import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../actions/orderActions'
import { } from '../constants/orderConstants'

function OrderScreen() {

    const match = useParams()
    const orderId = match.id

    const orderDetail = useSelector(state => state.orderDetail)
    

    const {order, error, loading} = orderDetail

    const dispatch = useDispatch() 

    

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    }
    




    useEffect(() => {
        if(!order || order._id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId))
        }
        
    }, [order, orderId])

    

    


    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1 className='my-auto'>We have received your order!</h1>
            
            
            <Row>
                
                <Col md={8}>

                    
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order ID: {order._id}</h2>
                            <h2>
                                Shipping Address
                            </h2>
                            <p>
                                {/* comes from a serializer user attribute */}
                                <strong className='font-weight-bold'>Name: </strong> {order.user.name} 
                            </p>

                            <p>
                                {/* comes from a serializer user attribute */}
                                <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a> 
                            </p>

                            <p>
                                <strong>Shipping Address: </strong>
                                <br></br>
                                
                                {order.shippingAddress.address}
                                <br></br>
                                {order.shippingAddress.city}
                                <br></br>
                                {order.shippingAddress.postalCode}
                                <br></br>
                                {order.shippingAddress.country}
                                
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Order Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>This order is not delivered</Message>
                            )}
                        </ListGroup.Item>
                        <br></br>

                        <ListGroup.Item>
                            <h2>
                                Payment Method
                            </h2>
                            <p>
                                <strong>Payment Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Order Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>This order is not Paid</Message>
                            )}
                        </ListGroup.Item>
                        <br></br>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? 
                                (<Message variant='info'>
                                    Your order is empty
                                </Message>) : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
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
                                    <Col>$ {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>$ {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>$ {order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>$ {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            
                            {/* <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                                
                            </ListGroup.Item> */}
                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen