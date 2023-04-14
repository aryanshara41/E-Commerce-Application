import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// import { isUserPresentAction } from '../services/actions/isUserPresentAction';
import { isUserPresent } from '../services/actions/isUserPresentAction';

const Header = () => {
    const dispatch = useDispatch();

    const token = useSelector(state => state.userPresent);

    useEffect(() => {
        dispatch(isUserPresent());
    }, [dispatch]);

    const { login, register, logout } = token;

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(isUserPresent());
        // window.location.reload();
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <LinkContainer to='/'>
                    <Navbar.Brand className='fs-1.8 fw-200' >Shubham's Shop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {
                            login &&
                            <LinkContainer to='/login'>
                                <Nav.Link><i className="fa-solid fa-user"></i> &nbsp;Login</Nav.Link>
                            </LinkContainer>}

                        {
                            register &&
                            <LinkContainer to='/register'>
                                <Nav.Link><i className="fa-regular fa-user"></i> &nbsp;Register</Nav.Link>
                            </LinkContainer>
                        }

                        {
                            logout &&
                            // <LinkContainer to='/logout'>
                            <Nav.Link onClick={handleLogout} ><i className="fa-solid fa-right-to-bracket fa-flip-horizontal"></i> &nbsp;LogOut</Nav.Link>
                            // </LinkContainer>
                        }

                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <i className="fa-solid fa-cart-shopping"></i>
                                &nbsp;
                                cart
                            </Nav.Link>
                        </LinkContainer>

                        {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Header