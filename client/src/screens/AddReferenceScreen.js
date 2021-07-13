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
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addReference } from '../actions/userActions'

const AddReferenceScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, error, userInfo } = useSelector((state) => state.userLogin)
  const {
    loading: loadingReference,
    error: errorReference,
    success: successReference
  } = useSelector((state) => state.userAddReference)

  const onSubmit = async (formData) => {
    dispatch(addReference(formData))
  }

  useEffect(() => {
    if (!userInfo) {
      history.replace('/login')
    }
    if (successReference) {
      history.push(`/profile/${userInfo?.user?.id}`)
    }
  }, [history, successReference, userInfo])

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center flex-column'>
        {loading || loadingReference ? (
          <Spinner animation='border' />
        ) : error ? (
          <Alert variant='danger'>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        ) : (
          errorReference && (
            <Alert variant='danger'>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>{errorReference}</p>
            </Alert>
          )
        )}
        {/* {successReference && (
          <Alert variant='success'>
            <p>
              {errorReference}{' '}
              <Link to={`/profile/${userInfo?.user?.id}`}>Go Back</Link>
            </p>
          </Alert>
        )} */}
        <Col md={12} lg={6}>
          <Card className='px-4 py-3'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label className='required'>Referrer's Name</Form.Label>
                {errors?.name && (
                  <p className='text-danger'>{errors.name?.message}</p>
                )}
                <Form.Control
                  type='name'
                  placeholder="Enter Referrer's Name"
                  aria-invalid={errors.name ? true : false}
                  {...register('name', {
                    required: 'This is required',
                    minLength: { value: 3, message: 'Atleast 3 letters' },
                    maxLength: { value: 255, message: 'Atmost 255 letters' }
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>LinkedIn profile Link</Form.Label>
                {errors?.profile_link && (
                  <p className='text-danger'>{errors.profile_link?.message}</p>
                )}
                <Form.Control
                  type='text'
                  aria-invalid={errors.project_link ? true : false}
                  placeholder='Enter profile Link'
                  {...register('profile_link', {
                    maxLength: { value: 255, message: 'Atmost 255 letters' }
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className='required'>Description</Form.Label>
                {errors?.description && (
                  <p className='text-danger'>{errors.description?.message}</p>
                )}
                <Form.Control
                  type='text'
                  as='textarea'
                  placeholder="Referrer's qoute about you"
                  aria-invalid={errors.description ? true : false}
                  {...register('description', {
                    required: 'This is required',
                    minLength: { value: 3, message: 'Atleast 3 letters' },
                    maxLength: { value: 500, message: 'Atmost 500 letters' }
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className='required'>Referred Date</Form.Label>
                <Form.Control
                  type='date'
                  {...register('date', {
                    required: 'This is required'
                  })}></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary' className='my-3'>
                Add Reference
              </Button>
              <Link
                to={`/profile/${userInfo?.user?.id}`}
                className='mx-2 text-decoration-none fw-bold text-dark'>
                Go Back
              </Link>
            </Form>
          </Card>
        </Col>
      </Container>
    </>
  )
}

export default AddReferenceScreen
