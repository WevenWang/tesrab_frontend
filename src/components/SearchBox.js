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
                type='search'
                name='q'
                onChange={ (e) => setKeyword(e.target.value)}
                placeholder='search products'
                className='mr-sm-2 ml-sm-5'
            >

            </Form.Control>
            
            <Button
                type='submit'
                variant='outline-light'
                className='mr-3'
            >
                Search
            </Button>
        </Form>
    )
}

export default SearchBox