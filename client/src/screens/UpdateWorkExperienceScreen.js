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
import { getEducation, updateEducation } from '../actions/userActions'
import { USER_EDUCATION_GET_RESET } from '../constants/userConstants'

const UpdateWorkExperienceScreen = ({ match }) => {
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
    data: education
  } = useSelector((state) => state.userGetEducation)

  const { user } = useSelector((state) => state.userUpdateEducation)

  const onSubmit = async (formData) => {
    dispatch(updateEducation(formData, match.params.education))
  }

  useEffect(() => {
    if (!userInfo) {
      history.replace('/login')
    }
    if (user) {
      history.push(`/profile/${userInfo}`)
      dispatch({ type: USER_EDUCATION_GET_RESET })
    }
    dispatch(getEducation(match.params.education))
  }, [dispatch, history, match.params.education, user, userInfo])

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
                    value: education?.education?.name,
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
                    value: education?.education?.institution_name,
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
                    value: education?.education?.website,
                    maxLength: { value: 255, message: 'Atmost 255 letters' }
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className='required'>Start Date</Form.Label>
                <Form.Control
                  type='date'
                  {...register('start_date', {
                    value: education?.education?.start_date,
                    required: 'This is required'
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Ending Date</Form.Label>
                <Form.Control
                  type='date'
                  {...register('end_date', {
                    value: education?.education?.end_date
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type='checkbox'
                  label='Still Studying'
                  {...register('present', {
                    value: education?.education?.present
                  })}></Form.Check>
              </Form.Group>
              <Button type='submit' variant='primary' className='my-3'>
                Update Education
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

export default UpdateWorkExperienceScreen
