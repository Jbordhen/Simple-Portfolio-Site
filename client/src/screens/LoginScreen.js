import { useEffect } from 'react'
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Spinner
} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../actions/userActions'

const LoginScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, error, userInfo } = useSelector((state) => state.userLogin)

  const onSubmit = (formData) => {
    dispatch(login(formData))
  }

  useEffect(() => {
    if (userInfo?.token) {
      history.push('/')
    }
  }, [history, userInfo])

  return (
    <>
      <Container className='d-flex flex-column justify-content-center align-items-center'>
        {loading ? (
          <Spinner animation='border' />
        ) : (
          error && (
            <Alert variant='danger'>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>{error}</p>
            </Alert>
          )
        )}

        <Col md={12} lg={6}>
          <Card className='px-4 py-3'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label className='required'>Email Address</Form.Label>
                {errors?.email && (
                  <p className='text-danger'>{errors.email?.message}</p>
                )}
                <Form.Control
                  type='email'
                  aria-invalid={errors.email ? true : false}
                  placeholder='Enter Email'
                  {...register('email', {
                    required: 'This is required',
                    maxLength: { value: 255, message: 'Atmost 255 letters' }
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className='required'>Password</Form.Label>
                {errors?.password && (
                  <p className='text-danger'>{errors.password?.message}</p>
                )}
                <Form.Control
                  type='password'
                  placeholder='Enter Password'
                  aria-invalid={errors.password ? true : false}
                  {...register('password', {
                    required: 'This is required',
                    minLength: { value: 6, message: 'Atleast 6 letters' }
                  })}></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary' className='my-3'>
                <i className='fas fa-sign-in-alt'></i>Sign in
              </Button>
            </Form>
            <p>
              New User?{' '}
              <Link
                to={'/register'}
                className='text-decoration-none text-dark fw-bold'>
                Register
              </Link>{' '}
              here.
            </p>
          </Card>
        </Col>
      </Container>
    </>
  )
}

export default LoginScreen
