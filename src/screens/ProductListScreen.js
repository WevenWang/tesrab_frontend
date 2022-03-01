import React, { useEffect } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { dispatch, useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { createProduct, deleteProduct, listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants'

function ProductListScreen() {

    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const location = useLocation()
    let keyword = location.search

    useEffect(() => {
        dispatch({
            type: PRODUCT_CREATE_RESET
        })
        if(!userInfo.isAdmin) {
            navigate('/login')
        }

        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(keyword))
        }

        // whenever success delete is triggered reload useEffect
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword])

    const deleteHandler = (id, name) => {
        if(window.confirm(`Are you sure you want to delete product: ${name}`)){
            dispatch(deleteProduct(id))
            
        }
        
    }

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='my-3' variant='outline-dark' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i>{' '}{' '}{' '}{' '}Create Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            <h1>Users</h1>
            {
                loading ? ( <Loader /> ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <div>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>Price</th>
                                    {/* true of false for admin */}
                                    <th>Category</th>
                                    <th>Brand</th> 
                                    <th>Edit</th> 
                                    <th>Delete</th> 
                                    
                                </tr>
                                
                            </thead>

                            <tbody>
                                    {products.map( product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>



                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button className='btn-sm w-100' variant='outline-dark'>
                                                        <i className='fas fa-edit fa-2x'></i>
                                                    </Button>
                                                </LinkContainer>
                                            </td>

                                            <td>
                                                    <Button 
                                                        className='btn-sm w-100' 
                                                        variant='outline-danger' 
                                                        onClick={() => deleteHandler(product._id, product.name)}
                                                    >
                                                        <i className='fas fa-trash fa-2x'></i>
                                                    </Button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                        </Table>
                        <Paginate pages={pages} page={page} isAdmin={true}/>
                    </div>
                )
            }
        </div>
    )
}

export default ProductListScreen