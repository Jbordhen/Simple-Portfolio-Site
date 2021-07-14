import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AddEducationScreen from './screens/AddEducationScreen'
import AddProjectScreen from './screens/AddProjectScreen'
import AddReferenceScreen from './screens/AddReferenceScreen'
import AddSkillScreen from './screens/AddSkillScreen'
import AddWorkExperienceScreen from './screens/AddWorkExperience'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import UpdateProfileScreen from './screens/UpdateProfileScreen'
import UpdateEducationScreen from './screens/UpdateEducationScreen'
import UpdateSkillScreen from './screens/UpdateSkillScreen'
import UpdateReferenceScreen from './screens/UpdateReferenceScreen'
import UpdateWorkExperienceScreen from './screens/UpdateWorkExperienceScreen'
import UpdateProjectScreen from './screens/UpdateProjectScreen'
import NotFound from './screens/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './screens/Unauthorized'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <ProtectedRoute
            path='/references/:reference'
            component={UpdateReferenceScreen}
          />
          <ProtectedRoute
            path='/work_experiences/:work_experience'
            component={UpdateWorkExperienceScreen}
          />
          <ProtectedRoute path='/skills/:skill' component={UpdateSkillScreen} />
          <ProtectedRoute
            path='/projects/:project'
            component={UpdateProjectScreen}
          />
          <ProtectedRoute
            path='/educations/:education'
            component={UpdateEducationScreen}
          />
          <ProtectedRoute
            path='/profile/references'
            exact
            component={AddReferenceScreen}
          />
          <ProtectedRoute
            path='/profile/work_experiences'
            exact
            component={AddWorkExperienceScreen}
          />
          <ProtectedRoute
            path='/profile/skills'
            exact
            component={AddSkillScreen}
          />
          <ProtectedRoute
            path='/profile/projects'
            exact
            component={AddProjectScreen}
          />
          <ProtectedRoute
            path='/profile/educations'
            exact
            component={AddEducationScreen}
          />
          <ProtectedRoute
            path='/profile/edit'
            exact
            component={UpdateProfileScreen}
          />
          <ProtectedRoute path='/profile/:profile' component={ProfileScreen} />
          <Route path='/' exact component={HomeScreen} />
          <Route path='/unauthorized' exact component={Unauthorized} />
          <Route path='/*' component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
