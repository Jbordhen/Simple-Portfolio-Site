import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? <Component {...props} /> : <Redirect to='/unauthorized' />
      }
    />
  )
}

export default ProtectedRoute
