import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useParams } from 'react-router-dom'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


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

    const userUpdate = useSelector(state => state.userUpdate)
    // destruct user login
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({
                type: USER_UPDATE_RESET,
            })
            navigate('/admin/userlist')
        } else {
            if(!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)

            }
            
        }

        
    }, [dispatch, user._id, user.email, user.isAdmin, user.name, userId, navigate, successUpdate])

    const goBackHandler = () => {
        navigate('/admin/userlist')
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin}))
        
    }

    return (
        <div>
            <Button variant='outline-dark' onClick={goBackHandler}>
                    GO back

            </Button>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

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
                            checked={isAdmin}
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