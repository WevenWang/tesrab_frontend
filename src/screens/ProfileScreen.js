import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'

function ProfileScreen() {
    // set initial state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')  
    const [message, setMessage] = useState('')   

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [searchParams,setSearchParams]=useSearchParams()

    // const redirect=searchParams.get('redirect') ? searchParams.get('redirect') : '/' 

    const userDetails = useSelector(state => state.userDetails)
    // destruct user login
    const {error, loading, user} = userDetails

    // make sure the user is logged in
    const userLogin = useSelector(state => state.userLogin)
    // destruct user login
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    // success is used to indicate update profile is complete,
    // user action set to update-profile-reset
    // navbar is uptodate
    const { success } = userUpdateProfile


    const orderListMy = useSelector(state => state.orderListMy)
    // success is used to indicate update profile is complete,
    // user action set to update-profile-reset
    // navbar is uptodate
    const { loading: loadingOrders, error: errorOrders, orders} = orderListMy


    useEffect(() => {
        // if the user is not logged in, send the user to the log in page
        if(!userInfo) {
            navigate('/login')
        } else {
            // check if the user details have been loaded
            if (!user || !user.name || success) {
                dispatch({
                    type: USER_UPDATE_PROFILE_RESET
                })
                // the input corresponds to the `/api/users/${id}/`
                dispatch(getUserDetails('profile'))

                // list orders associated with the user
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigate, userInfo, dispatch, user, success])



    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            // TODO: needs to log user out after updating password

            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
        
    }
    return (
        <Row>
            <Col md={3}>
                <h2>
                    User Profile
                </h2>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter your Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm your password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>
                    <Button type='submit' variant='outline-dark' className='btn w-100'>Update</Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped responsive hover bordered className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>$ {order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                        <i className='fas fa-times' style={{ color: 'red'}}></i>
                                    )}</td>

                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='outline-dark'>Details</Button>

                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen