import React from 'react'
import { Container, Nav, Navbar, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Container fluid className='bg-color text-light'>
      <Row className='d-flex justify-content-center align-items-center'>
        <h1 className='mx-auto d-flex justify-content-center align-items-center pt-1'>
          Online Portfolio Site
        </h1>
      </Row>
      <Navbar expand='lg'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='d-flex mx-auto justify-content-center align-items-center'>
            <Nav.Link className='text-light' to='/' as={Link}>
              Home
            </Nav.Link>
            <Nav.Link
              className='text-light'
              to={
                userInfo?.user?.id ? `/profile/${userInfo.user.id}` : '/login'
              }
              as={Link}>
              My Profile
            </Nav.Link>
            {userInfo?.user?.id ? (
              <Nav.Link className='text-light' onClick={handleLogout}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link className='text-light' to={`/login`} as={Link}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}

export default Header
