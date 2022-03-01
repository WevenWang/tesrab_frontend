import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { deleteUser, listUsers } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function UserListScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete
    useEffect(() => {
        if( userInfo && userInfo.isAdmin ) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
        
    }, [dispatch, navigate, userInfo, successDelete])

    const deleteHandler = (id, name) => {
        if(window.confirm(`Are you sure you want to delete user: ${name}`)){
            dispatch(deleteUser(id))
        }
        
    }
    return (
        <div>
            <h1>Users</h1>
            {
                loading ? ( <Loader /> ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                {/* true of false for admin */}
                                <th>ADMIN</th>
                                <th>Edit</th> 
                                <th>Delete</th> 
                            </tr>
                            
                        </thead>

                        <tbody>
                                {users.map( user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{color: 'green'}}></i>
                                        ) : (
                                            <i className='fas fa-times' style={{color: 'red'}}></i>
                                        ) }</td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button className='btn-sm w-100' variant='outline-dark'>
                                                    <i className='fas fa-edit fa-2x'></i>
                                                </Button>
                                            </LinkContainer>
                                        </td>

                                        <td>
                                                <Button 
                                                    className='btn-sm w-100' 
                                                    variant='outline-danger' 
                                                    onClick={() => deleteHandler(user._id, user.name)}
                                                >
                                                    <i className='fas fa-trash fa-2x'></i>
                                                </Button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                    </Table>
                )
            }
        </div>
    )
}

export default UserListScreen