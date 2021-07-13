import axios from 'axios'
import React from 'react'
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
import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS
} from '../constants/userConstants'

const RegisterScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  )

  const onSubmit = async (formData) => {
    // console.log(formData)
    // try {
    //   dispatch(register(formData))
    // } catch (err) {
    //   console.log(err)
    // }
    try {
      dispatch({ type: USER_REGISTER_REQUEST })
      const { data } = await axios.post('/api/signup', { ...formData })
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.errors
            ? error.response.data.errors
            : error.message
      })
      // console.log(error.response.data.errors)
    }
  }

  useEffect(() => {
    if (userInfo?.user?.id) {
      history.push('/')
    }
  }, [history, userInfo])

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center flex-column'>
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
                <Form.Label className='required'>Name</Form.Label>
                {errors?.name && (
                  <p className='text-danger'>{errors.name?.message}</p>
                )}
                <Form.Control
                  type='name'
                  placeholder='Enter Your Full Name'
                  aria-invalid={errors.name ? true : false}
                  {...register('name', {
                    required: 'This is required',
                    minLength: { value: 3, message: 'Atleast 3 letters' },
                    maxLength: { value: 255, message: 'Atmost 255 letters' }
                  })}></Form.Control>
              </Form.Group>
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
              <Form.Group>
                <Form.Label className='required'>Confirm Password</Form.Label>
                {errors?.password_confirmation && (
                  <p className='text-danger'>
                    {errors.password_confirmation?.message}
                  </p>
                )}
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  aria-invalid={errors.password_confirmation ? true : false}
                  {...register('password_confirmation', {
                    required: 'This is required',
                    minLength: { value: 6, message: 'Atleast 6 letters' }
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type='date'
                  {...register('dob', {
                    required: 'This is required'
                  })}></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary' className='my-3'>
                <i className='fas fa-sign-in-alt'></i>Register
              </Button>
            </Form>
            <p>
              Already Have an account?{' '}
              <Link
                to='/login'
                className='text-decoration-none text-dark fw-bold'>
                Sign in
              </Link>{' '}
              here
            </p>
          </Card>
        </Col>
      </Container>
    </>
  )
}

export default RegisterScreen
