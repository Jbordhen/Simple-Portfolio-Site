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
import UpdateProjectScreen from './screens/UpdateProjectScreen'
import UpdateSkillScreen from './screens/UpdateSkillScreen'
import UpdateReferenceScreen from './screens/UpdateReferenceScreen'
import UpdateWorkExperienceScreen from './screens/UpdateWorkExperienceScreen'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route
            path='/references/:reference'
            component={UpdateReferenceScreen}
          />
          <Route
            path='/work_experiences/:work_experience'
            component={UpdateWorkExperienceScreen}
          />
          <Route path='/skills/:skill' component={UpdateSkillScreen} />
          <Route path='/projects/:project' component={UpdateProjectScreen} />
          <Route
            path='/educations/:education'
            component={UpdateEducationScreen}
          />
          <Route
            path='/profile/references'
            exact
            component={AddReferenceScreen}
          />
          <Route
            path='/profile/work_experiences'
            exact
            component={AddWorkExperienceScreen}
          />
          <Route path='/profile/skills' exact component={AddSkillScreen} />
          <Route path='/profile/projects' exact component={AddProjectScreen} />
          <Route
            path='/profile/educations'
            exact
            component={AddEducationScreen}
          />
          <Route path='/profile/edit' exact component={UpdateProfileScreen} />
          <Route path='/profile/:profile' component={ProfileScreen} />
          <Route path='/' exact component={HomeScreen} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
