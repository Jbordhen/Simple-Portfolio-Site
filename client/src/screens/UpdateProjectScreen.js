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
import { getProject, updateProject } from '../actions/userActions'

const UpdateProjectScreen = ({ match }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, error, userInfo } = useSelector((state) => state.userLogin)
  const {
    loading: loadingProject,
    error: errorProject,
    project
  } = useSelector((state) => state.userGetProject)

  const { success: successProject } = useSelector(
    (state) => state.userUpdateProject
  )

  const onSubmit = async (formData) => {
    dispatch(updateProject(formData, match.params.project))
    if (successProject) {
      history.goBack()
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.replace('/login')
    }
    dispatch(getProject(match.params.project))
  }, [dispatch, history, match.params.project, successProject, userInfo])

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center flex-column'>
        {loading || loadingProject ? (
          <Spinner animation='border' />
        ) : error ? (
          <Alert variant='danger'>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        ) : errorProject ? (
          <Alert variant='danger'>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{errorProject}</p>
          </Alert>
        ) : (
          <Col md={12} lg={6}>
            <Card className='px-4 py-3'>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label className='required'>Project Name</Form.Label>
                  {errors?.name && (
                    <p className='text-danger'>{errors.name?.message}</p>
                  )}
                  <Form.Control
                    type='name'
                    placeholder='Enter Project Name'
                    aria-invalid={errors.name ? true : false}
                    {...register('name', {
                      value: project?.name,
                      required: 'This is required',
                      minLength: { value: 3, message: 'Atleast 3 letters' },
                      maxLength: { value: 255, message: 'Atmost 255 letters' }
                    })}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Project Link</Form.Label>
                  {errors?.project_link && (
                    <p className='text-danger'>
                      {errors.project_link?.message}
                    </p>
                  )}
                  <Form.Control
                    type='text'
                    aria-invalid={errors.project_link ? true : false}
                    placeholder='Enter Project Link'
                    {...register('project_link', {
                      value: project?.project_link,
                      maxLength: { value: 255, message: 'Atmost 255 letters' }
                    })}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className='required'>
                    Project Description
                  </Form.Label>
                  {errors?.description && (
                    <p className='text-danger'>{errors.description?.message}</p>
                  )}
                  <Form.Control
                    type='text'
                    as='textarea'
                    placeholder='Project Description'
                    aria-invalid={errors.description ? true : false}
                    {...register('description', {
                      value: project?.description,
                      required: 'This is required',
                      minLength: { value: 3, message: 'Atleast 3 letters' },
                      maxLength: { value: 500, message: 'Atmost 500 letters' }
                    })}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className='required'>Start Date</Form.Label>
                  <Form.Control
                    type='date'
                    {...register('start_date', {
                      value: project?.start_date,
                      required: 'This is required'
                    })}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ending Date</Form.Label>
                  <Form.Control
                    type='date'
                    {...register('end_date', {
                      value: project?.end_date
                    })}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-3'>
                  Update Project
                </Button>
                <Link
                  to={`/profile/${userInfo?.user?.id}`}
                  className='mx-2 text-decoration-none fw-bold text-dark'>
                  Go Back
                </Link>
              </Form>
            </Card>
          </Col>
        )}
      </Container>
    </>
  )
}

export default UpdateProjectScreen
