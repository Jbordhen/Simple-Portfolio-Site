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
import { getSkill, updateSkill } from '../actions/userActions'

const UpdateSkillScreen = ({ match }) => {
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
    skill
  } = useSelector((state) => state.userGetSkill)

  const { success: successSkill } = useSelector(
    (state) => state.userUpdateSkill
  )

  const onSubmit = async (formData) => {
    dispatch(updateSkill(formData, match.params.skill))
    if (successSkill) {
      history.goBack()
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.replace('/login')
    }
    dispatch(getSkill(match.params.skill))
  }, [dispatch, history, match.params.skill, successSkill, userInfo])

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
        ) : errorSkill ? (
          <Alert variant='danger'>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{errorSkill}</p>
          </Alert>
        ) : skill && userInfo?.user?.id !== Number(skill?.user_id) ? (
          history.push('/unauthorized')
        ) : (
          // <Redirect path='/unauthorized' />
          // window.open('/unauthorized')
          skill && (
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
                        value: skill?.name,
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
                      {...register('level', { value: skill?.level })}>
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
                        value: skill?.experience,
                        required: 'This is required'
                      })}></Form.Control>
                  </Form.Group>
                  <Button type='submit' variant='primary' className='my-3'>
                    Update Skill
                  </Button>
                  <Link
                    to={`/profile/${userInfo?.user?.id}`}
                    className='mx-2 text-decoration-none fw-bold text-dark'>
                    Go Back
                  </Link>
                </Form>
              </Card>
            </Col>
          )
        )}
      </Container>
    </>
  )
}

export default UpdateSkillScreen
