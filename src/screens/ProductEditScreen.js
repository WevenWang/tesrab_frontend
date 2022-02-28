import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate, useMatch } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useParams } from 'react-router-dom'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'



function ProductEditScreen(){

    
  // set initial state
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState('')


    const dispatch = useDispatch()

    const match = useParams()
    const productId = match.id

    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = productUpdate


    useEffect(() => {

        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        } else {
            if(!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }
        
        
        
            
        

        
    }, [dispatch, product, productId, navigate, successUpdate])

    const goBackHandler = () => {
        navigate('/admin/productlist')
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct(
            {
                _id:productId,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description

            }
        ))
        
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)
        setUploading(true)
        try {
            // send image to backend

            // config header first
            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Button variant='outline-dark' onClick={goBackHandler}>
                    GO back

            </Button>
            <FormContainer>
                <h1>Edit Product details</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter your Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        >
                        </Form.Control>

                        <Form.Control
                            type="file"
                            // id='image-file'
                            label='Choose File'
                            
                            onChange={uploadFileHandler}
                        >
                            
                        </Form.Control>
                        {uploading && <Loader />}
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter product brand'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='countinstock'>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter product stock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter product category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter product description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <br></br>


                    

                    <Button type='submit' variant='outline-dark' className='btn w-100'>Update</Button>
                </Form>
                )}
                
            </FormContainer>
        </div>
        
    )
}

export default ProductEditScreen