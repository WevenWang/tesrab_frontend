import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    // dispatch the save shipping address action
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // todo: initiate payment method to '' and let the user choose
    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    if(!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')



    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                        <br></br>
                        <Col>
                            <Form.Check 
                                type='radio'
                                label='Paypal, Credit Card'
                                id='paypal'
                                name='paymentMethod'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>

                            <Form.Check 
                                type='radio'
                                label='Stripe'
                                id='stripe'
                                name='paymentMethod'
                                // onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                        </Col>

                </Form.Group>
                <br></br>
                <Button type='submit' variant='outline-dark' className='w-100'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen