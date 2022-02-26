import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate, useMatch } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useParams } from 'react-router-dom'


function UserEditScreen(){

    
  // set initial state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState('')


    const dispatch = useDispatch()

    const match = useParams()
    const userId = match.id

    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    // destruct user login
    const {error, loading, user} = userDetails

    useEffect(() => {
        
    }, [])

    const goBackHandler = () => {
        navigate('/admin/userlist')
    }


    const submitHandler = (e) => {
        e.preventDefault()
        
    }

    return (
        <div>
            <Button variant='outline-dark' onClick={goBackHandler}>
                    GO back

            </Button>
            <FormContainer>
                <h1>Edit User</h1>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
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
                            type='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='isadmin'>
                        <Form.Label>Password</Form.Label>
                        <Form.Check
                            type='checkbox'
                            label='Check if this is an admin user: '
                            check={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        >
                        </Form.Check>
                    </Form.Group>

                    <br></br>

                    <Button type='submit' variant='outline-dark' className='btn w-100'>Update</Button>
                </Form>
                )}
                
            </FormContainer>
        </div>
        
    )
}

export default UserEditScreen