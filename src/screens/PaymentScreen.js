import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentScreen() {
  return (
    <div>PaymentScreen</div>
  )
}

export default PaymentScreen