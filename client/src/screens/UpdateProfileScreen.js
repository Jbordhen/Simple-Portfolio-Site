import React from 'react'
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Spinner
} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProfile, updateProfile } from '../actions/userActions'

const UpdateProfileScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const history = useHistory()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, error, user } = useSelector((state) => state.userGetProfile)
  const {
    loading: loadingProfile,
    error: errorProfile,
    success: successProfile
  } = useSelector((state) => state.userUpdateProfile)

  const onSubmit = async (formData) => {
    dispatch(updateProfile(formData))
    if (successProfile) {
      history.push(`/profile/${user?.id}`)
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.replace('/login')
    }
    dispatch(getProfile(userInfo.user.id))
  }, [dispatch, history, successProfile, userInfo])

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center flex-column'>
        {loading || loadingProfile ? (
          <Spinner animation='border' />
        ) : error ? (
          <Alert variant='danger'>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        ) : errorProfile ? (
          <Alert variant='danger'>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{errorProfile}</p>
          </Alert>
        ) : (
          <Col md={12} lg={6}>
            <Card className='px-4 py-3'>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  {errors?.name && (
                    <p className='text-danger'>{errors.name?.message}</p>
                  )}
                  <Form.Control
                    type='name'
                    placeholder={user?.name}
                    aria-invalid={errors.name ? true : false}
                    {...register('name', {
                      value: user?.name,
                      minLength: { value: 3, message: 'Atleast 3 letters' },
                      maxLength: { value: 255, message: 'Atmost 255 letters' }
                    })}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  {errors?.email && (
                    <p className='text-danger'>{errors.email?.message}</p>
                  )}
                  <Form.Control
                    type='email'
                    aria-invalid={errors.email ? true : false}
                    placeholder={user?.email}
                    disabled
                    {...register('email', {
                      maxLength: { value: 255, message: 'Atmost 255 letters' }
                    })}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  {errors?.password && (
                    <p className='text-danger'>{errors.password?.message}</p>
                  )}
                  <Form.Control
                    type='password'
                    placeholder='Enter your Password'
                    aria-invalid={errors.password ? true : false}
                    {...register('password', {
                      minLength: { value: 6, message: 'Atleast 6 letters' }
                    })}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>About Yourself</Form.Label>
                  <Form.Control
                    type='text'
                    as='textarea'
                    placeholder={user?.about}
                    {...register('about', {
                      value: user?.about,
                      maxLength: {
                        value: 500,
                        message: 'Atmost 500 characters.'
                      }
                    })}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type='date'
                    placeholder={user?.dob}
                    {...register('dob', {
                      value: user?.dob
                    })}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Personal Website</Form.Label>
                  {errors?.portfolio_link && (
                    <p className='text-danger'>
                      {errors.portfolio_link?.message}
                    </p>
                  )}
                  <Form.Control
                    type='text'
                    placeholder={
                      user?.portfolio_link ?? 'Enter your personal website link'
                    }
                    aria-invalid={errors.portfolio_link ? true : false}
                    {...register('portfolio_link', {
                      value: user?.portfolio_link,
                      maxLength: { value: 255, message: 'Atmost 255 letters' }
                    })}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-3'>
                  Update
                </Button>
                <Button
                  as={Link}
                  to={`/profile/${user?.id}`}
                  type='reset'
                  variant='primary'
                  className='my-3 mx-2'>
                  Cancel
                </Button>
              </Form>
            </Card>
          </Col>
        )}
      </Container>
    </>
  )
}

export default UpdateProfileScreen
