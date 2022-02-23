import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'
function ShippingScreen() {

    // get shipping address from form
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    // dispatch the save shipping address action
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        // dispatch save shipping address
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        // then direct user to payment page
        navigate('/payment')
    }
    return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your Address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <br></br>


                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your City'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <br></br>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Enter your Postal Code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <br></br>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your Country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <br></br>
                <br></br>

                <Button
                    variant='outline-dark'
                    type='submit'
                    className='w-100'

                >
                    Continue
                </Button>
        </Form>
    </FormContainer>
    )
}

export default ShippingScreen