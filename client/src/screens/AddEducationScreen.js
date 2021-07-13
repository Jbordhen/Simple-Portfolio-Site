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
import { addEducation } from '../actions/userActions'

const AddEducationScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, error, userInfo } = useSelector((state) => state.userLogin)
  const {
    loading: loadingEducation,
    error: errorEducation,
    success: successEducation
  } = useSelector((state) => state.userAddEducation)

  const onSubmit = async (formData) => {
    dispatch(addEducation(formData))
  }

  useEffect(() => {
    if (!userInfo) {
      history.replace('/login')
    }
    if (successEducation) {
      history.push(`/profile/${userInfo?.user?.id}`)
    }
  }, [history, successEducation, userInfo])

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center flex-column'>
        {loading || loadingEducation ? (
          <Spinner animation='border' />
        ) : error ? (
          <Alert variant='danger'>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        ) : (
          errorEducation && (
            <Alert variant='danger'>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>{errorEducation}</p>
            </Alert>
          )
        )}
        {/* {successEducation && (
          <Alert variant='success'>
            <p>
              {errorEducation}{' '}
              <Link to={`/profile/${userInfo?.user?.id}`}>Go Back</Link>
            </p>
          </Alert>
        )} */}
        <Col md={12} lg={6}>
          <Card className='px-4 py-3'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label className='required'>Degree Name</Form.Label>
                {errors?.name && (
                  <p className='text-danger'>{errors.name?.message}</p>
                )}
                <Form.Control
                  type='name'
                  placeholder='Enter Degree Name'
                  aria-invalid={errors.name ? true : false}
                  {...register('name', {
                    required: 'This is required',
                    minLength: { value: 3, message: 'Atleast 3 letters' },
                    maxLength: { value: 255, message: 'Atmost 255 letters' }
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className='required'>Institution Name</Form.Label>
                {errors?.institution_name && (
                  <p className='text-danger'>
                    {errors.institution_name?.message}
                  </p>
                )}
                <Form.Control
                  type='institution_name'
                  placeholder='Enter The Institution Name'
                  aria-invalid={errors.institution_name ? true : false}
                  {...register('institution_name', {
                    required: 'This is required',
                    minLength: { value: 3, message: 'Atleast 3 letters' },
                    maxLength: { value: 255, message: 'Atmost 255 letters' }
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Web Address</Form.Label>
                {errors?.website && (
                  <p className='text-danger'>{errors.website?.message}</p>
                )}
                <Form.Control
                  type='text'
                  aria-invalid={errors.website ? true : false}
                  placeholder='Enter Institution Website Link'
                  {...register('website', {
                    maxLength: { value: 255, message: 'Atmost 255 letters' }
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className='required'>Start Date</Form.Label>
                <Form.Control
                  type='date'
                  {...register('start_date', {
                    required: 'This is required'
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Ending Date</Form.Label>
                <Form.Control
                  type='date'
                  {...register('end_date')}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type='checkbox'
                  label='Still Studying'
                  {...register('present')}></Form.Check>
              </Form.Group>
              <Button type='submit' variant='primary' className='my-3'>
                Add Education
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

export default AddEducationScreen
