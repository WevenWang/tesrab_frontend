import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userAction'
import { Redirect } from 'react-router-dom'
 
function LoginScreen() {
    // set initial state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')  

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [searchParams,setSearchParams]=useSearchParams()
    const redirect=searchParams.get('redirect') ? searchParams.get('redirect') : '/'

    const userLogin = useSelector(state => state.userLogin)
    // destruct user login
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        console.log('submitted')
    }
    return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
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
            <br></br>
            <Button type='submit' variant='primary' className='btn w-100'>Sign In</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}> Register</Link>
            </Col>
        </Row>
    </FormContainer>
    )
}

export default LoginScreen