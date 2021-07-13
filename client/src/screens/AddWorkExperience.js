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
import { addExperience } from '../actions/userActions'

const AddWorkExperienceScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, error, userInfo } = useSelector((state) => state.userLogin)
  const {
    loading: loadingExperience,
    error: errorExperience,
    success: successExperience
  } = useSelector((state) => state.userAddExperience)

  const onSubmit = async (formData) => {
    dispatch(addExperience(formData))
  }

  useEffect(() => {
    if (!userInfo) {
      history.replace('/login')
    }
    if (successExperience) {
      history.push(`/profile/${userInfo?.user?.id}`)
    }
  }, [history, successExperience, userInfo])

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center flex-column'>
        {loading || loadingExperience ? (
          <Spinner animation='border' />
        ) : error ? (
          <Alert variant='danger'>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        ) : (
          errorExperience && (
            <Alert variant='danger'>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>{errorExperience}</p>
            </Alert>
          )
        )}
        {/* {successExperience && (
          <Alert variant='success'>
            <p>
              {errorExperience}{' '}
              <Link to={`/profile/${userInfo?.user?.id}`}>Go Back</Link>
            </p>
          </Alert>
        )} */}
        <Col md={12} lg={6}>
          <Card className='px-4 py-3'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label className='required'>Company Name</Form.Label>
                {errors?.company_name && (
                  <p className='text-danger'>{errors.company_name?.message}</p>
                )}
                <Form.Control
                  type='text'
                  placeholder='Enter Your Full Name'
                  aria-invalid={errors.company_name ? true : false}
                  {...register('company_name', {
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
                <Form.Label className='required'>
                  Company Description
                </Form.Label>
                {errors?.description && (
                  <p className='text-danger'>{errors.description?.message}</p>
                )}
                <Form.Control
                  type='description'
                  placeholder='Tell something about the company'
                  aria-invalid={errors.description ? true : false}
                  {...register('description', {
                    required: 'This is required',
                    minLength: { value: 3, message: 'Atleast 3 letters' },
                    maxLength: { value: 255, message: 'Atmost 255 letters' }
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className='required'>Job Position</Form.Label>
                {errors?.designation && (
                  <p className='text-danger'>{errors.designation?.message}</p>
                )}
                <Form.Control
                  type='designation'
                  placeholder='Tell something about the company'
                  aria-invalid={errors.designation ? true : false}
                  {...register('designation', {
                    required: 'This is required',
                    minLength: { value: 3, message: 'Atleast 3 letters' },
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
                  label='Still an Employee of this Company'
                  {...register('present')}></Form.Check>
              </Form.Group>
              <Button type='submit' variant='primary' className='my-3'>
                Add Work Experience
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

export default AddWorkExperienceScreen
