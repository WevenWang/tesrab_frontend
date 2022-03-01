import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox';


function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout)
    }
    return (
    <header>
        <Navbar bg="black" variant='dark' expand="lg" collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand>
                    <img alt="Tesrab" src="https://tesrab.s3.amazonaws.com/tesrab_bunny_text.png" height="120"  className="d-inline-block align-top"/>
                    
                </Navbar.Brand>
            </LinkContainer>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <SearchBox />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <LinkContainer to='/'>
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    
                    <LinkContainer to='/cart'>
                        <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                    </LinkContainer>

                    {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>
                                    Profile
                                </NavDropdown.Item>
                            </LinkContainer>

                            <NavDropdown.Divider />

                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <LinkContainer to='/login'>
                            <Nav.Link ><i className="fas fa-user"></i> Login</Nav.Link>
                        </LinkContainer>
                    )}

                    {userInfo && userInfo.isAdmin && (
                        <NavDropdown title='Admin' id='adminmenu'>
                            <LinkContainer to='/admin/userlist'>
                                <NavDropdown.Item>
                                    Users
                                </NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to='/admin/productlist'>
                                <NavDropdown.Item>
                                    Products
                                </NavDropdown.Item>
                            </LinkContainer>

                            <LinkContainer to='/admin/orderList'>
                                <NavDropdown.Item>
                                    Orders
                                </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    )}
                    
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
    )
}

export default Header;
