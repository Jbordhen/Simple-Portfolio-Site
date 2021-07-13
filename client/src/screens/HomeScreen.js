import { useEffect } from 'react'
import { Alert, Col, Spinner, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserList } from '../actions/userActions'

const HomeScreen = () => {
  const userList = useSelector((state) => state.userList)

  const dispatch = useDispatch()
  const { loading, error, users } = userList

  useEffect(() => {
    dispatch(getUserList())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Spinner animation='border' />
      ) : error ? (
        <Alert variant='danger'>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      ) : (
        users && (
          <Col sm={12} lg={8} className='mx-auto px-2 px-lg-0'>
            <Table
              size='sm'
              striped
              bordered
              hover
              variant='dark'
              responsive='lg'
              className='mx-2 mx-md-auto'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Birth Date</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, count) => (
                  <tr key={count}>
                    <td>{count + 1}</td>
                    <td>
                      <Link
                        to={`/profile/${user.id}`}
                        className='text-decoration-none text-light fw-bold'>
                        {user.name}
                      </Link>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.dob}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        )
      )}
    </>
  )
}

export default HomeScreen
