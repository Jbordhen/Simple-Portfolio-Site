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
import { addSkill } from '../actions/userActions'

const AddSkillScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })

  const dispatch = useDispatch()
  const history = useHistory()
  const { loading, error, userInfo } = useSelector((state) => state.userLogin)
  const {
    loading: loadingSkill,
    error: errorSkill,
    success: successSkill
  } = useSelector((state) => state.userAddSkill)

  const onSubmit = async (formData) => {
    dispatch(addSkill(formData))
  }

  useEffect(() => {
    if (!userInfo) {
      history.replace('/login')
    }
    if (successSkill) {
      history.push(`/profile/${userInfo?.user?.id}`)
    }
  }, [history, successSkill, userInfo])

  return (
    <>
      <Container className='d-flex justify-content-center align-items-center flex-column'>
        {loading || loadingSkill ? (
          <Spinner animation='border' />
        ) : error ? (
          <Alert variant='danger'>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        ) : (
          errorSkill && (
            <Alert variant='danger'>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>{errorSkill}</p>
            </Alert>
          )
        )}
        {/* {successSkill && (
          <Alert variant='success'>
            <p>
              {errorSkill}{' '}
              <Link to={`/profile/${userInfo?.user?.id}`}>Go Back</Link>
            </p>
          </Alert>
        )} */}
        <Col md={12} lg={6}>
          <Card className='px-4 py-3'>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Label className='required'>Skill Name</Form.Label>
                {errors?.name && (
                  <p className='text-danger'>{errors.name?.message}</p>
                )}
                <Form.Control
                  type='name'
                  placeholder='Enter Skill Name'
                  aria-invalid={errors.name ? true : false}
                  {...register('name', {
                    required: 'This is required',
                    minLength: { value: 3, message: 'Atleast 3 letters' },
                    maxLength: { value: 50, message: 'Atmost 50 letters' }
                  })}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label className='m-2'>Experience Level</Form.Label>
                {errors?.level && (
                  <p className='text-danger'>{errors.level?.message}</p>
                )}
                <select
                  aria-label='Default select example'
                  {...register('level', { value: 'Intermediate' })}>
                  <option value='Beginner'>Beginner</option>
                  <option value='Intermediate'>Intermediate</option>
                  <option value='Master'>Master</option>
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label className='required'>
                  Experience in years
                </Form.Label>
                <Form.Control
                  type='number'
                  label='Experience in years'
                  {...register('experience', {
                    required: 'This is required'
                  })}></Form.Control>
              </Form.Group>
              <Button type='submit' variant='primary' className='my-3'>
                Add Skill
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

export default AddSkillScreen
