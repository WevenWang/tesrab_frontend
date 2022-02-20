import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import { Redirect } from 'react-router-dom'

function RegisterScreen() {
  // set initial state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')  
    const [message, setMessage] = useState('')   

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [searchParams,setSearchParams]=useSearchParams()
    const redirect=searchParams.get('redirect') ? searchParams.get('redirect') : '/'

    const userRegister = useSelector(state => state.userRegister)
    // destruct user login
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])



    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        // console.log('submitted')
        }
        
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
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
                        required
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
                        required
                        type='password'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <br></br>
                <br></br>
                <Button type='submit' variant='primary' className='btn w-100'>Register</Button>
            </Form>

             <Row className='py-3'>
                <Col>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}> Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen