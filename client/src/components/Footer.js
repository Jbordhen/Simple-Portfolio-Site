import { Col, Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <Col className='bg-color'>
      <Container
        fluid
        className='d-flex text-light justify-content-center align-content-center mx-auto py-3'>
        This website is developed by Joy Bordhen
      </Container>
    </Col>
  )
}

export default Footer
