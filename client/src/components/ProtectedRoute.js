import { useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'

const ProtectedRoute = ({ component, ...rest }) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const history = useHistory()
  if (userInfo) {
    return <Route component={component} {...rest} />
  }
  history.replace('/unauthorized')
  return <Route path='/unauthorized' />
}

export default ProtectedRoute
