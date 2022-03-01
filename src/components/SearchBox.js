import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
function SearchBox() {

    // state for search keyword
    const [keyword, setKeyword] = useState('')

    const navigate = useNavigate()

    const location = useLocation()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            // this is a get request
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            // keep the user on the current page
            navigate(location.pathname)
        }
    }
    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={ (e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            >

            </Form.Control>
            
            <Button
                type='search'
                variant='outline-success'
                className='mr-3'
            >
                Search Product
            </Button>
        </Form>
    )
}

export default SearchBox